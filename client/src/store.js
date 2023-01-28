import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

//TODO decide if persisted state is required
// const persistedState = JSON.parse(localStorage.getItem("reduxState") ?? "{}");

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  //   preloadedState: persistedState,
});

// store.subscribe(() => {
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });

export default store;
