export default {
  modules: [
    ['nuxt-logger-winston', {/* logger options */}]
/* default options
  LOG_ACTIVE: true,
  LOG_BASE_DIRECTORY_PATH: 'logs',
  DATE_FORMAT: 'YYYY-MM-DD HH:mm:ss:ms',
  CONSOLE_LOG_CONFIG: {
  IS_ACTIVE: true,
    LOG_LEVEL: 'debug',
    IS_JSON : false,
  },
  FILE_LOG_CONFIG: [
    { FILE_NAME: 'error', LOG_LEVEL: 'error', DATE_PATTERN: 'YYYY-MM-DD-HH', IS_JSON: true },
    { FILE_NAME: 'all', LOG_LEVEL: 'debug', DATE_PATTERN: 'YYYY-MM-DD', IS_JSON: true },
  ],
*/
  ],
}
