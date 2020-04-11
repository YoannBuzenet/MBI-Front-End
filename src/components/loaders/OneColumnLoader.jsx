import React from "react";
import ContentLoader from "react-content-loader";

const OneColumnLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={500}
    viewBox="0 0 300 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="13" y="21" rx="0" ry="0" width="171" height="17" />
    <rect x="14" y="52" rx="0" ry="0" width="171" height="17" />
    <rect x="14" y="85" rx="0" ry="0" width="171" height="17" />
    <rect x="15" y="116" rx="0" ry="0" width="171" height="17" />
    <rect x="15" y="147" rx="0" ry="0" width="171" height="17" />
    <rect x="16" y="178" rx="0" ry="0" width="171" height="17" />
    <rect x="16" y="211" rx="0" ry="0" width="171" height="17" />
    <rect x="17" y="242" rx="0" ry="0" width="171" height="17" />
  </ContentLoader>
);

export default OneColumnLoader;
