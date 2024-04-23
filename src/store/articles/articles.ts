import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ARTICLES } from "src/common/constants";
import { Article } from "src/interfaces/ArticleInterface";

export interface ArticleState {
  articles: Article[];
}

const initialState: ArticleState = {
  articles: [],
};

export const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    fetchArticles: (state) => {
      const storedArticles = localStorage.getItem(ARTICLES);
      const allArticles = storedArticles ? JSON.parse(storedArticles) : [];
      state.articles = [...allArticles];
    },
  },
});
export const { fetchArticles } = articlesSlice.actions;

export default articlesSlice.reducer;
