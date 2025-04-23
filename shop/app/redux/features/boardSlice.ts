"use client";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface BoardItem {
    _id: string;
    author: string;
    title: string;
    category: string;
    content: string;
    createdAt: string;
}

interface BoardState {
    list: BoardItem[];
    detail: BoardItem | null;
    status: "idle" | "loading" | "error";
    errorMessage: string | null;
    totalPages: number;
    currentPage: number;
}

// 전체 게시글 get (페이지네이션 지원)
export const fetchBoardList = createAsyncThunk(
    "board/fetchList",
    async ({ page, limit }: { page: number; limit: number }) => {
        const res = await fetch(`/api/board?page=${page}&limit=${limit}`);
        if (!res.ok) {
            throw new Error("Failed to fetch board list");
        }
        const data = await res.json();
        return data;
    }
);

// 특정 게시글 get
export const fetchBoardDetail = createAsyncThunk(
    "board/fetchDetail",
    async (id: string) => {
        const res = await fetch(`/api/board/${id}`);
        if (!res.ok) {
            throw new Error("Failed to fetch board detail");
        }
        const data = await res.json();
        return data as BoardItem;
    }
);

// 게시글 작성 post
export const createBoard = createAsyncThunk(
    "board/create",
    async ({
        author,
        title,
        category,
        content,
    }: {
        author: string;
        title: string;
        category: string;
        content: string;
    }) => {
        const res = await fetch("/api/board", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, category, content, author }),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to create board");
        }
        return true;
    }
);

const initialState: BoardState = {
    list: [],
    detail: null,
    status: "idle",
    errorMessage: null,
    totalPages: 1,
    currentPage: 1,
};

const boardSlice = createSlice({
    name: "board",
    initialState,
    reducers: {
        clearDetail: (state) => {
            state.detail = null;
        },
    },
    extraReducers: (builder) => {
        // 목록
        builder
            .addCase(fetchBoardList.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(fetchBoardList.fulfilled, (state, action) => {
                state.status = "idle";
                state.list = action.payload.boards;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(fetchBoardList.rejected, (state, action) => {
                state.status = "error";
                state.errorMessage = action.error.message || null;
            })

            // 상세
            .addCase(fetchBoardDetail.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(fetchBoardDetail.fulfilled, (state, action) => {
                state.status = "idle";
                state.detail = action.payload;
            })
            .addCase(fetchBoardDetail.rejected, (state, action) => {
                state.status = "error";
                state.errorMessage = action.error.message || null;
            })

            // 새 글 작성
            .addCase(createBoard.pending, (state) => {
                state.status = "loading";
                state.errorMessage = null;
            })
            .addCase(createBoard.fulfilled, (state) => {
                state.status = "idle";
            })
            .addCase(createBoard.rejected, (state, action) => {
                state.status = "error";
                state.errorMessage = action.error.message || null;
            });
    },
});

export const { clearDetail } = boardSlice.actions;
export default boardSlice.reducer;