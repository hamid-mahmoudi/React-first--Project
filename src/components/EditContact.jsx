import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { COMMENT, GREEN, PURPLE } from "../helpers/color";

import {
  getContact,
  getAllGroups,
  updateContact,
} from "../services/contactService";
import SkeletionLoading from "./SkeletionLoading";

const EditContact = ({ forceRender, setForceRender }) => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    loading: false,
    contact: {
      fullname: "",
      number: "",
      email: "",
      job: "",
      group: "",
      photo: "",
    },
    groups: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const { data: contactData } = await getContact(contactId);
        const { data: groupsData } = await getAllGroups();
        setState((prevState) => ({
          ...prevState,
          loading: false,
          contact: contactData,
          groups: groupsData,
        }));
      } catch (err) {
        console.log(err.message);
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    };
    fetchData();
  }, [contactId]);

  const setContactInfo = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      contact: {
        ...prevState.contact,
        [name]: value,
      },
    }));
  };

  const submitForm = async (event) => {
    event.preventDefault();
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const { data } = await updateContact(state.contact, contactId);
      setState((prevState) => ({ ...prevState, loading: false }));
      if (data) {
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log(err.message);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  const { contact, groups, loading } = state;
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
                  <p
                    className="h4 fw-bold text-center"
                    style={{ color: GREEN }}
                  >
{                    `Edit ${contact.fullname} Profile`
}                  </p>
                </div>
              </div>
              <div className="row mt-5 d-flex justify-content-center">
              <div className="col-md-4">
                  <img
                    src={ contact.photo||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBhcplevwUKGRs1P-Ps8Mwf2wOwnW_R_JIA&s"}
                    height="308px"
                    alt=""
                    style={{
                      position: "",
                      zIndex: "-1",
                      opacity: "50%",
                    }}
                  />
                </div>
                <form className="col-5" onSubmit={submitForm}>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="fullname"
                      value={contact.fullname}
                      onChange={setContactInfo}
                      className="form-control"
                      placeholder="Name:"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="photo"
                      value={contact.photo}
                      onChange={setContactInfo}
                      className="form-control"
                      placeholder="Photo src:"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="number"
                      value={contact.number}
                      onChange={setContactInfo}
                      className="form-control"
                      placeholder="Mobile number:"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="email"
                      value={contact.email}
                      onChange={setContactInfo}
                      className="form-control"
                      placeholder="Email address:"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      name="job"
                      value={contact.job}
                      onChange={setContactInfo}
                      className="form-control"
                      placeholder="Job:"
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      name="group"
                      value={contact.group}
                      onChange={setContactInfo}
                      className="form-control"
                      required={true}
                    >
                      <option value="">Select category</option>
                      {groups &&
                        groups.length > 0 &&
                        groups.map((group) => (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-between">
                    <input
                      type="submit"
                      className="btn"
                      style={{ backgroundColor: PURPLE, width: "73%" }}
                      value="Edit"
                    />
                    <Link
                      to={"/contacts"}
                      className="btn"
                      style={{ backgroundColor: COMMENT, width: "25%" }}
                    >
                      Cancel
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

export default EditContact;