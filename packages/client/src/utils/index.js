export { default as api } from './api';
export const checkValidity = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return isValid;
  }
  if (!value && rules.noTouched) {
    return isValid;
  }
  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }
  if (rules.isEmail) {
    // eslint-disable-next-line no-useless-escape
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.haveDigit) {
    const pattern = /\d/;
    isValid = pattern.test(value) && isValid;
  }
  if (rules.dob) {
    const timestamp = Date.parse(value);
    if (Number.isNaN(timestamp)) isValid = Number.isNaN(timestamp) && isValid;
    else {
      const date = new Date(value);
      isValid = date < new Date() && date > new Date('1900-1-1') && isValid;
    }
  }
  return isValid;
};
