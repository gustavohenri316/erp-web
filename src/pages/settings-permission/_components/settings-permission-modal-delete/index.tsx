import { Trash } from "phosphor-react";
import { Spinner } from "../../../../components/Spinner";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { Modal } from "../../../../components/Modal";

export function SettingsPermissionModalDelete({
  handleDelete,
  loading,
  name,
}: SettingsPermissionModalDeleteProps) {
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
        <Modal.Header title="Excluir Permissão" />
        <Modal.Body>
          Tem certeza que deseja excluir a regra <b>{name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button variant="danger" disabled={loading} onClick={handleDelete}>
            {loading ? <Spinner /> : "Confirmar"}
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </>
  );
}
