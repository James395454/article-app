import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ARTICLES } from "src/common/constants";
import { Article } from "src/interfaces/ArticleInterface";

export interface ArticleState {
  allArticles: Article[];
}

const initialState: ArticleState = {
  allArticles: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticles: (state) => {
      const storedArticles = localStorage.getItem(ARTICLES);
      const allArticles = storedArticles ? JSON.parse(storedArticles) : [];
      state.allArticles = [...allArticles];
    },
  },
});
export const { fetchArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
