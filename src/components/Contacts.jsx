import React from "react";
import Contact from "./Contact";
import { PINK } from "../helpers/color";
import Magnify from "./Magnify";
import { Link } from "react-router-dom";

const Contacts = ({ contacts, loading, confirmDelete }) => {
  return (
    <div>
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <Link to="add" className="btn my-3" style={{ background: PINK }}>
                Add Contact{"   "}
                <span className="fa fa-plus-circle"></span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card-body d-flex ">
          <div className="row d-flex flex-row justify-content-between col-12 "style={{padding:"0 4rem"}}>
            {loading ? (
              <Magnify />
            ) : contacts && contacts.length > 0 ? (
              contacts.map((contact) => (
                <Contact contact={contact} key={contact.id} confirmDelete={()=>confirmDelete(contact.id,contact.fullname)}/>
              ))
            ) : (
              <p className="text-center h2 text-light">Contact not found!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
