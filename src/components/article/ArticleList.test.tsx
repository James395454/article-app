import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HomePage } from "src/pages/HomePage";
import userEvent from "@testing-library/user-event";
import { ProviderWrapperMock, initialState } from "src/mockTests";
import { ARTICLES } from "src/common/constants";

test("check if all articles are displayed", () => {
  localStorage.setItem(
    ARTICLES,
    JSON.stringify(initialState.articles.allArticles)
  );
  render(<HomePage />, { wrapper: ProviderWrapperMock });

  const allArticles = initialState.articles.allArticles;

  const articleContainers = screen.getAllByTitle("Edit article");

  expect(articleContainers.length).toBe(allArticles.length);
});

test("should delete an article", async () => {
  localStorage.setItem(
    ARTICLES,
    JSON.stringify(initialState.articles.allArticles)
  );
  render(<HomePage />, { wrapper: ProviderWrapperMock });

  const user = userEvent.setup();
  const allArticles = initialState.articles.allArticles;
  const deleteArticleButton = screen.getAllByTitle("Delete article")[0];

  await user.click(deleteArticleButton);

  const articleContainers = screen.getAllByTitle("Delete article");

  expect(articleContainers.length).toBe(allArticles.length - 1);
});
