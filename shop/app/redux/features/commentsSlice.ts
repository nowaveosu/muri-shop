"use client"; 

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (productId: string) => {
        const res = await fetch(`/api/comments/${productId}`);
        const data = await res.json();
        return { productId, data };
}
);


export const addComment = createAsyncThunk(
    "comments/addComment",
    async ({
        productId,
        author,
        content,
    }: {
        productId: string;
        author: string;
        content: string;
    }) => {
    await fetch(`/api/comments/${productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, content }),
    });

    return { productId };
}
);

interface Comment {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
}

interface CommentsState {

    items: Record<string, Comment[]>;
    status: "idle" | "loading" | "failed";
}

const initialState: CommentsState = {
    items: {},
    status: "idle",
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchComments.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            const { productId, data } = action.payload;
            state.items[productId] = data; 
            state.status = "idle";
        })
        .addCase(fetchComments.rejected, (state) => {
            state.status = "failed";
        })

        .addCase(addComment.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.status = "idle";
        })
        .addCase(addComment.rejected, (state) => {
            state.status = "failed";
        });
},
});

export default commentsSlice.reducer;