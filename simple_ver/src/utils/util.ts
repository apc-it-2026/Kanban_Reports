function getUrlParams(url: string): any[] {
  return url
    .slice(url.indexOf('?') + 1)
    .split('&')
    .map((param) => param.split('='))
    .map(([key, value]) => ({
      key,
      value,
    }));
}

function getUrlParam(url: string, key: string): string {
  return getUrlParams(url).find((el) => el.key === key)?.value;
}

// 公共-压入空行
function pushEmptyRow(data: any, rowNum: number, columnNum: number) {
  if (data.length > rowNum) {
    return;
  }
  const emptyRow = [];
  for (let j = 0; j < columnNum; j += 1) {
    emptyRow.push('');
  }
  const len = rowNum - data.length;
  for (let i = 0; i < len; i += 1) {
    data.push(emptyRow);
  }
}
export { getUrlParams, getUrlParam , pushEmptyRow  };
