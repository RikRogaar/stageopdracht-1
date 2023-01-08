import React, { useContext } from "react";
import { Card, Grid, Text, Checkbox, Row, Button, Col, Popover } from "@nextui-org/react";
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
        <Card css={{ mw: "400px", height: "32vh" }} key={todo.id}>
            <Card.Header css={{ position: "absolute", zIndex: 1, top: 0, bgBlur: "#0f111466" }} isBlurred>
                <Col>
                    <Text h3 color="white">
                    {todo.title}
                    </Text>
                </Col>
            </Card.Header>
        <Card.Body css={{ p: 0 }}>
          <Card.Image
            src={todo.image}
            objectFit="cover"
            width="100%"
            height="100%"
            alt="Relaxing app background"
          />
        </Card.Body>
        <Card.Footer
          isBlurred
          css={{
            position: "absolute",
            bgBlur: "#0f111466",
            borderTop: "$borderWeights$light solid $gray800",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col>
                  <Text color="white" size={12}>
                    <TodoEdit id={todo.id}/>
                  </Text>
                  <Checkbox
                    color="success"
                    labelColor="success"
                    lineThrough={true}
                    size="xs"
                    defaultSelected={todo.is_completed ? true : false}
                    onChange={handleCheckbox}
                >
                    Completed
                </Checkbox>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify="flex-end">
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: "#94f9f0", bg: "#94f9f026" }}
                >
                 <Popover>
                     <Popover.Trigger>
                             <Text color='white' className="cursor-pointer">
                                 Details
                             </Text>
                     </Popover.Trigger>
                     <Popover.Content>
                         <Text css={{ pt: "$10", pl: "$10", pr: "$10", overflowWrap: 'break-word' }}>Description:  {todo.description ? todo.description : "None"}</Text>
                         <Text css={{ pt: "$10", pl: "$10" }}>Created at: {createdAtDate}</Text>
                         <Text css={{ p: "$10" }}>Last updated at: {updatedAtDate}</Text>
                     </Popover.Content>
                 </Popover>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
}
