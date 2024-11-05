import winston from "winston";

/**
 * Initializing the winston logger
 * @returns {Object} logger 
 */

const initializeLogger = () => {
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

    return logger;
}

export { initializeLogger };