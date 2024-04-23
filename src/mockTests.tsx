import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { authSlice } from "./store/auth/auth";
import { ArticleState, articlesSlice } from "./store/articles/articles";
import { configureStore } from "@reduxjs/toolkit";

export const ProviderWrapperMock = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Provider store={mockStore}>
    <BrowserRouter>{children}</BrowserRouter>
  </Provider>
);

export const MOCK_ARTICLES = [
  {
    title: "fdsf",
    content: "fdsfde",
    date: "April 23, 2024",
    id: "fd73a380-a0bf-4f23-b87e-2bec89e0370f",
  },
];

export const initialState = {
  auth: {
    user: {
      firstName: "James",
      lastName: "Wesley",
      email: "james94@aucegypt.edu",
      password: "123456",
    },
  },
  articles: {
    allArticles: [
      {
        title: "article1",
        content: "article1",
        date: "April 23, 2024",
        id: "1",
        image: "",
      },
      {
        title: "article2",
        content: "article2",
        date: "April 23, 2024",
        id: "2",
        image: "",
      },
    ],
  },
};

export const mockStore = configureStore({
  reducer: { auth: authSlice.reducer, articles: articlesSlice.reducer as any },
  preloadedState: initialState,
});
