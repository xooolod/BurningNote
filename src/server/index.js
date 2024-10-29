
/**
 * 🔥
 * Welcome to the core file of Burning note! Pretty blazing here, huh?
 * This app allows you to create secret notes, which are
 * protected by password and identified through unique link
 * 
 * Feel free to suggest any improvements or report bugs through github.
 * 
 * https://github.com/xooolod/BurningNote
 * 
 * This comment section is gonna be burned in 3... 2... 1... 🔥🔥🔥
 */

import express from "express";
import winston from "winston";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env", encoding: "UTF-8" });

/**
 * Winston logger configuration
 */

const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.File({ filename: './logs/app.log' }),
        new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

const app = express();

const APP_PORT = process.env.SERVER_PORT || 8000;

// Routes

app.get("/", (req, res) => {
    res.send("Hi!");
});

app.listen(APP_PORT, () => logger.info(`Server started and ready to process some notes! Port: ${APP_PORT}`));