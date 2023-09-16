const shouldLog = true;

export const Logger = {
  log(message: string, ...optionalParams: any[]) {
    if (shouldLog) {
      console.log(message, ...optionalParams);
    }
  },
  error(message: string, ...optionalParams: any[]) {
    if (shouldLog) {
      console.error(message, ...optionalParams);
    }
  },
  warn(message: string, ...optionalParams: any[]) {
    if (shouldLog) {
      console.warn(message, ...optionalParams);
    }
  },
};
