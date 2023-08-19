import { Trash } from "phosphor-react";
import { Spinner } from "../../../../components/Spinner";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { Modal } from "../../../../components/Modal";

export function PollsModalDelete({
  handleDelete,
  loading,
  name,
}: ModalDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className="text-neutral-800">
      <ButtonIcon variant="danger" size="sm" onClick={handleOpen}>
        <Trash size={22} />
      </ButtonIcon>
      <Modal.Root isOpen={open}>
        <Modal.Header title="Excluir Feedback" />
        <Modal.Body>
          Tem certeza que deseja excluir essa enquete <b>{name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="p-2 border rounded-md border-neutral-800"
            onClick={handleOpen}
          >
            Cancelar
          </button>
          <Button
            variant="danger"
            disabled={loading}
            onClick={() => {
              handleDelete();
              handleOpen();
            }}
          >
            {loading ? <Spinner /> : "Confirmar"}
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  );
}
