import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";

const persistedState = JSON.parse(localStorage.getItem("reduxState") ?? "{}");

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
