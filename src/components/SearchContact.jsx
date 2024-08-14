import React from "react";
import { COMMENT, PURPLE } from "../helpers/color";
import "../index.css";
function SearchContact({query,search}) {
  return (
    <div
      className="input-group d-flex  justify-content-end align-items-center"
      style={{ width: "100%", height: "100%" }}
    >
      <input
        type="text"
        className="w-50 rounded-start navInput"
        placeholder="Search Indeed"
        value={query.text}
        onChange={search}
        style={{
          height: "100%",
          background: COMMENT,
          outline: "none",
          border: "none",
          paddingLeft: "1rem",
        }}
      />

      <span
        className="input-group-text "
        style={{ height: "100%", background: PURPLE, border: "none" }}
      >
        <i className="fa fa-search"></i>
      </span>
    </div>
  );
}

export default SearchContact;
