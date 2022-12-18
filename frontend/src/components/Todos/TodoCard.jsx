import React, { useContext } from "react";
import { Card, Grid, Text, Checkbox } from "@nextui-org/react";
import TodoEdit from "./TodoEdit";
import TodoContext from "../../Context/TodoContext";

export default function TodoCard({ todo }) {
    const { updateTodoCheckbox } = useContext(TodoContext);

    const handleCheckbox = () => {
        todo.is_completed = !todo.is_completed;
        updateTodoCheckbox(todo.id, todo);
    };

    return (
        <Card css={{ p: "$6", mw: "400px" }} key={todo.id}>
            <Card.Header>
                <img
                    alt="nextui logo"
                    src={
                        todo.image
                            ? todo.image
                            // : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                            : "https://cdn-icons-png.flaticon.com/512/3884/3884607.png"
                    }
                    width="34px"
                    height="34px"
                />

                <Grid.Container css={{ pl: "$6" }}>
                    <Grid xs={12}>
                        <Text h4 css={{ lineHeight: "$xs" }}>
                            {todo.title}
                        </Text>
                    </Grid>
                    <Grid xs={12}>
                        <Checkbox
                            color="secondary"
                            labelColor="secondary"
                            lineThrough={true}
                            size="xs"
                            defaultSelected={todo.is_completed ? true : false}
                            onChange={handleCheckbox}
                        >
                            Completed
                        </Checkbox>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: "$2" }}>
                <Text>
                    {todo.description ? todo.description : "No description"}
                </Text>
            </Card.Body>
            <Card.Footer>
                <TodoEdit id={todo.id}/>
            </Card.Footer>
        </Card>

    );
}
