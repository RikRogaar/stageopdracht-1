import { useContext, useEffect, useState } from "react";
import TodoContext from "../../Context/TodoContext";
import { Modal, Input, Button, Text, Textarea } from "@nextui-org/react";


export default function TodoEdit ({ id }) {
  const { formValues, onChange, errors, getTodo, updateTodo } = useContext(TodoContext);
  const [editVisible, setEditVisible] = useState(false);

  const handleEdit = () => {
    getTodo(id);
    setEditVisible(true)
  };

  const closeEditHandler = () => {
    setEditVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Text color="secondary" onClick={handleEdit}>
        Edit
      </Text>

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={editVisible}
        onClose={closeEditHandler}
        id={id}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Edit Todo
          </Text>
        </Modal.Header>
        <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Edit todo title"
              placeholder="Todo title"
              name="title"
              value={formValues.title}
              onChange={onChange}
            />

            {errors.title && (
              <Text color="error" size={14}>
                {errors.title}
              </Text>
            )}

            <Textarea
              label="Edit todo description"
              size="lg"
              placeholder="Description (optional)"
              name="description"
              value={formValues.description || ""}
              onChange={onChange}
            />


            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Edit image url"
              type="url"
              placeholder="Image url (optional)"
              name="image"
              value={formValues.image || ""}
              onChange={onChange}
            />

          </Modal.Body>
          <Modal.Footer>
            <Button
              auto flat color="secondary"
              onPress={() => {
                updateTodo(id)
                closeEditHandler()
                }}
            >
              Edit todo
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}
