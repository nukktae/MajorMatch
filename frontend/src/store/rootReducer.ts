import { combineReducers } from '@reduxjs/toolkit';

// Import your reducers here
// import userReducer from './userSlice';

const rootReducer = combineReducers({
  // Add your reducers here
  // user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer; 