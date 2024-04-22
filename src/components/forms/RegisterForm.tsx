import { InputField } from "src/shared/InputField";
import { validateEmail } from "src/utils/formValidations";
import { useForm, FieldValues } from "react-hook-form";

interface RegisterFormProps {
  onRegister: (values: FieldValues) => void;
}

export const RegisterForm = ({ onRegister }: RegisterFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onRegister)}
      className="flex flex-col gap-6 mt-[200px] mx-auto max-w-[700px] items-center"
    >
      <InputField
        {...register("firstName", {
          required: "Please enter your first name",
        })}
        error={errors.firstName}
        touchedField={touchedFields.firstName}
        placeholder="First Name"
        disabled={isSubmitting}
      />
      <InputField
        {...register("lastName", {
          required: "Please enter your last name",
        })}
        error={errors.lastName}
        touchedField={touchedFields.lastName}
        placeholder="Last Name"
        disabled={isSubmitting}
      />
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
        className="bg-submitBg w-[112px] px-5 py-3 text-white border rounded-xl font-medium"
        disabled={isSubmitting}
      >
        Register
      </button>
    </form>
  );
};
