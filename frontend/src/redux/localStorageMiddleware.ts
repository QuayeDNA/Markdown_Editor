// src/redux/localStorageMiddleware.ts
import { Middleware } from 'redux';
import { AppAction } from './actions';

const localStorageMiddleware: Middleware<{}, any, AppAction> = (store) => (next) => (action) => {
  const result = next(action);
  
  if (action.type === 'document/createDocument') {
    const { documents } = store.getState().document;
    localStorage.setItem('documents', JSON.stringify(documents));
  }
  
  return result;
};

export default localStorageMiddleware;