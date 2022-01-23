# nuxt-logger-winston
 
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
로거를 활성 또는 비활성 상태로 결정하는 Flag 값 

### LOG_BASE_DIRECTORY_PATH
Default : 'logs'
Set the LOG directory name based on the root path  
프로젝트 루트경로에 file 로그가 쓰여질 경로 지정

### DATE_FORMAT
Default : 'YYYY-MM-DD HH:mm:ss:ms'
Format to be represented in timestamp entries  
로그에 쓰여질 timestamp 의 포맷

### IS_JSON_FORMAT
Default : true  
Whether the logger format is expressed in JSON format  
로거 형식이 JSON 형식으로 표현되는지 여부

### CONSOLE_LOG_CONFIG
Default : 
```
  CONSOLE_LOG_CONFIG: {
    IS_ACTIVE: true,
    LOG_LEVEL: 'debug',
  },
```
LOG setting object to be displayed in CMD window  
CMD 창에 표시할 LOG 설정 개체

### CONSOLE_LOG_CONFIG.IS_ACTIVE
Default : true  
Set whether to display the log in the CMD window  
CMD 창에 로그를 표시할 것인지 여부 설정

### CONSOLE_LOG_CONFIG.LOG_LEVEL
Default : 'debug'  
Log level to be displayed on CMD  
CMD 에 표출 되어야 하는 LOG LEVEL 단계

### FILE_LOG_CONFIG
Default : 
```
  FILE_LOG_CONFIG: [
    { FILE_NAME: 'error', LOG_LEVEL: 'error', DATE_PATTERN: 'YYYY-MM-DD-HH' },
    { FILE_NAME: 'all', LOG_LEVEL: 'debug', DATE_PATTERN: 'YYYY-MM-DD' },
  ]
```
The file log setting is defined as an array.
Create a file log object and include it in the file log configuration array.  

파일 로그 설정은 배열로 정의되어 지며
파일 로그 객체를 생성하여 파일 로그 설정 배열에 포함 시킨다.

### FILE_LOG_CONFIG[0].FILE_NAME (String)
**FILE_NAME** is a required value and cannot be duplicated.
**FILE_NAME** 은 필수 값이며 중복될 수 없다

### FILE_LOG_CONFIG[0].LOG_LEVEL (String)
Default : 'error'
Log level that should be written to the file  
File 에 쓰여야 되어야 하는 Log level 

### FILE_LOG_CONFIG[0].DATE_PATTERN (String)
Default : 'YYYY-MM-DD-HH'  
A string representing the moment.js date format to be used for rotating. The meta characters used in this string will dictate the frequency of the file rotation. For example, if your DATE_PATTERN is simply 'HH' you will end up with 24 log files that are picked up and appended to every day. (default: 'YYYY-MM-DD-HH')

회전에 사용할 moment.js 날짜 형식을 나타내는 문자열입니다. 이 문자열에 사용된 메타 문자는 파일 회전 빈도를 나타냅니다. 예를 들어, DATE_PATTERN이 단순히 'HH'인 경우 매일 선택하여 추가되는 24개의 로그 파일로 끝납니다. (기본값: 'YYYY-MM-DD-HH')

[DATE_PATTERN RULE](https://momentjs.com/docs/#/displaying/format/)  

### BANNER_STRING
Creates a banner string at startup.
The default is the current author's default banner is active.  

시작 시 배너 문자열을 생성합니다.
기본값은 현재 작성자의 기본 배너가 활성화된 것입니다.