export const applyCNPJMask = (cnpj: string) => {
  if (!cnpj) return "";

  const onlyNumbers = cnpj.replace(/\D/g, "");

  if (onlyNumbers.length <= 14) {
    const maskedCNPJ = onlyNumbers
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");

    return maskedCNPJ;
  }

  return cnpj;
};
