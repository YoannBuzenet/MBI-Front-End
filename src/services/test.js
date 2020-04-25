function toCamelCase(str) {
  var result = "";
  if (str.includes("-") || str.includes("_")) {
    if (str.includes("-") && !str.includes("_")) {
      var splitArray = str.split("-");
    }
    if (str.includes("_") && !str.includes("-")) {
      var splitArray = str.split("_");
    }
    console.log(splitArray);
    for (i = 0; i < splitArray.length; i++) {
      if (i > 0) {
        let newString = splitArray[i][0].toUpperCase();
      }
      result = result + splitArray[i];
    }
  }
  return result;
}
