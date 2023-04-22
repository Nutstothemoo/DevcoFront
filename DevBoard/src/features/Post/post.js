import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { login } from '../user/user.js';

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ title, content, id }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    // Make a POST request to a register endpoint with email and password
    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/user/${id}/post`,
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
export const getPosts = createAsyncThunk('post/getPosts', async () => {
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // Make a POST request to a register endpoint with email and password
  const response = await axios.get(`${VITE_BACKEND_URL}/api/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
    },
  });
  const { data } = response;
  return data;
});

export const getLikedPosts = createAsyncThunk(
  'user/getUserLikedPosts',
  async ({ id }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    // Make a POST request to a register endpoint with email and password
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/user/${id}/like/posts`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
        },
      }
    );
    const { data } = response;
    return data;
  }
);

export const likePost = createAsyncThunk(
  'user/likePost',
  async ({ id, postId }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    // Make a POST request to a register endpoint with email and password
    const response = await axios.get(
      `${VITE_BACKEND_URL}/api/user/${id}/like/post/${postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
        },
      }
    );
    const { data } = response;
  }
);

export const deleteLike = createAsyncThunk(
  'user/deletePost',
  async ({ id, postId }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    // Make a POST request to a register endpoint with email and password
    const response = await axios.delete(
      `${VITE_BACKEND_URL}/api/user/${id}/like/post/${postId}`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
        },
      }
    );
    const { data } = response;
  }
);

const initialState = {
  title: '',
  content: '',
};
export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    changeContentValue: (state, action) => {
      state.content = action.payload;
    },
    changeTitleValue: (state, action) => {
      state.title = action.payload;
    },
    extraReducers: (builder) => {
      builder
        // Reducer for handling the pending state of the addPost request
        .addCase(addPost.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        // Reducer for handling the fulfilled state of the addPost request
        .addCase(addPost.fulfilled, (state) => {
          console.log('test');
          state.post = {
            title: '',
            content: '',
          };
          state.status = true;
        })
        // Reducer for handling the rejected state of the addPost request
        .addCase(addPost.rejected, (state, action) => {
          state.status = false;
          state.error = action.error.message;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer for handling the pending state of the addPost request
      .addCase(addPost.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the addPost request
      .addCase(addPost.fulfilled, (state) => {
        state.post = {
          title: '',
          content: '',
        };
        state.status = true;
      })
      // Reducer for handling the rejected state of the addPost request
      .addCase(addPost.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })
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
      })
      .addCase(getLikedPosts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the modify request
      .addCase(getLikedPosts.fulfilled, (state, action) => {
        state.liked_posts = action.payload;
        state.status = true;
      })
      // Reducer for handling the rejected state of the modify request
      .addCase(getLikedPosts.rejected, (state, action) => {
        state.liked_posts = [];
        state.status = false;
        state.error = action.error.message;
      });
  },
});

export const { changeTitleValue, changeContentValue } = postSlice.actions;

export default postSlice.reducer;
