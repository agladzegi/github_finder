import React, { useReducer } from 'react';
import axios from 'axios';

import GithubConext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from '../types';

let githubToken;

if (process.env.NODE_ENV !== 'production') {
  githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubToken = process.env.GITHUB_TOKEN;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}`,
      {
        headers: {
          Authorization: `token ${githubToken}`
        }
      }
    );

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  // Get User
  const getUser = async login => {
    setLoading();

    const res = await axios.get(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token ${githubToken}`
      }
    });

    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  // Get Repos
  const getRepos = async login => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?per_page=5&sort=created:asc`,
      {
        headers: {
          Authorization: `token ${githubToken}`
        }
      }
    );

    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubConext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getRepos
      }}
    >
      {props.children}
    </GithubConext.Provider>
  );
};

export default GithubState;
