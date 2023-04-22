import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteFeed = createAsyncThunk(
  'post/deleteFeed',
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
export const addFeed = createAsyncThunk(
  'post/addFeed',
  async ({ name, url, id }) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    // Make a POST request to a register endpoint with email and password
    const response = await axios.post(
      `${VITE_BACKEND_URL}/api/user/${id}/feed`,
      {
        name,
        url,
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

export const getUsersFeed = createAsyncThunk(
    'user/getUserFeeds',
    async ({ id }) => {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        // Make a POST request to a register endpoint with email and password
        const response = await axios.get(`${VITE_BACKEND_URL}/api/user/${id}/feeds`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
                },
            }
            );
        const {data} = response;
        console.log(data);
        return data;
    }

);

const initialState = {
  name: '',
  url: '',
};
export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    changeContentValue: (state, action) => {
      state.url = action.payload;
    },
    changeTitleValue: (state, action) => {
      state.name = action.payload;
    },
    extraReducers: (builder) => {
      builder
        // Reducer for handling the pending state of the addFeed request
        .addCase(addFeed.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        // Reducer for handling the fulfilled state of the addFeed request
        .addCase(addFeed.fulfilled, (state) => {
          console.log('test');
          state.post = {
            name: '',
            url: '',
          };
          state.status = true;
        })
        // Reducer for handling the rejected state of the addFeed request
        .addCase(addFeed.rejected, (state, action) => {
          state.status = false;
          state.error = action.error.message;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer for handling the pending state of the addFeed request
      .addCase(addFeed.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the addFeed request
      .addCase(addFeed.fulfilled, (state) => {
        console.log('test');
        state.post = {
          name: '',
          url: '',
        };
        state.status = true;
      })
      // Reducer for handling the rejected state of the addFeed request
      .addCase(addFeed.rejected, (state, action) => {
        state.status = false;
        state.error = action.error.message;
      })
        .addCase(getFeeds.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        // Reducer for handling the fulfilled state of the addFeed request
        .addCase(getFeeds.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = true;
        })
        // Reducer for handling the rejected state of the addFeed request
        .addCase(getFeeds.rejected, (state, action) => {
            state.status = false;
            state.error = action.error.message;
        })
  },
});

export const { changeTitleValue, changeContentValue } = feedSlice.actions;

export default feedSlice.reducer;