const mash = {};

mash.LOG_WARN = "WARN";
mash.LOG_ERR = "ERR";

mash.log = (mode, text) => {
  switch (mode) {
    case "WARN":
      console.warn(text);
      break;

    case "ERR":
      console.error(text);
      break;

    default:
      console.log(text);
  }
};

module.exports = mash;
