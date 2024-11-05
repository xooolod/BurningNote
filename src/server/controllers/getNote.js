import { decrypt } from "../modules/encryptionModule.js";

const getNote = (req, res) => {
    const noteLink = req.params.link;

    req.database.get("SELECT * FROM `notes` WHERE `link` = ? LIMIT 1", [noteLink], (error, row) => {
        if (error) {
            req.logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }

        if (!row) {
            return res.status(404).json({ message: "Note not found! Probably it was burned already. Sorry, mate! :(" });
        }
        if (row) {
            /**
             * Decrypting the text of the note and returning the note data back to the user
             */
            
            row.text = decrypt(row.text, row.key, row.iv);
            res.json(row).status(200);
        }
    });
}

export { getNote };