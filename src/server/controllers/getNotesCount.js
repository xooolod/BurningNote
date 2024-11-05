const getNotesCount = async (req, res) => {
    req.database.get("SELECT `seq` FROM `sqlite_sequence`", (error, rows) => {
        if (error) throw new Error(error);
        if (!rows) {
            res.status(504);
        }
        if (rows) {
            res.json({
                count: rows.seq,
            }).status(200);
        }
    });
}

export { getNotesCount };