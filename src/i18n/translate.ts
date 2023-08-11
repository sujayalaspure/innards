import en from './en-us.json';

type keyTypes = keyof typeof en;
export const translate = (key: keyTypes) => {
  return en[key];
};
