//convertit une date de format US au format UK/FR
export default function dateFormatter(string) {
  const year = string.slice(0, 4);
  const month = string.slice(5, 7);
  const day = string.slice(8, 10);
  const formattedDate = day + '/' + month + '/' + year;
  return formattedDate;
}

// console.log(dateFormatter('1996-08-01T00:00:00'));

//"1996-08-01T00:00:00"
