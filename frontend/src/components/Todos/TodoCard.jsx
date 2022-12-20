import React, { useContext } from "react";
import { Card, Grid, Text, Checkbox, Popover} from "@nextui-org/react";
import TodoEdit from "./TodoEdit";
import TodoContext from "../../Context/TodoContext";

export default function TodoCard({ todo }) {
    const { updateTodoCheckbox } = useContext(TodoContext);

    const handleCheckbox = () => {
        todo.is_completed = !todo.is_completed;
        updateTodoCheckbox(todo.id, todo);
    };


    const createdTime = todo.created_at.split("T")[1].split(".")[0];
    const createdDate = todo.created_at.split("T")[0].split("-");
    const createdDateFormatted = `${createdDate[2]}/${createdDate[1]}/${createdDate[0]}`;
    const createdAtDate = `${createdDateFormatted}, ${createdTime}`;

    const updatedTime = todo.updated_at.split("T")[1].split(".")[0];
    const updatedDate = todo.updated_at.split("T")[0].split("-");
    const updatedDateFormatted = `${updatedDate[2]}/${updatedDate[1]}/${updatedDate[0]}`;
    const updatedAtDate = `${updatedDateFormatted}, ${updatedTime}`;

    return (
        <Card css={{ p: "$6", mw: "400px" }} key={todo.id}>
            <Card.Header>
                <img
                    alt="nextui logo"
                    src={
                        todo.image
                            ? todo.image
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


                <Popover>
                    <Popover.Trigger>
                            <Text color='secondary' className="cursor-pointer">
                                Details
                            </Text>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Text css={{ pt: "$10", pl: "$10" }}>Created at: {createdAtDate}</Text>
                        <Text css={{ p: "$10" }}>Last updated at: {updatedAtDate}</Text>
                    </Popover.Content>
                </Popover>
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
