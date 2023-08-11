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
