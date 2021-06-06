const queryStringParse = (query) => {
  if (typeof query !== 'string') {
    return {};
  }

  query = query.trim().replace(/^[?#&]/, '');
  if (!query) {
    return {};
  }

  const matches = /\?(.+)$/gi.exec(query);
  const str = matches ? matches[1] : query;

  return str.split('&').reduce((acc, item) => {
    const param = item.split('=');

    if (param[1]) {
      acc[param[0]] = decodeURIComponent(param[1]);
    }

    return acc;
  }, {});
};

export { queryStringParse };
