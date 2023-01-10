import { createContext, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";

const TodoContext = createContext();

export const TodoProdiver = ({ children }) => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState([]);
    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);

    const [formValues, setFormValues] = useState({
        title: "",
        description: "",
        image: "",
        is_completed: false,
      });

    const getTodos = async () => {
        const response = await axios.get(
            "todo-items"
        );

        response.data.data.forEach((todo) => {
            if (todo.image == null || todo.image == "") {
                todo.image = `https://nextui.org/images/fruit-1.jpeg`;
            } else {
                todo.image = `http://localhost:8000/storage/images/${todo.image}`;
            }
        })

        setTodos(response.data.data);
    };

    const getTodo = async (id) => {
        const response = await axios.get(
            `todo-items/${id}`
        );

        const apiTodo = response.data.data

        setTodo(apiTodo);

        setFormValues({
            title: apiTodo.title,
            description: apiTodo.description,
            image: apiTodo.image,
            is_completed: apiTodo.is_completed,
        });
    };

    const onChange = (e) => {
        const { name, value } = e.target;

        if (name === "image") {
            setFormValues({ ...formValues, image: e.target.files[0] });
            return;
        }

        setFormValues({ ...formValues, [name]: value });
    };

    async function storeTodo (e) {
        try {
            const formData = new FormData();

            formData.append("title", formValues.title);
            formData.append("description", formValues.description);
            formData.append("image", formValues.image);
            formData.append("is_completed", 0);

            await axios.post("todo-items", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setVisible(false);
            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            }
        }
    };

    async function updateTodo (id) {
        try {
            const formData = new FormData();

            formData.append("title", formValues.title);
            formData.append("description", formValues.description);
            formData.append("is_completed", formValues.is_completed);
            formData.append("_method", "PUT")

            if (formValues.image instanceof File) {
                formData.append("image", formValues.image);
            }

            await axios.post(`todo-items/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors)
                setErrors(error.response.data.errors);
            }
        }
    };

    const updateTodoCheckbox = async (id, values) => {
        try {
            await axios.put(`todo-items/${id}`, {
                title: values.title,
                description: values.description,
                is_completed: values.is_completed,
            });

            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
                setErrors(error.response.data.errors);
            }
        }
    };

    const clearFormValues = () => {
        setFormValues({
            title: "",
            description: "",
            image: "",
            is_completed: false,
        });
    }

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`todo-items/${id}`);
            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
                console.log(error.response.data.errors);
            }
        }
    };

    return <TodoContext.Provider
                value={{
                    todo, todos, getTodo, getTodos, onChange, formValues,
                    storeTodo, errors, setVisible, visible, updateTodo,
                    updateTodoCheckbox, clearFormValues, deleteTodo }}
                >
                {children}
            </TodoContext.Provider>;
};

export default TodoContext;