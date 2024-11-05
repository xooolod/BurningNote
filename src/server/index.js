
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


import { initializeLogger } from "./winston.js";
import { initializeDatabase } from "./databaseCheck.js";
import { generateLink } from "./generateLink.js";
import { encrypt, decrypt } from "./encryptionModule.js";

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


/**
 * Of course, CORS! :)
 * Allowing our front-end side to send requests to the server
 */

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? 'https://burning-note-220ef495fdb9.herokuapp.com' : `http://localhost:${process.env.PORT}`, 
    methods: 'GET,POST,PUT,DELETE', 
    credentials: true, 
}));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '..', '..', 'dist')));
app.use(helmet());
app.use(compression());


/**
 * API Route that returns note data from database
 * Looks for the note by its link, so we can navigate user through the app simply using only notes` link
 */

app.get("/api/getNote/:link", async (req, res) => {
    const noteLink = req.params.link;

    database.get("SELECT * FROM `notes` WHERE `link` = ? LIMIT 1", [noteLink], (error, row) => {
        if (error) {
            logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }

        if (!row) {
            return res.status(404).json({ message: "Note not found! Probably it was burned already. Sorry, mate! :(" });
        } else {
            /**
             * Decrypting the text of the note and returning the note data back to the user
             */
            
            row.text = decrypt(row.text, row.key, row.iv);
            res.json(row);
        }
    });
});

/**
 * Creates a note
 */

app.post("/api/create-note/", async (req, res) => {
    const randomLink = generateLink();
    const noteText = req.body.text;

    /**
     * Encrypting note text and link to store it in database
     */

    const { iv, key, encryptedData } = await encrypt(noteText);
    
    await database.run("INSERT INTO `notes` (text, link, iv, key) VALUES (?, ?, ?, ?)", [encryptedData, randomLink, iv, key], (error) => {
        if (error) {
            logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        } else {
            logger.info("New note has been created.");
        }
    });

    /**
     * Returns a note link back to user.
     */

    res.json({
        link: randomLink,
    });
});

/**
 * BURNS the note by its link.
 */

app.post("/api/burn-note/", (req, res) => {
    const noteLink = req.body.link;

    database.run("DELETE FROM `notes` WHERE `link` = ?", [noteLink], (error) => {
        if (error) {
            logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        } else {
            logger.info(`Note ${noteLink} has been read and deleted.`);
        }
    });
});

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