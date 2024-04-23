import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER } from "src/common/constants";
import { ArticlesList } from "src/components/article/ArticlesList";
import { RootState } from "src/store/store";

export const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const onLogout = () => {
    localStorage.removeItem(USER);
    navigate("/login");
  };

  return (
    <div className="p-10 flex flex-col items-center">
      <button
        className="bg-[blue] px-5 py-3 text-white border rounded-xl font-medium mt-4 self-end"
        onClick={onLogout}
      >
        Sign out
      </button>
      <h1 className="text-lg">
        Hello {user?.firstName} {user?.lastName} and welcome to our articles
        page!
      </h1>
      <ArticlesList />
    </div>
  );
};
