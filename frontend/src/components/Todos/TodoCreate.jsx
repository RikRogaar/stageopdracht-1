import { useContext } from "react";
import TodoContext from "../../Context/TodoContext";
import { Modal, Input, Button, Text, Textarea } from "@nextui-org/react";

export default function TodoCreate () {
  const { formValues, onChange, storeTodo, errors, setVisible, visible } = useContext(TodoContext);

  const handleCreate = () => setVisible(true);

  const closeCreateHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreate}
        >
        Create Todo
      </button>

      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeCreateHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Create new Todo
          </Text>
        </Modal.Header>
        <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Enter your todo title"
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
              label="Enter your todo description"
              size="lg"
              placeholder="Description (optional)"
              name="description"
              value={formValues.description}
              onChange={onChange}
            />

            <Input
              clearable
              bordered
              fullWidth
              size="lg"
              label="Enter an image url"
              type="url"
              placeholder="Image url (optional)"
              name="image"
              value={formValues.image}
              onChange={onChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              auto flat color="secondary"
              onPress={storeTodo}
            >
              Add new todo
            </Button>
          </Modal.Footer>
      </Modal>
    </div>
  )
}
