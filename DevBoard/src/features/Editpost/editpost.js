import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deletePost = createAsyncThunk(
  'editPost/deletePost',
  async ({ postId, id }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.delete(
      `${VITE_BACKEND_URL}/api/user/${id}/post/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
        },
      }
    );
    console.log(response);
  }
);
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const { VITE_BACKEND_URL } = import.meta.env;
  // Make a POST request to a register endpoint with email and password
  const response = await axios.get(`${VITE_BACKEND_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
    },
  });
  const { data } = response;
  return data;
});

export const editPost = createAsyncThunk(
  'editPost/editPost',
  async ({ title, content, postId, user_id }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const response = await axios.patch(
      `${VITE_BACKEND_URL}/api/user/${user_id}/post/${postId}`,
      {
        title,
        content,
      },

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
        },
      }
    );
    console.log(response);
  }
);

const initialState = {
  title: '',
  content: '',
};
export const editSlice = createSlice({
  name: 'editpost',
  initialState,
  reducers: {
    changeContentValue: (state, action) => {
      state.content = action.payload;
    },
    changeTitleValue: (state, action) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer for handling the pending state of the addPost request
      .addCase(getPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the addPost request
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = true;
      })
      // Reducer for handling the rejected state of the addPost request
      .addCase(getPosts.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      });
  },
});

export const { changeTitleValue, changeContentValue } = editSlice.actions;

export default editSlice.reducer;
