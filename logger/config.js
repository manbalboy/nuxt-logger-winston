const LOG_LEVELS = {
  error: 0,
  alert: 1,
  access: 2,
  warn: 3,
  info: 4,
  debug: 5,
};

const LOG_COLORS = {
  error: 'red',
  alert: 'black yellowBG',
  access: 'magenta',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

const DEFAULT_OPTIONS = {
  LOG_ACTIVE: true,
  LOG_BASE_DIRECTORY_PATH: 'logs',
  DATE_FORMAT: 'YYYY-MM-DD HH:mm:ss:ms',
  IS_JSON_FORMAT: true,
  CONSOLE_LOG_CONFIG: {
    IS_ACTIVE: true,
    LOG_LEVEL: 'debug',
  },
  FILE_LOG_CONFIG: [
    { FILE_NAME: 'error', LOG_LEVEL: 'error', DATE_PATTERN: 'YYYY-MM-DD-HH' },
    { FILE_NAME: 'all', LOG_LEVEL: 'debug', DATE_PATTERN: 'YYYY-MM-DD' },
  ],

  BANNER_STRING: `logger pord by manbalboy
https://github.com/manbalboy
╔╦╗╔═╗╔╗╔╔╗ ╔═╗╦  ╔╗ ╔═╗╦ ╦
║║║╠═╣║║║╠╩╗╠═╣║  ╠╩╗║ ║╚╦╝
╩ ╩╩ ╩╝╚╝╚═╝╩ ╩╩═╝╚═╝╚═╝ ╩ 
manbalboy@hanmail.net
`,
};

module.exports = {
  LOG_LEVELS,
  LOG_COLORS,
  DEFAULT_OPTIONS,
};
