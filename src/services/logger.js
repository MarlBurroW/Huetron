export default {
  log: (...args) => {
    if (process.env.NODE_ENV === 'development')
      require('./reactotron').log(...args);
  },
  error: (...args) => {
    if (process.env.NODE_ENV === 'development')
      require('./reactotron').error(...args);
  },
};
