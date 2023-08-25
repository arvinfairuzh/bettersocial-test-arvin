import * as winston from "winston";
import * as path from "path";
import * as moment from "moment";

const currentYear = new Date().getFullYear();
const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");

export const loggingConfig = {
  format    : winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${moment(timestamp).format("YYYY-MM-DD HH:mm:ss")}]${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(`logs/incoming/${currentYear}/${currentMonth}`, `${new Date().toISOString().slice(0, 10)}.log`)
    })
  ]
};
