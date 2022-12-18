import React, { useEffect, useContext } from "react";
import TodoContext from "../../Context/TodoContext";
import TodoCard from "./TodoCard";
import TodoCreate from "./TodoCreate";

export const TodoIndex = () => {
    const { todos, getTodos } = useContext(TodoContext);

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <div className="flex justify-center mb-10">
                <TodoCreate />
            </div>
            <div className="flex flex-row flex-wrap gap-x-8 gap-y-8">
                {todos.map((todo) => (
                    <TodoCard todo={todo} key={todo.id} />
                ))}
            </div>
        </>
    );
};