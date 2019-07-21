import moment from "moment";

export default {
  formatDate(val) {
    return moment(val).format("MMM Do YY");
  },
  formatDateTime(val) {
    return moment(val)
      .format("MMMM Do YYYY, h:mm:ss a")
      .replace("am", "AM")
      .replace("pm", "PM");
  }
};
