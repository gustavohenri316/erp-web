interface ICard {
  children: React.ReactNode;
}

export function Card({ children }: ICard) {
  return <div className="flex flex-col border rounded-md p-2">{children}</div>;
}
