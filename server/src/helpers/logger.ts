import fs from "fs";
import * as winston from "winston";
import ip from 'ip'
import { format } from "winston";

const fileDir = "C:/workarea/byme/estate/server/src/logs/";
const fileName = "C:/workarea/byme/estate/server/src/logs/log.log";

const logFormatter = format.printf((info: any) => {
  let { timestamp, level, stack, message } = info;
  message = stack || message;
  return `${timestamp} from ${ip.address()} ${level}: ${message}`;
});

const transportDoc = new winston.transports.File({
  dirname: fileDir,
  filename: fileName,
  stream: fs.createWriteStream(fileName, "utf-8"),
  format: format.combine(format.colorize(), format.simple(), format.timestamp(), logFormatter),
});

const logger = winston.createLogger({
  level: "info",
  transports: transportDoc,
  format: format.errors({ stack: true }),
});

export { logger };