// Methods
const doPluralize = (number: number, titles: Array<string>) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
};

const doValidateURL = (value: string) => {
  return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );
};

const doValidateLiteralExt = (str: string) => {
  return /^[0-9A-Za-zА-Яа-я _-]*[0-9A-Za-zА-Яа-я][0-9A-Za-zА-Яа-я _-]*$/.test(str);
};

const doValidateLiteral = (str: string) => {
  return /^[0-9A-Za-zА-Яа-я]*[0-9A-Za-zА-Яа-я][0-9A-Za-zА-Яа-я]*$/.test(str);
};

const doValidatePrice = (str: string) => {
  return /^[0-9.]*$/.test(str);
};

// Export
export { doPluralize, doValidateURL, doValidateLiteralExt, doValidateLiteral, doValidatePrice };
