const path = require('path');
const os = require('os');
const winston = require('winston');
const WinstonDaily = require('winston-daily-rotate-file');
const { combine, timestamp, printf, colorize, json, label } = winston.format;
const { LOG_COLORS, LOG_LEVELS, DEFAULT_OPTIONS } = require('./config.js');
const { extractNetworkInfo, makeStringMessage, showBanner } = require('./utils.js');
winston.addColors(LOG_COLORS);

export default function logModule(_logOptions = {}) {
  // Config variable
  const options = {
    ...DEFAULT_OPTIONS,
    ..._logOptions,
  };

  const {
    LOG_ACTIVE,
    LOG_BASE_DIRECTORY_PATH,
    DATE_FORMAT,
    CONSOLE_LOG_CONFIG,
    FILE_LOG_CONFIG,
    BANNER_STRING,
    IS_BANNER
  } = options;

  if (LOG_ACTIVE) {
    const transports = [];

    // Console logger setting
    if (CONSOLE_LOG_CONFIG?.IS_ACTIVE) {

      const consoleFormats = [colorize({all: true}), timestamp({format: DATE_FORMAT})];
      if(CONSOLE_LOG_CONFIG.IS_JSON) {
        consoleFormats.push(json());
      }
      const consoleLogOptions = {
        level: CONSOLE_LOG_CONFIG.LOG_LEVEL || 'debug',
        levels: LOG_LEVELS,
        format: combine(...consoleFormats),
      };
      transports.push(new winston.transports.Console(consoleLogOptions));
    }

    // File logger setting
    if (FILE_LOG_CONFIG) {
      if (!Array.isArray(FILE_LOG_CONFIG)) {
        throw new TypeError('File log config is not array');
      }

      if (FILE_LOG_CONFIG.every(item => typeof item !== 'object')) {
        throw new Error('FILE_LOG_CONFIG item is not object');
      }

      if (FILE_LOG_CONFIG.every(item => typeof item.FILE_NAME !== 'string')) {
        throw new Error('FILE_NAME is a required value and is a string type.');
      }

      const fileNames = new Set(FILE_LOG_CONFIG.filter(item => typeof item.FILE_NAME === 'string'));

      if (fileNames.size !== FILE_LOG_CONFIG.length) {
        throw new Error('Duplicate FILE_NAME');
      }

      FILE_LOG_CONFIG.forEach(FILE_LOGGER => {
        if (FILE_LOGGER.IS_JSON === undefined) FILE_LOGGER.IS_JSON = true;
        transports.push(
          new WinstonDaily({
            level: FILE_LOGGER.LOG_LEVEL || 'error',
            datePattern: FILE_LOGGER.DATE_PATTERN || 'YYYY-MM-DD',
            zippedArchive: FILE_LOGGER.IS_ZIP ||true,
            maxFiles: FILE_LOGGER.MAX_FILES ||'14d',
            dirname: path.join(process.cwd(), `/${LOG_BASE_DIRECTORY_PATH}`, `/${FILE_LOGGER.FILE_NAME}`),
            filename: `${os.hostname}.%DATE%.${FILE_LOGGER.FILE_NAME}.log`,
            format: FILE_LOGGER.IS_JSON ? combine(json()) : combine(),
          }),
        );
      });
    }

    // Log global format setting
    const logFormat = [
      label({ label: `[host : ${os.hostname}]` }),
      timestamp({ format: DATE_FORMAT }),
      printf(info => {
        return `[${info.timestamp}] ${info.label} [${info.level}] : ${makeStringMessage(info)}`;
      }),
    ];

    const format = combine(...logFormat);

    // logger create
    const Logger = winston.createLogger({
      levels: LOG_LEVELS,
      format,
      transports,
    });

    // Declare to be available on Nuxt - this.$logger
    process.logger = Logger;
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.server.js'),
      fileName: 'plugin.server.js',
      mode: 'server',
    });

    // Apply Log to appropriate Nuxt hook
    this.nuxt.hook('ready', () => {

      if (Logger) {
        if(IS_BANNER)
        showBanner(BANNER_STRING);
      }
    });

    this.nuxt.hook('render:setupMiddleware', app => {
      app.use((req, res, next) => {
        res.on('finish', () => {
          Logger.log({
            level: 'access',
            ...extractNetworkInfo(req, res),
          });
        });

        next();
      });
    });

    this.nuxt.hook('render:errorMiddleware', app =>
      app.use((err, req, res, next) => {
        res.on('finish', () => {
          const newError = new Error(err);
          newError.stack = err.stack;
          Logger.log({
            level: 'error',
            errorStack: String(err.stack),
            ...extractNetworkInfo(req, res),
          });
        });
        next(err);
      }),
    );

    this.nuxt.hook('error', error => Logger.error(error));
    this.nuxt.hook('close', () => Logger.alert('close nuxt'));
  } else {
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.server.js'),
      fileName: 'plugin.server.js',
      mode: 'server',
    });
  }
}
