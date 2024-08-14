import { Link } from "react-router-dom";
import SkeletionLoading from "../components/SkeletionLoading";
import { COMMENT, GREEN, PURPLE } from "../helpers/color";

const AddContact = ({ loading, contact, setContactInfo, groups, createContactForm }) => {
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
                  <p className="h4 fw-bold text-center" style={{ color: GREEN }}>
                    Create New Contact
                  </p>
                </div>
              </div>
              <div className="row mt-5 d-flex justify-content-center">
                <form className="col-5" onSubmit={createContactForm}>
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
                      value="Create"
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
                <div className="col-md-4">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgBhcplevwUKGRs1P-Ps8Mwf2wOwnW_R_JIA&s"
                    height="308px"
                    alt=""
                    style={{
                      position: "",
                      zIndex: "-1",
                      opacity: "50%",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default AddContact;