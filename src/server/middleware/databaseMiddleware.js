export const databaseMiddleware = (database) => (req, res, next) => {
    req.database = database;
    next();
}