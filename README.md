# =============================================================
#  Anirudh Guthula — Portfolio | LAMP deployment package
#  Target: a clean TurnKey Linux LAMP stack VM (turnkeylinux.org)
# =============================================================

## What is inside
    site/       Production build of the React portfolio (the Apache document root)
    database/   schema.sql (table) + seed.sql (your real site content, idempotent)
    apache/     Virtual-host template (placeholders filled in by install.sh)
    source/     Full application source code (React frontend + FastAPI backend)
    install.sh  One-shot installer (Apache vhost, MySQL db/user/grants, seed import,
                file permissions, config file generation)

## Requirements
- A clean TurnKey Linux LAMP VM (Apache 2, MySQL/MariaDB, PHP 8.x preinstalled)
- Root access (sudo) on that VM
- You MySQL root (adminer) password — TurnKey asks for it on first boot

## Install (2 commands)
    tar -xzf anirudh-portfolio-lamp.tar.gz
    cd anirudh-portfolio-lamp && sudo MYSQL_ROOT_PASS="your-mysql-root-password" bash install.sh

The script prints the generated database credentials and writes them into
`site/config.php`. Your site is served at `http://<vm-ip>/`.

## Optional settings (environment variables, all have safe defaults)
    MYSQL_ROOT_PASS   your MySQL root password (required if socket auth is disabled)
    DB_NAME           database name      (default: anirudh_portfolio)
    DB_USER           dedicated db user  (default: portfolio_user)
    DB_PASS           dedicated db pass  (default: random, printed at the end)
    SITE_DIR          document root      (default: /var/www/anirudh-portfolio)
    SERVER_NAME       ServerName for the vhost (default: _ = any host/IP)

## Re-running
`install.sh` is idempotent — safe to re-run. Seed data uses
`ON DUPLICATE KEY UPDATE`, so your content is refreshed, not duplicated.

## The database, honestly explained
The portfolio is a static React app: it renders completely without a database.
Per your request the MySQL side is real and wired: `install.sh` creates the
database + dedicated user, imports this schema and your current site content,
and a small PHP API (`/api/site-content.php`) serves that content as JSON —
useful if you later want to edit copy in the DB instead of rebuilding.

## Verifying after install
    curl http://localhost/api/status.php          → {"status":"ok", ...}
    curl http://localhost/api/site-content.php    → your seeded content
    open http://localhost/                        → the portfolio

## Source code
`source/frontend` — React app (src/, public/, package.json, Tailwind/craco configs).
Rebuild with `yarn install && yarn build` after editing.
`source/backend`  — FastAPI + MongoDB template (server.py, requirements.txt).
Not required on a LAMP VM; included for completeness.
