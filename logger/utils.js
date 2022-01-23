import chalk from 'chalk';

export function extractNetworkInfo(req, res = {}) {
  return {
    'req.url': req.url,
    'req.method': req.method,
    // 'req.headers': req.headers,
    'res.statusCode': res.statusCode,
  };
}

export function makeStringMessage(conversionTargets) {
  const arrayExclusionKey = ['level', 'label', 'timestamp'];

  return Object.entries(conversionTargets)
    .filter(([key, _]) => !arrayExclusionKey.includes(key))
    .map(([key, value]) => {
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }
      if (key === 'message') {
        return `${value}`;
      }
      return `${key}: ${value}`;
    })
    .join(', ');
}



export function showBanner(bannerWord) {
  console.log(chalk.blue.bold(bannerWord));
}