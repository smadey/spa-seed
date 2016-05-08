const SECOND_UNIT = 1000;
const MINUTE_UNIT = 60 * SECOND_UNIT;
const HOUR_UNIT = 60 * MINUTE_UNIT;
const DAY_UNIT = 24 * HOUR_UNIT;
const MONTH_UNIT = 30 * DAY_UNIT;
const YEAR_UNIT = 365 * MONTH_UNIT;

export function dateCreate(obj) {
  if (!obj) {
    return new Date();
  }

  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj === 'string') {
    return new Date(obj.replace(/-/g, '/'));
  }

  return new Date(obj);
}

export function dateDuration(fromDate, toDate) {
  const fromD = dateCreate(fromDate);
  const toD = dateCreate(toDate);

  const milliseconds = toD.getTime() - fromD.getTime();

  return {
    milliseconds,
    seconds: milliseconds / SECOND_UNIT,
    minutes: milliseconds / MINUTE_UNIT,
    hour: milliseconds / HOUR_UNIT,
    day: milliseconds / DAY_UNIT,
    month: milliseconds / MONTH_UNIT,
    year: milliseconds / YEAR_UNIT,
  };
}

export function dateFormat(obj, format = 'YYYY-MM-DD HH:mm:ss') {
  const date = dateCreate(obj);

  const o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'H+': date.getHours(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };

  let dateStr = format;

  if (/(Y+)/.test(dateStr)) {
    dateStr = dateStr.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  if (/(dd+)/.test(dateStr)) {
    dateStr = dateStr.replace(RegExp.$1, '日一二三四五六七'.split('')[date.getDay()]);
  }

  let k;

  for (k in o) {
    if (new RegExp(`(${k})`).test(dateStr)) {
      dateStr = dateStr.replace(RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr((`${o[k]}`).length));
    }
  }

  return dateStr;
}

export function dateStartOf(obj, key = 'day') {
  const date = dateCreate(obj);

  switch (key) {
    /* eslint no-fallthrough: 0 */
    case 'day':
      date.setHours(0);
    case 'hour':
      date.setMinutes(0);
    case 'minute':
      date.setSeconds(0);
    case 'second':
      date.setMilliseconds(0);
    default:
  }

  return date;
}

export default {
  create: dateCreate,
  duration: dateDuration,
  format: dateFormat,
  startOf: dateStartOf,
};
