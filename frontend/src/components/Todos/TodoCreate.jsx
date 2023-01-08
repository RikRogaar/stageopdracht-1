import { useContext, useEffect } from "react";
import TodoContext from "../../Context/TodoContext";
import { Modal, Input, Button, Text, Textarea } from "@nextui-org/react";

export default function TodoCreate () {
  const { formValues, onChange, storeTodo, errors, setVisible, visible, clearFormValues } = useContext(TodoContext);

  function handleCreate() {
    clearFormValues();
    setVisible(true);
  }

  function log() {
    console.log(formValues);
  }

  const closeCreateHandler = () => {
    setVisible(false);
  };

  return (
    <div>
      <button
        className="bg-fuchsia-900 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded-2xl mt-10"
        onClick={handleCreate}
        >
        Create Todo
      </button>

      <Modal
        closeButton
        blur
        preventClose
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeCreateHandler}
      >
        <Modal.Header className="cursor-default">
          <Text id="modal-title" size={18}>
            Create new Todo
          </Text>
        </Modal.Header>
        <Modal.Body className="cursor-default">
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

            <label
              htmlFor="image"
            >
              Upload an image
            </label>

            <input
              type="file"
              name="image"
              onChange={onChange}
              css={{ marginTop: "1rem" }}
            />

            {errors.image && (
              <Text color="error" size={14}>
                {errors.image}
              </Text>
            )}

          </Modal.Body>
          <Modal.Footer className="cursor-default">
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
