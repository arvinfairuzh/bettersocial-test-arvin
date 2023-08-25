import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as winston from "winston";
import { loggingConfig } from "@src/config/logger.config";

const logger = winston.createLogger(loggingConfig);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const requestDate = new Date().toISOString();
    const userAgent = req.headers["user-agent"] || "-";
    const method = req.method;
    const fullUrl = req.originalUrl;
    const requestBody = JSON.stringify(req.body);

    const originalSend = res.send;

    // @ts-ignore
    res.send = function(body) {
      const responseStatusCode = res.statusCode;
      const contentLength = res.get("content-length") || 0;
      const responseBody = JSON.stringify(body);

      const logEntry = `[${userAgent}][${method}][${fullUrl}][${responseStatusCode}][${contentLength}][${requestBody}][${body}];`;

      // Ubah PATH_LOG_FILE menjadi path file log yang diinginkan
      logger.info(logEntry);

      originalSend.call(res, body);
    };

    next();
  }
}
