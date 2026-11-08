#!/usr/bin/env bash
# =============================================================
#  Anirudh Guthula — Portfolio | TurnKey LAMP one-shot installer
#  Usage:
#    sudo bash install.sh
#  Optional environment overrides:
#    MYSQL_ROOT_PASS  DB_NAME  DB_USER  DB_PASS  SITE_DIR  SERVER_NAME
# =============================================================
set -euo pipefail

DB_NAME="${DB_NAME:-anirudh_portfolio}"
DB_USER="${DB_USER:-portfolio_user}"
DB_PASS="${DB_PASS:-$(head -c 24 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 20)}"
SITE_DIR="${SITE_DIR:-/var/www/anirudh-portfolio}"
SERVER_NAME="${SERVER_NAME:-_}"
VHOST_NAME="anirudh-portfolio"
MYSQL_ROOT_PASS="${MYSQL_ROOT_PASS:-}"

PKG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

[ "$(id -u)" -eq 0 ] || { echo "ERROR: run as root (sudo bash install.sh)"; exit 1; }
command -v mysql >/dev/null || { echo "ERROR: mysql client not found — is this a LAMP stack?"; exit 1; }
command -v apache2ctl >/dev/null || { echo "ERROR: apache2ctl not found — is this a LAMP stack?"; exit 1; }
command -v php >/dev/null || { echo "ERROR: php not found — is this a LAMP stack?"; exit 1; }

echo "==> [1/6] Deploying site files to $SITE_DIR"
mkdir -p "$SITE_DIR"
cp -a "$PKG_DIR/site/." "$SITE_DIR/"
chown -R www-data:www-data "$SITE_DIR"
find "$SITE_DIR" -type d -exec chmod 755 {} \;
find "$SITE_DIR" -type f -exec chmod 644 {} \;

echo "==> [2/6] Connecting to MySQL as root"
if mysql -uroot -e "SELECT 1;" >/dev/null 2>&1; then
    mysql_root() { mysql -uroot "$@"; }
elif [ -n "$MYSQL_ROOT_PASS" ] && mysql -uroot -p"$MYSQL_ROOT_PASS" -e "SELECT 1;" >/dev/null 2>&1; then
    mysql_root() { mysql -uroot -p"$MYSQL_ROOT_PASS" "$@"; }
else
    echo "ERROR: could not authenticate to MySQL as root."
    echo "       Re-run with:  sudo MYSQL_ROOT_PASS=\"<mysql-root-password>\" bash install.sh"
    echo "       (On TurnKey LAMP this is the password chosen at first boot.)"
    exit 1
fi

echo "==> [3/6] Creating database '$DB_NAME' and user '$DB_USER'"
mysql_root -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql_root -e "CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
mysql_root -e "ALTER USER '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';"
mysql_root -e "GRANT ALL PRIVILEGES ON \`$DB_NAME\`.* TO '$DB_USER'@'localhost';"
mysql_root -e "FLUSH PRIVILEGES;"

echo "==> [4/6] Importing schema and seed content"
mysql_root "$DB_NAME" < "$PKG_DIR/database/schema.sql"
mysql_root "$DB_NAME" < "$PKG_DIR/database/seed.sql"

echo "==> [5/6] Generating config.php with the new database credentials"
cat > "$SITE_DIR/config.php" <<EOF
<?php
define('DB_HOST', 'localhost');
define('DB_NAME', '$DB_NAME');
define('DB_USER', '$DB_USER');
define('DB_PASS', '$DB_PASS');
EOF
chown www-data:www-data "$SITE_DIR/config.php"
chmod 640 "$SITE_DIR/config.php"

echo "==> [6/6] Configuring Apache"
sed "s|__SITE_DIR__|$SITE_DIR|g; s|__SERVER_NAME__|$SERVER_NAME|g" \
    "$PKG_DIR/apache/vhost.conf.template" > "/etc/apache2/sites-available/$VHOST_NAME.conf"
a2enmod rewrite >/dev/null 2>&1 || true
a2enmod headers >/dev/null 2>&1 || true
a2enmod expires >/dev/null 2>&1 || true
a2ensite "$VHOST_NAME" >/dev/null
a2dissite 000-default >/dev/null 2>&1 || true
apache2ctl configtest
if systemctl reload apache2 2>/dev/null; then
    systemctl reload apache2
else
    service apache2 reload || service apache2 restart
fi

echo
echo "============================================================"
echo " Deployment complete"
echo " URL:            http://<this-vm-ip>/   (ServerName: $SERVER_NAME)"
echo " Document root:  $SITE_DIR"
echo " Database:       $DB_NAME  (user: $DB_USER)"
echo " DB password:    $DB_PASS"
echo " Credentials:    also stored in $SITE_DIR/config.php"
echo " Health checks:  curl http://localhost/api/status.php"
echo "                 curl http://localhost/api/site-content.php"
echo "============================================================"
