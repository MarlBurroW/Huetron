// import Reactotron from './reactotron';
let Reactotron = null;

if (process.env.NODE_ENV === 'development') {
  import('./reactotron').then(m => {
    Reactotron = m.default;
  });
}

export default {
  log: (...args) => {
    if (Reactotron) Reactotron.log(...args);
  },
  error: (...args) => {
    if (Reactotron) Reactotron.error(...args);
  },
};
