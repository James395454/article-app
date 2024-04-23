import { forwardRef } from "react";
import { FieldError, Merge, FieldErrorsImpl } from "react-hook-form";

interface TextAreaProps {
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  touchedField?: string;
}
export const TextArea = forwardRef(
  (
    {
      error,
      touchedField,
      ...inputProps
    }: TextAreaProps & React.HTMLProps<HTMLTextAreaElement>,
    ref: any
  ) => {
    return (
      <div className="text-left">
        <textarea
          className={`w-[300px] h-[200px] text-md  py-[13px] px-3  rounded-lg border placeholder-inputPlaceholder ${
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
