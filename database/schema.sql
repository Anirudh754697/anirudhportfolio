-- ============================================================
-- Anirudh Guthala — Portfolio | table schema
-- Imported automatically by install.sh (no USE statement needed:
-- the database name is passed on the mysql command line)
-- ============================================================

CREATE TABLE IF NOT EXISTS site_content (
    id          INT UNSIGNED NOT NULL AUTO_INCREMENT,
    section     VARCHAR(64)  NOT NULL,
    content     TEXT         NOT NULL,
    updated_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_section (section)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
