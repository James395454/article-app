import { forwardRef } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface InputFieldProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  touchedField?: any;
}
export const InputField = forwardRef(
  (
    {
      error,
      touchedField,
      ...inputProps
    }: InputFieldProps & React.HTMLProps<HTMLInputElement>,
    ref: any
  ) => {
    return (
      <div className="text-left">
        <input
          className={`text-md  py-[13px] px-3  rounded-lg border placeholder-inputPlaceholder ${
            error && touchedField ? "border-inputError" : "border-inputBorder"
          } ${error && touchedField ? "text-inputError" : "text-inputText"}`}
          ref={ref}
          {...inputProps}
        />
        {error?.message && touchedField ? (
          <p className="mt-4 text-[red]">{error.message.toString()}</p>
        ) : null}
      </div>
    );
  }
);
