import moment from "moment";

const FormatCreationDateTime = (row, column) => {
  if (column.field === "Dateupdated") {
    if (row["Dateupdated"] !== null && row["Dateupdated"] !== "")
      return moment(row["Dateupdated"]).format("MMM DD, YYYY hh:mm:ss A");
  } else if (column.field === "Datecreated") {
    if (row["Datecreated"] !== null && row["Datecreated"] !== "")
      return moment(row["Datecreated"]).format("MMM DD, YYYY hh:mm:ss A");
  } else if (column.field === "Lastheartbit") {
    if (row["Lastheartbit"] !== null && row["Lastheartbit"] !== "")
      return moment(row["Lastheartbit"]).format("MMM DD, YYYY hh:mm:ss A");
  } else if (column.field === "Lastread") {
    if (row["Lastread"] !== null && row["Lastread"] !== "")
      return moment(row["Lastread"]).format("MMM DD, YYYY hh:mm:ss A");
  }
};

export { FormatCreationDateTime };
