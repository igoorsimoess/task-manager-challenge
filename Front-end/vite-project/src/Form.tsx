import { FC, useEffect, useState } from 'react'

interface FormProps {
    onSubmit: (
        title: string,
        description: string,
        dueDate: string,
        category: string
    ) => void;
    initialTitle?: string;
    initialDescription?: string;
    initialDueDate?: string;
    initialCategory?: string;
}

const Form: FC<FormProps> = ({
    onSubmit,
    initialTitle = "",
    initialDescription = "",
    initialDueDate = "",
    initialCategory = "",
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [dueDate, setDueDate] = useState(initialDueDate);
    const [category, setCategory] = useState(initialCategory);

    // we want to guarantee that after we update the state of the State variables above we set them back to the initial value. ('empty string')
    useEffect(() => {
        setTitle(initialTitle);
        setDescription(initialDescription);
        setDueDate(initialDueDate);
        setCategory(initialCategory);
    }, [initialTitle, initialDescription, initialDueDate, initialCategory]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(title, description, dueDate, category);
        setTitle("");
        setDescription("");
        setDueDate("");
        setCategory("");
    };  

    return <div>
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
                onChange={(e) => setTitle(e.target.value)}
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
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => setDueDate(e.target.value)}
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
                onChange={(e) => setCategory(e.target.value)}
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
}

export default Form