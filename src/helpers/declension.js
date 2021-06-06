const declension = (value, forms) => {
  const cases = [2, 0, 1, 1, 1, 2];

  return forms[value % 100 > 4 && value % 100 < 20 ? 2 : cases[value % 10 < 5 ? value % 10 : 5]];
};

export { declension };
