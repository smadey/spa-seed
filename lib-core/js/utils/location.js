export function getQuery() {
  const query = {};

  // 防止 "/#/xxx?xxx" 的形式
  const queryStr = location.search.slice(1) || location.hash.split('?')[1] || '';
  const queryParams = queryStr.split('&');

  let param;

  queryParams.forEach((d) => {
    if (d) {
      param = d.split('=');
      query[param[0]] = unescape(param[1]);
    }
  });

  return query;
}
