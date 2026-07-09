"""SQLite database connection and initialization."""

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Generator

import structlog

from src.core.config import get_settings

logger = structlog.get_logger()


@contextmanager
def get_db_connection() -> Generator[sqlite3.Connection, None, None]:
    """Context manager for SQLite database connections.

    Yields:
        SQLite connection with row factory enabled

    Example:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM articles")
            rows = cursor.fetchall()
    """
    settings = get_settings()
    conn = sqlite3.connect(settings.database_path)
    conn.row_factory = sqlite3.Row

    try:
        yield conn
        conn.commit()
        logger.debug("database.commit")
    except Exception as e:
        conn.rollback()
        logger.error("database.rollback", error=str(e))
        raise
    finally:
        conn.close()
        logger.debug("database.close")


def init_database() -> None:
    """Initialize database schema if not exists.

    Creates the database file and executes schema.sql to create all tables
    and indexes. Safe to call multiple times (uses IF NOT EXISTS).

    Raises:
        FileNotFoundError: If schema.sql file not found
        sqlite3.Error: If database initialization fails
    """
    settings = get_settings()

    # Create data directory if needed
    settings.database_path.parent.mkdir(parents=True, exist_ok=True)

    # Read schema file
    schema_path = Path("data/schema.sql")
    if not schema_path.exists():
        raise FileNotFoundError(f"Schema file not found: {schema_path}")

    schema_sql = schema_path.read_text(encoding="utf-8")

    # Execute schema
    with get_db_connection() as conn:
        conn.executescript(schema_sql)
        logger.info(
            "database.initialized",
            database_path=str(settings.database_path),
        )


def check_database_health() -> dict[str, int]:
    """Check database health by counting rows in each table.

    Returns:
        Dictionary mapping table names to row counts

    Example:
        health = check_database_health()
        print(f"Articles: {health['articles']}")
    """
    tables = [
        "articles",
        "briefs",
        "translations",
        "publications",
        "publication_stories",
        "api_logs",
    ]

    health = {}

    with get_db_connection() as conn:
        cursor = conn.cursor()
        for table in tables:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            health[table] = count

    logger.info("database.health_check", **health)
    return health
