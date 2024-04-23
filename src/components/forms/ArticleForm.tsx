import { useState } from "react";
import { InputField } from "src/shared/InputField";
import { validateEmail } from "src/utils/formValidations";
import { useForm, FieldValues } from "react-hook-form";
import { TextArea } from "src/shared/TextArea";
import { Article } from "src/interfaces/ArticleInterface";

interface ArticleFormProps {
  onSave: (values: FieldValues) => void;
  initialValues?: Article;
}

export const ArticleForm = ({ onSave, initialValues }: ArticleFormProps) => {
  const [image, setImage] = useState<string | undefined>(initialValues?.image);
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm();

  const handleImageChange = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className="flex flex-col gap-6 p-4 mx-auto max-w-[700px] items-center"
    >
      <InputField
        {...register("title", {
          required: "Please enter the title of the article",
        })}
        error={errors.title}
        touchedField={touchedFields.title}
        placeholder="Title"
        disabled={isSubmitting}
        {...(initialValues?.title && { defaultValue: initialValues.title })}
      />
      <TextArea
        {...register("content", {
          required: "Please enter some content",
        })}
        error={errors.content}
        touchedField={touchedFields.content}
        placeholder="Content"
        disabled={isSubmitting}
        {...(initialValues?.content && { defaultValue: initialValues.content })}
      />
      <InputField
        {...register("image", {
          required: !image ? "Please select an image" : false,
        })}
        error={errors.image}
        touchedField={touchedFields.image}
        placeholder="Image"
        disabled={isSubmitting}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <img src={image} />
      <button
        type="submit"
        className="bg-submitBg w-[112px] px-5 py-3 text-white border rounded-xl font-medium"
        disabled={isSubmitting}
      >
        Save
      </button>
    </form>
  );
};
