/**
 * This script checks if:
 *  - database directory exists
 *  - database exists
 *  - table "notes" exist
 * 
 * if one of the checks is not fullfilled, this script
 * will create missing files.
 */

import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join, resolve } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const databaseDir = resolve(__dirname, 'database');
const databaseFile = join(databaseDir, 'database.sqlite');

/**
 * This function checks if database exists. If not, a database will be created.
 * If yes, the connection to the database will be enstablished.
 * 
 * @param {Object} logger Logger object from index.js
 * @returns {Object} Database object
 */

const initializeDatabase = (logger) => {
    
    /**
     * Check if database directory is missing. If so, the directory will be created.
     */

    if (!existsSync(databaseDir)) {
        mkdirSync(databaseDir, { recursive: true });
        logger.info("Database directory not found. Created database directory.");
    }

    /**
     * Database connection 
     */

    const database = new sqlite3.Database(databaseFile, (err) => {
        if (err) {
            logger.error(err.message);
        } else {
            logger.info('Connected to the database.');
        }
    });

    /**
     * Check if table exists. If not, new table will be created.
     */

    database.get("SELECT name FROM sqlite_master WHERE type='table' AND name='notes'", (err, row) => {
        if (err) {
            logger.error(err.message);
            return;
        }
        
        if (!row) {
            logger.error("No table found. Creating...");
            
            database.run(`CREATE TABLE "notes" (
                "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                "text" TEXT,
                "link" TEXT,
                "iv" TEXT,
                "key" TEXT
            )`, (error) => {
                if (error) {
                    logger.error(error.message);
                } else {
                    logger.info("Created a new table.");
                }
            });
        } else {
            logger.info("Table 'notes' found and running!");
        }
    });

    return database;
};

export { initializeDatabase };
