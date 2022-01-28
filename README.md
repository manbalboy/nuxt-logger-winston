# nuxt-logger-winston 
![intro](https://github.com/manbalboy/nuxt-logger-winston/blob/master/asset/img.png)

## contributor
@manbalboy(정훈) : manbalboy@hanmail.net

## Tech Requirement (Tech Stack)
- Winston
- Winston-daily-rotate-file
- chalk

## Release
0.0.1 : initialize

## install
- Enter nuxt-logger-winston in the npm command line command
```shell
npm install nuxt-logger-winston
```

## setup
1. Add nuxt-logger-winston to the modules section of nuxt.config.js
2. Configure it :

```js
{
  modules: [
    // Simple usage
    'nuxt-logger-winston',

    // With options
    ['nuxt-logger-winston', { /* module options */ }]
  ]
}
```

## Logging Levels
Logging levels in nuxt-logger-winston conform to the severity ordering specified by RFC5424: severity of all levels is assumed to be numerically ascending from most important to least important.

Each level is given a specific integer priority. The higher the priority the more important the message is considered to be, and the lower the corresponding integer priority. For example, as specified exactly in RFC5424 the syslog levels are prioritized from 0 to 7 (highest to lowest).

The currently set log level is as follows

```js
const LOG_LEVELS = {
  error: 0,
  alert: 1,
  access: 2,
  warn: 3,
  info: 4,
  debug: 5,
};
```
This log level cannot be changed in the current version and we intend to provide it in the near future.

The color values mapped to the log level are:

```js
const LOG_COLORS = {
  error: 'red',
  alert: 'black yellowBG',
  access: 'magenta',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};
```


## options

### LOG_ACTIVE
Default : true  
Determines whether the log is active or inactive

### LOG_BASE_DIRECTORY_PATH
Default : 'logs'
Set the LOG directory name based on the root path

### DATE_FORMAT
Default : 'YYYY-MM-DD HH:mm:ss:ms'
Format to be represented in timestamp entries

### IS_JSON_FORMAT
Default : true  
Whether the logger format is expressed in JSON format

### CONSOLE_LOG_CONFIG
Default :
```
  CONSOLE_LOG_CONFIG: {
    IS_ACTIVE: true,
    LOG_LEVEL: 'debug',
    IS_JSON: false
  },
```
LOG setting object to be displayed in CMD window

### CONSOLE_LOG_CONFIG.IS_ACTIVE
Default : true

Set whether to display the log in the CMD window

### CONSOLE_LOG_CONFIG.LOG_LEVEL
Default : 'debug'

Log level to be displayed on CMD

### CONSOLE_LOG_CONFIG.IS_JSON
Default : false

JSON format or not

### FILE_LOG_CONFIG
Default :
```
  FILE_LOG_CONFIG: [
    { FILE_NAME: 'error', LOG_LEVEL: 'error', DATE_PATTERN: 'YYYY-MM-DD', IS_JSON: true },
    { FILE_NAME: 'all', LOG_LEVEL: 'debug', DATE_PATTERN: 'YYYY-MM-DD', IS_JSON: true },
  ]
```

The file log setting is defined as an array.

Create a file log object and include it in the file log configuration array.

### FILE_LOG_CONFIG[0].FILE_NAME (String)
**FILE_NAME** is a required value and cannot be duplicated.

### FILE_LOG_CONFIG[0].LOG_LEVEL (String)
Default : 'error'  

Log level that should be written to the file

### FILE_LOG_CONFIG[0].DATE_PATTERN (String)
Default : 'YYYY-MM-DD-HH'  

A string representing the moment.js date format to be used for rotating. The meta characters used in this string will dictate the frequency of the file rotation. For example, if your DATE_PATTERN is simply 'HH' you will end up with 24 log files that are picked up and appended to every day. (default: 'YYYY-MM-DD-HH')

### FILE_LOG_CONFIG[0].IS_JSON
Default : true  

JSON format or not

[DATE_PATTERN RULE](https://momentjs.com/docs/#/displaying/format/)

### BANNER_STRING
Creates a banner string at startup.
The default is the current author's default banner is active.  

## Example
/examples folder reference Main file 
- nuxt.config.js
- /examples/pages/index.uve
