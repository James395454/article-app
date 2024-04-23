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
import toast, { Toaster } from "react-hot-toast";

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
    } else {
      toast.error("Invalid credentials", {
        position: "bottom-center",
        style: {
          textAlign: "center",
          background: "rgb(13 148 136)",
          color: "white",
        },
      });
    }
  };

  const handleRegister = (values: FieldValues) => {
    const newUsers = allUsers ? [...allUsers, values] : [values];
    localStorage.setItem(ALLUSERS, JSON.stringify(newUsers));
    dispatch(registerUser(values as User));
    setAuthType(AUTH.login);
    toast.success(
      "You have been registered successfully, you may now login with your new credentials",
      {
        position: "bottom-center",
        style: {
          textAlign: "center",
          background: "rgb(13 148 136)",
          color: "white",
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center  rounded-md max-w-[600px] mt-[100px] mx-auto p-10 gap-6 bg-[#31365F]">
      <Toaster />
      <h1 className="text-lg text-white">Login</h1>
      {authType === AUTH.login ? (
        <>
          <LoginForm onLogin={handleLogin} />
          <button
            className="bg-submitBg px-5 py-3 text-white rounded-xl font-medium w-[150px]"
            onClick={() => setAuthType(AUTH.register)}
          >
            Register
          </button>
        </>
      ) : (
        <>
          <RegisterForm onRegister={handleRegister} />
          <button
            className="bg-[blue] px-5 py-3 text-white rounded-xl font-medium w-[150px]"
            onClick={() => setAuthType(AUTH.login)}
          >
            Back to login
          </button>
        </>
      )}
    </div>
  );
};
