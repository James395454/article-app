import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ALLUSERS, AUTH, USER } from "src/common/constants";
import { LoginForm } from "src/components/forms/LoginForm";
import { RegisterForm } from "src/components/forms/RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, setCurrentUser } from "src/store/auth/auth";
import { RootState } from "src/store/store";
import { FieldValues } from "react-hook-form";
import { User } from "src/interfaces/UserInterface";

export const Auth = () => {
  const [authType, setAuthType] = useState(AUTH.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const allUsers = useSelector((state: RootState) => state.auth.allUsers);

  const handleLogin = (values: FieldValues) => {
    const existingUser = allUsers?.find(
      (user) => user.email === values.email && user.password === values.password
    );
    if (existingUser) {
      localStorage.setItem(USER, JSON.stringify(existingUser));
      dispatch(setCurrentUser(existingUser as User));
      navigate("/");
    }
  };

  const handleRegister = (values: FieldValues) => {
    const newUsers = allUsers ? [...allUsers, values] : [values];
    localStorage.setItem(ALLUSERS, JSON.stringify(newUsers));
    dispatch(registerUser(values as User));
    setAuthType(AUTH.login);
  };

  return (
    <div className="flex flex-col items-center">
      {authType === AUTH.login ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <button
            className="bg-submitBg px-5 py-3 text-white border rounded-xl font-medium mt-4"
            onClick={() => setAuthType(AUTH.register)}
          >
            Register
          </button>
        </>
      ) : (
        <>
          <RegisterForm onRegister={handleRegister} />
          <button
            className="bg-submitBg px-5 py-3 text-white border rounded-xl font-medium mt-4"
            onClick={() => setAuthType(AUTH.login)}
          >
            Back to login
          </button>
        </>
      )}
    </div>
  );
};
