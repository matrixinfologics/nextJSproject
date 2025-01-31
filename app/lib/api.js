// api.js

import axios from 'axios';

const BASE_PAGE_URL = process.env.NEXT_PUBLIC_BASE_PAGE_URL;
const BASE_POST_URL = process.env.NEXT_PUBLIC_BASE_POST_URL;

export const fetchPageData = async (slug) => {
  try {
    const response = await axios.get(`${BASE_PAGE_URL}/?slug=${slug}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchPosts = async () => {
  try {
    const response = await axios.get(BASE_POST_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
