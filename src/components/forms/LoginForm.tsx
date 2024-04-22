import { InputField } from "src/shared/InputField";
import { validateEmail } from "src/utils/formValidations";
import { useForm, FieldValues } from "react-hook-form";

interface LoginFormProps {
  onLogin: (values: FieldValues) => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onLogin)}
      className="flex flex-col gap-6 mt-[200px] mx-auto max-w-[700px] items-center"
    >
      <InputField
        {...register("email", {
          required: "Please enter a valid email address",
          validate: validateEmail,
        })}
        error={errors.email}
        touchedField={touchedFields.email}
        placeholder="Email address"
        disabled={isSubmitting}
      />
      <InputField
        {...register("password", {
          required: "Please enter your password",
        })}
        error={errors.password}
        touchedField={touchedFields.password}
        placeholder="Password"
        disabled={isSubmitting}
        type="password"
      />
      <button
        type="submit"
        className="bg-submitBg  px-5 py-3 text-white border rounded-xl font-medium"
        disabled={isSubmitting}
      >
        Login
      </button>
    </form>
  );
};
