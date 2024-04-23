import { useState } from "react";
import { InputField } from "src/shared/InputField";
import { useForm, FieldValues } from "react-hook-form";
import { TextArea } from "src/shared/TextArea";
import { Article } from "src/interfaces/ArticleInterface";
import toast, { Toaster } from "react-hot-toast";

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
    setValue,
  } = useForm();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file.size < 4000000) {
      setImage(URL.createObjectURL(e.target.files[0]));
    } else {
      setImage(undefined);
      setValue("image", undefined);
      toast.error("Image size must be less than 4MB", {
        position: "bottom-center",
        style: {
          textAlign: "center",
          background: "rgb(13 148 136)",
          color: "white",
        },
      });
    }
  };

  return (
    <>
      <Toaster />
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
          {...(initialValues?.content && {
            defaultValue: initialValues.content,
          })}
        />
        <div className="flex gap-4 items-center ">
          <label className="text-white">Select image</label>
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
        </div>
        <img src={image} className="rounded-md" />
        <button
          type="submit"
          className="bg-submitBg w-[112px] px-5 py-3 text-white border rounded-xl font-medium"
          disabled={isSubmitting}
        >
          Save
        </button>
      </form>
    </>
  );
};
