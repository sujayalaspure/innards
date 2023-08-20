const COUNT_ABBRS = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

export function formatCount(
  count: number,
  withAbbr = true,
  decimals = 2,
): string {
  const i = count === 0 ? count : Math.floor(Math.log(count) / Math.log(1000));
  let result = parseFloat(
    (count / Math.pow(1000, i)).toFixed(decimals),
  ).toString();
  if (withAbbr) {
    result += `${COUNT_ABBRS[i]}`;
  }
  return result;
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export function generateUUID(digits: number = 10) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
  let uuid = [];
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)]);
  }
  return uuid.join('');
}

export function getDifferenceInDays(date1: number, date2: number) {
  const diffInMs = Math.abs(date2 - date1);
  return diffInMs / (1000 * 60 * 60 * 24);
}

export function toTitleCase(str: string | undefined) {
  if (!str) {
    return str;
  }
  return str
    .toLowerCase()
    .replace(/(?:^|[\s-/])\w/g, function (match) {
      return match.toUpperCase();
    })
    .replace('-', ' ');
}

export function formatDate(date: Date | string | number | undefined) {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const formatNumber = (num: number, digits: number = 2) => {
  const number = num.toFixed(digits);
  return Number(number);
  // const parts = number.toString().split('.');
  // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return parts.join('.');
};
