const path = require('path')
const winston = require('winston')

const options = {
  // file-ba logolunk
  file: {
    // szint
    //level: 'info',
    level: process.env.LOG_LEVEL_FILE,
    // fájlnév
    filename: path.join(__dirname, '../../app.log'),
    // json formátumban logoljon
    format: winston.format.json()
  },
  console: {
    // a hibákat logolja a konzolra
    //level: 'debug'
    level: process.env.LOG_LEVEL_CONSOLE,
  }
};

const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  // hiba esetén ne álljon le a logolás
  exitOnError: false
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message)
  }
};


module.exports = logger;