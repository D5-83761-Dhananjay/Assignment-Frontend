import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./categorySlice";

const Store = configureStore({
  reducer: {
    category: categorySlice,
  },
});

export default Store;
