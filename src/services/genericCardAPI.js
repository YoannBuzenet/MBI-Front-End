function isPictureDisplayedTopOrBottom(event) {
  var className;

  if (event.clientY < 280) {
    className = "cardPictureOnHoverBottom";
  } else {
    className = "cardPictureOnHoverTop";
  }
  return className;
}

export default {
  isPictureDisplayedTopOrBottom
};
