import {store} from '../store';
import {setError} from '../store/data/reducer';
import {clearErrorAction} from '../store/api';

const ProcessErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};

export default ProcessErrorHandle;
