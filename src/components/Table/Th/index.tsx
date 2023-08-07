interface ThProps {
  children: React.ReactNode;
  textAlign?: "text-start" | "text-end" | "text-center";
}

export function Th({ children, textAlign = "text-start" }: ThProps) {
  return <th className={`py-4 px-4  ${textAlign}`}>{children}</th>;
}
