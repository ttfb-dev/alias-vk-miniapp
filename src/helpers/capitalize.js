export const capitalize = (string, locale = window.navigator.language) => {
  if (!string.length) {
    return '';
  }

  return string.charAt(0).toLocaleUpperCase(locale) + string.slice(1);
};
