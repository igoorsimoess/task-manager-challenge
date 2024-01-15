import React, { FC, useEffect, useState } from "react";

interface FormProps {
  onSubmit: (
    title: string,
    description: string,
    dueDate: string,
    category: string
  ) => void;
  onFieldChange: (fieldName: string, value: string) => void;
  initialTitle?: string;
  initialDescription?: string;
  initialDueDate?: string;
  initialCategory?: string;
  editedFields?: Partial<{
    title: string;
    description: string;
    dueDate: string;
    category: string;
  }>;
}

const Form: FC<FormProps> = ({
  onSubmit,
  onFieldChange,
  initialTitle = "",
  initialDescription = "",
  initialDueDate = "",
  initialCategory = "",
  editedFields = {},
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [dueDate, setDueDate] = useState(initialDueDate);
  const [category, setCategory] = useState(initialCategory);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setDueDate(initialDueDate);
    setCategory(initialCategory);
  }, [initialTitle, initialDescription, initialDueDate, initialCategory]);

  useEffect(() => {
    setTitle((prevTitle) => editedFields.title || prevTitle);
    setDescription(
      (prevDescription) => editedFields.description || prevDescription
    );
    setDueDate((prevDueDate) => editedFields.dueDate || prevDueDate);
    setCategory((prevCategory) => editedFields.category || prevCategory);
  }, [editedFields]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, description, dueDate, category);
  };

  const handleInputChange = (fieldName: string, value: string) => {
    onFieldChange(fieldName, value);
  };

  return (
    <div>
      <form
        className="max-w-md mx-auto h-fit bg-slate-950 bg-opacity-5 shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 space-y-4 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="title" className="mb-1 font-bold">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-bold">
            Descrição
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-600"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="dueDate" className="mb-1 font-bold">
            Data
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => handleInputChange("dueDate", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-600"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="mb-1 font-bold">
            Categoria
          </label>
          <input
            type="category"
            id="category"
            value={category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md bg-gray-600"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
        >
          Criar
        </button>
      </form>
    </div>
  );
};

export default Form;
