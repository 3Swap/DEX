import { configureStore } from '@reduxjs/toolkit';
import { reducer as assetsReducer } from './assetsSlice';

export default configureStore({
  reducer: {
    assets: assetsReducer
  }
});
