interface TbodyProps {
  children: React.ReactNode;
}

export function Tbody({ children }: TbodyProps) {
  return <tbody>{children}</tbody>;
}
