// Simple logger utility
const getTimestamp = () => new Date().toISOString();

export const logger = {
  info: (message) => {
    console.log(`[${getTimestamp()}] [INFO] ${message}`);
  },
  error: (message) => {
    console.error(`[${getTimestamp()}] [ERROR] ${message}`);
  },
  warn: (message) => {
    console.warn(`[${getTimestamp()}] [WARN] ${message}`);
  },
  debug: (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${getTimestamp()}] [DEBUG] ${message}`);
    }
  }
};
