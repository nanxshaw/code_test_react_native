import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';
const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
  timeout:null,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
let store = createStore(persistedReducer, applyMiddleware(thunk))
let persistor = persistStore(store)
export { store, persistor }
