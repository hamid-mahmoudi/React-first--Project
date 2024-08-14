import React from "react";
import SkeletionLoading from "./SkeletionLoading";

const Magnify = () => {
  return (
    <div>
      <div className="d-none d-lg-block">
        <SkeletionLoading />
        &#133;
        <SkeletionLoading />
        &#133;
        <SkeletionLoading />
      </div>
    </div>
  );
};

export default Magnify;
