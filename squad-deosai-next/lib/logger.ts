import winston from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${stack || message} ${
    Object.keys(meta).length ? JSON.stringify(meta) : ''
  }`;
});

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/api-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      level: 'error',
      maxFiles: '14d',
    }),
    new winston.transports.DailyRotateFile({
      filename: 'logs/api-combined-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d',
    }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: combine(winston.format.colorize(), logFormat),
    })
  );
}
