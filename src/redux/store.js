import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Lưu vào LocalStorage
import { persistReducer, persistStore } from 'redux-persist';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import { combineReducers } from 'redux';

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: persistReducer(persistConfig, authReducer),
    cart: cartReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
