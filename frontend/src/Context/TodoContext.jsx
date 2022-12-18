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

        setFormValues({ ...formValues, [name]: value });
    };

    const storeTodo = async (e) => {
        try {
            await axios.post("todo-items", formValues);
            setVisible(false);
            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const updateTodo = async (id) => {
        try {
            await axios.put(`todo-items/${id}`, formValues);
            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const updateTodoCheckbox = async (id, values) => {
        try {
            await axios.put(`todo-items/${id}`, values);
            getTodos();
        } catch (error) {
            if (error.response.status === 422) {
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