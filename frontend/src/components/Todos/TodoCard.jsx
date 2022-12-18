import React from "react";
import { Card, Grid, Text, Link, Checkbox } from "@nextui-org/react";
import TodoEdit from "./TodoEdit";

export default function TodoCard({ todo }) {
    return (
        <Card css={{ p: "$6", mw: "400px" }} key={todo.id}>
            <Card.Header>
                <img
                    alt="nextui logo"
                    src={
                        todo.image
                            ? todo.image
                            : "https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
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
