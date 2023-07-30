export function ModalHeader({ title = "Título do Modal" }: ModalHeaderProps) {
  return <h2 className="text-xl font-bold mb-4 px-4 pt-4">{title}</h2>;
}
