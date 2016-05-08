import { dateDuration, dateFormat, dateStartOf } from '../utils/date';

export default function (date) {
  if (!date) {
    return '';
  }

  let format;
  const duration = dateDuration(date, dateStartOf());

  if (duration.day <= -2) {
    format = 'YY年M月DD日 HH:mm';
  } else if (duration.day <= -1) {
    format = '明天HH:mm';
  } else if (duration.day <= 0) {
    format = 'HH:mm';
  } else if (duration.day < 1) {
    format = '昨天HH:mm';
  } else if (duration.year < 1) {
    format = 'M月DD日 HH:mm';
  } else {
    format = 'YY年M月DD日 HH:mm';
  }

  return dateFormat(date, format);
}
