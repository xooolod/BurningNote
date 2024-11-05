const deleteNote = (req, res) => {
    const noteLink = req.body.link;

    req.database.run("DELETE FROM `notes` WHERE `link` = ?", [noteLink], (error) => {
        if (error) {
            req.logger.error(error);
            return res.status(500).json({ message: "Internal server error." });
        } else {
            req.logger.info(`Note ${noteLink} has been read and deleted.`);
            res.status(200);
        }
    });
}

export { deleteNote };