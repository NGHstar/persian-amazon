export function persianDate(daysToAdd) {
  let date = new Date();
  date.setDate(date.getDate() + daysToAdd);

  return new Intl.DateTimeFormat("fa", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}
