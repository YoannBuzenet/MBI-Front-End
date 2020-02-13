function isPictureDisplayedTopOrBottom(event) {
  var className;

  if (event.nativeEvent.offsetY < 100) {
    className = "cardPictureOnHoverBottom";
  } else {
    className = "cardPictureOnHoverTop";
  }
  return className;
}

export default {
  isPictureDisplayedTopOrBottom
};
