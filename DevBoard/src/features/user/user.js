// Import necessary libraries
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
// Define an asynchronous thunk for login
export const login = createAsyncThunk(
  '/login',
  async ({ email, password }) => {
    // Make a POST request to a login endpoint with email and password
    const response = await axios.post(`${VITE_BACKEND_URL}/api/login`, {
      email,
      password,
    });
    const { token, userAuth } = response.data;
    // Store the received token in local storage
    localStorage.setItem('token', token);
    return { userAuth };
  },
);
// Define an asynchronous thunk for login
export const modifyUser = createAsyncThunk(
  'user/modifyUser',
  async ({ user }) => {
    const {
      id, firstname, lastname, username, email, image_path,
    } = user;
    console.log(user)
    // Make a patch request to a modify endpoint with user object
    const response = await axios.patch(
      `${VITE_BACKEND_URL}/api/user/${id}`,
      {
        firstname,
        lastname,
        username,
        email,
        image_path,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
        },
      },
    );
    const modifiedUser = response.data;
    // Store the received token in local storage
    return { modifiedUser };
  },
);

export const modifyUserPicture = createAsyncThunk(
  'user/modifyUserPicture',
  async ({ formData, id }) => {
    // Make a patch request to a modify endpoint with formData
    const response = await axios.patch(
      `${VITE_BACKEND_URL}/api/user/${id}/profile`,formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
          "Content-Type": "multipart/form-data",
        },
      },
    ).then((response) => {
      return response;
    }).catch((err) => {
      console.error(err);
    });
    const user = response.data;
    return { user };
  },
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async ({ id }) => {
        // Make a delete request
        const response = await axios.delete(
            `${VITE_BACKEND_URL}/api/user/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
                    "Content-Type": "multipart/form-data",
                },
            },
        ).then((response) => {
            return response;
        }).catch((err) => {
            console.error(err);
        });
    },
);

export const getUserPosts = createAsyncThunk(
    'user/getUserPosts',
    async ({ id }) => {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        // Make a POST request to a register endpoint with email and password
        const response = await axios.get(`${VITE_BACKEND_URL}/api/user/${id}/posts`,

            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
                },});
        const {data} = response;
        return data;
    }

);

export const getFeeds = createAsyncThunk(
    'user/getFeeds',
    async () => {
        console.log('hey')
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        // Make a POST request to a register endpoint with email and password
        const response = await fetch(`${VITE_BACKEND_URL}/api/feeds`,

            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Bearer ACCESSTOKEN
                },
            }
        )
        const data = await response.json();
        console.log(data);
        return data;
    }

);

export async function getUserGithubData() {
  const response = await fetch(`${VITE_BACKEND_URL}/api/getUserData`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Bearer ACCESSTOKEN
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return response;
}

export async function getUserGithubRepos() {
  const response = await fetch(`${VITE_BACKEND_URL}/api/getUserRepos`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Bearer ACCESSTOKEN
    },
  })
    .then((response) => response.json())
    .then((data) => data);
  return response;
}

export async function getUserOrgs() {
    const response = await fetch(`${VITE_BACKEND_URL}/api/getUserOrgs`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Bearer ACCESSTOKEN
        },
    })
        .then((response) => response.json())
        .then((data) => data);
    return response;
}



// Define the initial state of the user slice
const initialState = {
  user: {
    email: '',
    password: '',
  },
};

// Create the user slice
export const loginSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Reducer for changing the email value in state
    changeEmailValue: (state, action) => {
      state.user.email = action.payload;
    },
    // Reducer for changing the password value in state
    changePasswordValue: (state, action) => {
      state.user.password = action.payload;
    },
    changeUsernameValue: (state, action) => {
      state.user.username = action.payload;
    },
    changeFirstnameValue: (state, action) => {
      state.user.firstname = action.payload;
    },
    changeLastnameValue: (state, action) => {
      state.user.lastname = action.payload;
    },
    addGithub: (state, action) => {
      state.user.github = action.payload;
    },
    getRepo: (state, action) => {
      console.log(action.payload);
      state.user.repositories = action.payload;
    },
    getOrgs: (state, action) => {
        state.user.organizations = action.payload;
    },
    // Reducer for logging out the user
    logout: (state) => {
      const user = {
        email: '',
        password: '',
      };
      state.user = user;
      state.status = null;
      localStorage.removeItem('token');
      localStorage.removeItem('popupDisplayed');
    },
  },
  // Define extra reducers for handling the login async thunk
  extraReducers: (builder) => {
    builder
      // Reducer for handling the pending state of the login request
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the login request
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.userAuth;
        state.status = true;
      })
      // Reducer for handling the rejected state of the login request
      .addCase(login.rejected, (state, action) => {
        state.user.email = '';
        state.user.password = '';
        state.status = false;
        state.error = action.error.message;
      })
      .addCase(modifyUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the modify request
      .addCase(modifyUser.fulfilled, (state, action) => {
        state.user = action.payload.modifiedUser;
        state.status = true;
      })
      // Reducer for handling the rejected state of the modify request
      .addCase(modifyUser.rejected, (state) => {
        state.status = false;
        state.error = action.error.message;
      })
      .addCase(modifyUserPicture.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      // Reducer for handling the fulfilled state of the modify request
      .addCase(modifyUserPicture.fulfilled, (state, action) => {
        //console.log(action.payload);
        state.user = action.payload.user;
        state.status = true;
      })
      // Reducer for handling the rejected state of the modify request
      .addCase(modifyUserPicture.rejected, (state) => {
        state.status = false;
        state.error = action.error.message;
      })
        .addCase(deleteUser.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        // Reducer for handling the fulfilled state of the modify request
        .addCase(deleteUser.fulfilled, (state) => {
            const user = {
                email: '',
                password: '',
            };
            state.user = user;
            localStorage.removeItem('token');
            localStorage.removeItem('popupDisplayed');
            localStorage.removeItem('playground-js');
            localStorage.removeItem('playground-css');
            localStorage.removeItem('playground-html');
        })
        // Reducer for handling the rejected state of the modify request
        .addCase(deleteUser.rejected, (state, action) => {
            state.status = false;
            state.error = action.error.message;
        })
        .addCase(getUserPosts.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        // Reducer for handling the fulfilled state of the modify request
        .addCase(getUserPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.status = true;
        })
        // Reducer for handling the rejected state of the modify request
        .addCase(getUserPosts.rejected, (state, action) => {
            state.posts = [];
            state.status = false;
            state.error = action.error.message;
        })
        .addCase(getFeeds.fulfilled, (state, action) => {
            console.log("feeds :",action.payload);
            state.feeds = action.payload;
            state.status = true;
        });


  },

});

// Export the actions created by the user slice
export const {
  changeEmailValue,
  changePasswordValue,
  changeUsernameValue,
  changeFirstnameValue,
  changeLastnameValue,
  addGithub,
  getRepo,
  getOrgs,
  logout,
} = loginSlice.actions;

// Export the reducer created by the user slice
export default loginSlice.reducer;
