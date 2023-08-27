import { Trash } from "phosphor-react";
import { Spinner } from "../../../../components/Spinner";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { Modal } from "../../../../components/Modal";

export function CustomersViewModalDelete({
  handleDelete,
  loading,
  name,
}: ModalDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <ButtonIcon variant="danger" size="sm" onClick={handleOpen}>
        <Trash size={22} />
      </ButtonIcon>
      <Modal.Root isOpen={open}>
        <Modal.Header title="Excluir Cliente" />
        <Modal.Body>
          Tem certeza que deseja excluir o cliente <b>{name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleOpen}>
            Cancelar
          </Button>
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
    </>
  );
}
