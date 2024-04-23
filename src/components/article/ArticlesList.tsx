import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ARTICLES } from "src/common/constants";
import { Article } from "src/components/article/Article";
import { ArticleForm } from "src/components/forms/ArticleForm";
import { Article as ArticleInterface } from "src/interfaces/ArticleInterface";
import { Popup } from "src/shared/popup/Popup";
import { fetchArticles } from "src/store/articles/articles";
import { RootState } from "src/store/store";
import { getBase64 } from "src/utils/imageUtils";
import { v4 as uuid } from "uuid";

export const ArticlesList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state: RootState) => state.articles.articles);
  const [isArticleFormOpen, setIsArticleFormOpen] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState<ArticleInterface | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  const saveArticle = async (values: FieldValues) => {
    const currentDate = new Date(Date.now());
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const image = await getBase64(values.image[0]);

    const newArticle = { ...values, date: formattedDate, id: uuid(), image };
    const newArticles = articles ? [newArticle, ...articles] : [newArticle];
    localStorage.setItem(ARTICLES, JSON.stringify(newArticles));
    dispatch(fetchArticles());
    setIsArticleFormOpen(false);
  };

  const editArticle = async (values: FieldValues) => {
    const currentDate = new Date(Date.now());
    const formattedDate = currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    const storedArticles = localStorage.getItem(ARTICLES);
    const newArticles = storedArticles ? JSON.parse(storedArticles) : [];

    const image = values.image[0]
      ? await getBase64(values.image[0])
      : articleToEdit?.image;

    const articleIndex = newArticles.findIndex(
      (article: ArticleInterface) => article.id === articleToEdit?.id
    );
    newArticles[articleIndex] = {
      ...newArticles[articleIndex],
      ...values,
      date: formattedDate,
      image,
    };

    localStorage.setItem(ARTICLES, JSON.stringify(newArticles));
    dispatch(fetchArticles());
    setArticleToEdit(null);
    setIsArticleFormOpen(false);
  };

  const handleDeleteArticle = (id: string) => {
    const storedArticles = localStorage.getItem(ARTICLES);
    const allArticles = storedArticles ? JSON.parse(storedArticles) : [];
    const newArticles = allArticles.filter(
      (article: ArticleInterface) => article.id !== id
    );
    localStorage.setItem(ARTICLES, JSON.stringify(newArticles));
    dispatch(fetchArticles());
  };

  return (
    <>
      {isArticleFormOpen ? (
        <Popup
          isOpen
          onClose={() => {
            setIsArticleFormOpen(false);
            setArticleToEdit(null);
          }}
          title="Article Form"
        >
          <ArticleForm
            {...(articleToEdit && { initialValues: articleToEdit })}
            onSave={articleToEdit ? editArticle : saveArticle}
          />
        </Popup>
      ) : null}
      <div className="flex flex-col m-auto mt-10 gap-10 items-center">
        <button
          className="bg-submitBg  w-[200px] px-5 py-3 text-white border rounded-xl font-medium"
          onClick={() => setIsArticleFormOpen(true)}
        >
          Add article
        </button>
        {articles.map(
          ({ id, title, content, date, image }: ArticleInterface) => (
            <Article
              title={title}
              content={content}
              date={date}
              image={image}
              id={id}
              onDelete={() => handleDeleteArticle(id)}
              onEdit={() => {
                setIsArticleFormOpen(true);
                setArticleToEdit({ id, title, content, date, image });
              }}
            />
          )
        )}
      </div>
    </>
  );
};
