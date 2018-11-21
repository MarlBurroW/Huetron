import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

export default Reactotron.configure({ name: 'Huetron' })
  .use(reactotronRedux())
  .connect();

Reactotron.clear();
