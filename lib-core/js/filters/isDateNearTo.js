import { dateDuration } from '../utils/date';

export default function (date, nearDate) {
  if (!date) {
    return false;
  }

  return Math.abs(dateDuration(date, nearDate).seconds) <= 60;
}
