function isPictureDisplayedTopOrBottom(event) {
  var className;

  if (event.clientY < 200) {
    className = "cardPictureOnHoverBottom";
  } else {
    className = "cardPictureOnHoverTop";
  }
  return className;
}

export default {
  isPictureDisplayedTopOrBottom
};
