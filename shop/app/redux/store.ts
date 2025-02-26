"use client";
import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/commentsSlice";
import boardReducer from "./features/boardSlice"
import authReducer from "./features/authSlice"

export const store = configureStore({
    reducer: {
        comments: commentsReducer,
        board: boardReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;