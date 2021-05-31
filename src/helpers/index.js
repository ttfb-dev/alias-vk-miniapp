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

const declension = (value, forms) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return forms[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];
};

export { queryStringParse, declension };
