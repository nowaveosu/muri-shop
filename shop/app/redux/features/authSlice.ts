"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    status: "idle" | "loading" | "error";
    errorMessage: string | null;
}

const initialState: AuthState = {
    user: null,
    status: "idle",
    errorMessage: null,
};

export const loginThunk = createAsyncThunk(
    "auth/login",
    async ({ email, password }: { email: string; password: string }) => {

        const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "로그인 실패");
        }
        const data = await res.json();
        return data
    }
    );

    const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
        state.user = null;
        state.errorMessage = null;
        state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginThunk.pending, (state) => {
            state.status = "loading";
            state.errorMessage = null;
        })
        .addCase(loginThunk.fulfilled, (state, action) => {
            state.status = "idle";
            state.user = action.payload; 
        })
        .addCase(loginThunk.rejected, (state, action) => {
            state.status = "error";
            state.errorMessage = action.error.message || null;
            state.user = null;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;