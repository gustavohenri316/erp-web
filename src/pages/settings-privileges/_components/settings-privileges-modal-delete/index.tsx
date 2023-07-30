import { Spinner, Trash } from "phosphor-react";
import { useState } from "react";
import { Button } from "../../../../components/Button";
import { ButtonIcon } from "../../../../components/ButtonIcon";
import { Modal } from "../../../../components/Modal";

interface SettingsPrivilegesModalDeleteProps {
  name: string;
  handleDelete: () => void;
  loading: boolean;
}

export function SettingsPrivilegesModalDelete({
  handleDelete,
  loading,
  name,
}: SettingsPrivilegesModalDeleteProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  async function handleClose() {
    try {
      await handleDelete();
    } catch (err) {
      console.error(err);
    } finally {
      handleOpen();
    }
  }
  return (
    <>
      <ButtonIcon variant="danger" size="sm" onClick={handleOpen}>
        <Trash size={22} />
      </ButtonIcon>
      <Modal.Root isOpen={open}>
        <Modal.Header title="Excluir Privilégios" />
        <Modal.Body>
          <div className="mb-4 rounded-sm bg-gray-200 px-1 font-medium">
            Aviso: Se prosseguir com a exclusão todos os usuários que tiverem
            esse privilégio deixara de ter.
          </div>
          <div className="px-1">
            Tem certeza que deseja essa permissão <b>{name}</b>?
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleOpen}>
            Cancelar
          </Button>
          <Button variant="danger" disabled={loading} onClick={handleClose}>
            {loading ? <Spinner /> : "Confirmar"}
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </>
  );
}
