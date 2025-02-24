"use client";
import { configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./features/commentsSlice";
import boardReducer from "./features/boardSlice"

export const store = configureStore({
    reducer: {
        comments: commentsReducer,
        board: boardReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;