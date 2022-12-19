import moment from "moment";

const dateService = (dateTime) => {
  let dateMoment = moment(dateTime, "DD.MM.YYYY HH:mm:ss");
  if (dateMoment.isValid()) {
    return dateMoment.format("YYYY-MM-DDTHH:mm");
  }
  return "";
};

export default dateService;
