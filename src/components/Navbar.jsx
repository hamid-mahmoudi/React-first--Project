import React from "react";
import SearchContact from "./SearchContact";
import { CURRENTLINE, PURPLE } from "../helpers/color";
import { useLocation } from "react-router-dom";
function Navbar({ query, search }) {
  const location = useLocation();
  return (
    <React.Fragment>
      <nav
        className="navbar navbar-dark shadow-lg"
        style={{ background: CURRENTLINE }}
      >
        <div className="container">
          <div className="row w-100 py-2">
            <div className="col">
              <div className="navbar-brand">
                <i class="fa fa-id-badge" style={{ color: PURPLE }}></i>{" "}
                <span style={{ color: PURPLE }}>Contact</span> Application
                Manager
              </div>
            </div>
            {location.pathname === "/contacts" ? (
              <div className="col">
                <SearchContact query={query} search={search} />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
      <div></div>
    </React.Fragment>
  );
}

export default Navbar;
