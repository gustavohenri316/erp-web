import React from "react";

interface Props {
  date: string;
}

const formatDate = (inputDate: Date) => {
  const today = new Date();
  const diffInDays = Math.floor(
    (today.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays <= 5) {
    if (diffInDays === 0) {
      return (
        "Hoje às " +
        inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } else if (diffInDays === 1) {
      return (
        "Ontem às " +
        inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } else {
      return `Há ${diffInDays} dias atrás às ${inputDate.toLocaleTimeString(
        [],
        { hour: "2-digit", minute: "2-digit" }
      )}`;
    }
  } else {
    return (
      inputDate.toLocaleDateString([], {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      " às " +
      inputDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  }
};

const DateDisplay: React.FC<Props> = ({ date }) => {
  const formattedDate = formatDate(new Date(date));

  return <span>{formattedDate}</span>;
};

export default DateDisplay;
