
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
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import helmet from "helmet";
import compression from "compression";
import { fileURLToPath } from 'url';

/**
 * Modules
 */

import { initializeLogger } from "./modules/initializeLogger.js";
import { initializeDatabase } from "./modules/databaseCheck.js";

/**
 * Controllers
 */

import { getNote } from "./controllers/getNote.js";
import { createNote } from "./controllers/createNote.js";
import { deleteNote } from "./controllers/deleteNote.js";
import { getNotesCount } from "./controllers/getNotesCount.js";

/**
 * Middleware
 */

import { databaseMiddleware } from "./middleware/databaseMiddleware.js";
import { loggerMiddleware } from "./middleware/loggerMiddleware.js";

dotenv.config({ path: "./.env", encoding: "UTF-8" });

/**
 * Winston logger configuration
 */

const logger = initializeLogger ();


/**
 * As the server starts, we have to make sure that 
 * database exists. If there is no table in database, then create it
 * Of course we pass logger object to the function to make sure 
 * if our geeky logger is working properly.
 */

const database = initializeDatabase (logger);

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_PORT = process.env.PORT || 8000;



const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://burning-note-220ef495fdb9.herokuapp.com']
    : [`http://localhost:3000`];

app.use(cors({
    origin: allowedOrigins,
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true, 
}));
app.use(loggerMiddleware(logger));
app.use(databaseMiddleware(database));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use(helmet());
app.use(compression());

app.use((req, res, next) => {
    req.logger.info(`Received ${req.method} request for ${req.originalUrl}`);
    next();
});

/**
 * Gets a total count of all notes ever gone through the app
 */

app.get("/api/getNotesCount/", getNotesCount);

/**
 * API Route that returns note data from database
 * Looks for the note by its link, so we can navigate user through the app simply using only notes` link
 */

app.get("/api/getNote/:link", getNote);

/**
 * Creates a note
 */

app.post("/api/create-note/", createNote);

/**
 * BURNS the note by its link.
 */

app.post("/api/burn-note/", deleteNote);

/**
 * Catch react routes
 */

app.get('/*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
    } catch(error) {
        logger.error(error);
    }
});

app.listen(APP_PORT, () => logger.info(`Server started and ready to process some notes! Port: ${APP_PORT}`));