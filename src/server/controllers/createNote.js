import { generateLink } from "../modules/generateLink.js";
import { encrypt } from "../modules/encryptionModule.js";

const createNote = async (req, res) => {
    const randomLink = generateLink();
    const noteText = req.body.text;

    /**
     * Encrypting note text and link to store it in database
     */

    const { iv, key, encryptedData } = await encrypt(noteText);
    
    await req.database.run("INSERT INTO `notes` (text, link, iv, key) VALUES (?, ?, ?, ?)", [encryptedData, randomLink, iv, key], (error) => {
        if (error) {
            req.logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        } else {
            req.logger.info("New note has been created.");
        }
    });

    /**
     * Returns a note link back to user.
     */

    res.json({ link: randomLink }).status(200);
}

export { createNote };