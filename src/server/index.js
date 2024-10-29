
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

import { initializeLogger } from "./winston.js";
import { initializeDatabase } from "./databaseCheck.js";
import { generateLink } from "./generateLink.js";

dotenv.config({ path: "../../.env", encoding: "UTF-8" });

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

/**
 * Of course, CORS! :)
 * Allowing our front-end side to send requests to the server
 */

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: 'GET,POST', 
    credentials: true, 
}));

app.use(express.json()); 

const APP_PORT = process.env.SERVER_PORT || 8000;

// Routes

app.get("/", (req, res) => {
    res.send("Hi!");
});

/**
 * API Route that returns note data from database
 * Looks for the note by its link, so we can navigate user through the app simply using only notes` link
 */

app.get("/api/getNote/:link", async (req, res) => {
    const noteLink = req.params.link;

    logger.info(req.params.link);

    database.get("SELECT * FROM `notes` WHERE `link` = ? LIMIT 1", [noteLink], (error, row) => {
        if (error) {
            logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }

        if (!row) {
            return res.status(404).json({ message: "Note not found! Probably it was burned already. Sorry, mate! :(" });
        } else {
            /**
             * Returning the note data back to the user
             */

            res.json(row);
        }
    });
});

/**
 * Creates a note
 */

app.post("/api/create-note/", (req, res) => {
    const randomLink = generateLink();
    const noteText = req.body.text;
    
    database.run("INSERT INTO `notes` (text, link) VALUES (?, ?)", [noteText, randomLink], (error) => {
        if (error) {
            logger.error(error);
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
        } else {
            logger.info(`Note ${noteLink} has been read and deleted.`);
        }
    });
});

app.listen(APP_PORT, () => logger.info(`Server started and ready to process some notes! Port: ${APP_PORT}`));