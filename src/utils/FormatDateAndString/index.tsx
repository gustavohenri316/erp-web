export const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  if (isToday) {
    return `Hoje às ${hours}:${minutes}`;
  } else {
    return `${date.toLocaleDateString()} às ${hours}:${minutes}`;
  }
};
