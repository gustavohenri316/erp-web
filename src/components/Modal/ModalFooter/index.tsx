import { Button } from "../../Button";

export function ModalFooter({
  onClose,
  children = (
    <footer className="bg-gray-100  py-2 sm:px-2 sm:flex sm:flex-row-reverse">
      <Button type="button" variant="danger" onClick={onClose}>
        Fechar
      </Button>
    </footer>
  ),
}: ModalFooterProps) {
  return (
    <footer className="bg-gray-100  justify-end flex gap-2 px-4 py-2">
      {children}
    </footer>
  );
}
