interface TdProps {
  children: React.ReactNode;
  py?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  px?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
  textAlign?: "text-start" | "text-end" | "text-center";
}

export function Td({
  children,
  py = 2,
  px = 4,
  textAlign = "text-start",
}: TdProps) {
  return <td className={`py-${py} px-${px} ${textAlign}`}>{children}</td>;
}
