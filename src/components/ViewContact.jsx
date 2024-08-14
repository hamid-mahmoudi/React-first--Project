import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getGroup, getContact } from "../services/contactService";
import SkeletionLoading from "../components/SkeletionLoading";
import { GREEN, CURRENTLINE, COMMENT } from "../helpers/color";

const AddContact = ({ loading, onContactChange, groups, createContact }) => {
  const { contactId } = useParams();
  const [state, setState] = useState({
    loading: false,
    contact: {},
    group: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: contactData } = await getContact(contactId);
        const { data: groupData } = await getGroup(contactData.group);
        setState({
          ...state,
          loading: false,
          contact: contactData,
          group: groupData
        });
      } catch (err) {
        console.log(err.message);
        setState({ ...state, loading: false });
      }
    };
    fetchData();
  }, []);

  const { contact, group } = state;

  return (
    <>
      {loading ? (
        <SkeletionLoading />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row">
                <div className="col">
                  <p className="h4 fw-bold text-center my-5" style={{ color: GREEN }}>
                  {                    `View ${contact.fullname} Profile`}
                  </p>
                </div>
              </div>
              <div className="card d-flex flex-row align-items-center justify-content-evenly py-4" style={{ background: CURRENTLINE }}>
              <div className="col-md-3 ">
                  <img className="rounded-3"
                    src={contact.photo||"https://placehold.co/125"}
                    height="280px"
                    alt=""
                    style={{

                      position: "",
                      zIndex: "-1",
                      opacity: "80%",
                    }}
                  />
                </div>
                <form className="col-5 d-flex flex-column justify-content-between gap-2">
                  <div className="p-2 rounded list-group-item list-group-item-dark d-flex justify-content-between px-4 align-items-center">
                    <div>Name:</div>
                    <span className="fw-bold">{contact.fullname || "N/A"}</span>
                  </div>
                  <div className="p-2 rounded list-group-item list-group-item-dark d-flex justify-content-between px-4 align-items-center">
                    <div>Mobile number:</div>
                    <span className="fw-bold">{contact.number }</span>
                  </div>
                  <div className="p-2 rounded list-group-item list-group-item-dark d-flex justify-content-between px-4 align-items-center">
                    <div>Email address:</div>
                    <span className="fw-bold">{contact.email}</span>
                  </div>
                  <div className="p-2 rounded list-group-item list-group-item-dark d-flex justify-content-between px-4 align-items-center">
                    <div>Job:</div>
                    <span className="fw-bold">{contact.job}</span>
                  </div>
                  <div className="p-2 rounded list-group-item list-group-item-dark d-flex justify-content-between px-4 align-items-center">
                    <div>Group:</div>
                    <span className="fw-bold">{group.name}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <Link to={"/contacts"} className="btn" style={{ backgroundColor: COMMENT, width: "100%" }}>
                      Back To Menu
                    </Link>
                  </div>
                </form>

              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;