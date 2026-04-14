function formatNumber(num: number): string {
  return String(num).padStart(2, '0');
}

function formatDateTime(
  date: Date = new Date(),
  format = 'yyyy-MM-dd HH:mm:ss'
): string {
  const pad: any = (str: string, max: number) =>
    str.length < max ? pad(`0${str}`, max) : str;
  const year: any = date.getFullYear();
  const month = pad((date.getMonth() + 1).toString(), 2); // 注意月份是从0开始的
  const day = pad(date.getDate().toString(), 2);
  const hours = pad(date.getHours().toString(), 2);
  const minutes = pad(date.getMinutes().toString(), 2);
  const seconds = pad(date.getSeconds().toString(), 2);

  return format
    .replace(/yyyy/g, year)
    .replace(/MM/g, month)
    .replace(/dd/g, day)
    .replace(/HH/g, hours)
    .replace(/mm/g, minutes)
    .replace(/ss/g, seconds);
}

function formatNowDate(format = 'yyyy-MM-dd HH:mm:ss'): string {
  return formatDateTime(new Date(), format);
}

export { formatNumber, formatDateTime, formatNowDate };
