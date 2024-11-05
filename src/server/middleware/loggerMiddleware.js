export const loggerMiddleware = (logger) => (req, res, next) => {
    req.logger = logger;
    next();
}