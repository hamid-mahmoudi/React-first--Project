import React from "react";
import { YELLOW, CYAN, RED, CURRENTLINE } from "../helpers/color";
import { Link } from "react-router-dom";

const Contact = ({ contact,confirmDelete }) => {
  return (
    <div className="col-md-6 p-4" >
      <div className=" card d-flex flex-row align-items-center justify-content-evenly py-4 "style={{ background: CURRENTLINE }}>
        <div className="col-md-3 rounded d-flex align-items-center justify-content-center">
          <div style={{ height: "125px", width: "125px" }}>
            <img
              style={{ width: "100%",objectFit:"cover" }}
              className=" rounded"
              src={contact.photo || "https://placehold.co/125"}
              alt=""
            />
          </div>
        </div>
        <div className="col-md-7">
          <div className="list-group ">
            <div className="list-group-item list-group-item-dark d-flex  justify-content-between align-items-center">
              <div>Name:</div>
              <span className="fw-bold"> {contact.fullname} </span>
            </div>
            <div className="list-group-item list-group-item-dark d-flex  justify-content-between align-items-center">
              <div>Number:</div>
              <span className="fw-bold"> {contact.number} </span>
            </div>
            <div className="list-group-item list-group-item-dark d-flex  justify-content-between align-items-center">
              <div>Email:</div>
              <span className="fw-bold"> {contact.email} </span>
            </div>
          </div>
        </div>
        <div className="col-md-1 d-flex flex-column justify-content-center align-items-between links ">
          <Link to={contact.id}
            style={{ width: "35px", height: "35px", background: YELLOW }}
            className="d-flex align-items-center justify-content-center btn m-1 fa fa-eye"
          ></Link>
          <Link to={`edit/${contact.id}`}
            style={{ width: "35px", height: "35px", background: CYAN }}
            className="d-flex align-items-center justify-content-center btn m-1 fa fa-pencil"
          ></Link>
          <button onClick={confirmDelete}
            style={{ width: "35px", height: "35px", background: RED }}
            className="d-flex align-items-center justify-content-center btn m-1 fa fa-trash"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
