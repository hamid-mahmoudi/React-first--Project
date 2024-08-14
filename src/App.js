import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import {
  createContact,
  getAllContacts,
  getAllGroups,
  deleteContact,
} from "./services/contactService";
import "./confirmAlert.css";
import Navbar from "./components/Navbar";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";
import EditContact from "./components/EditContact";
import ViewContact from "./components/ViewContact";

const App = () => {
  const [getFilteredContacts, setFilteredContacts] = useState([]);
  const [query, setQuery] = useState({ text: "" });
  const [getContacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [forceRender, setForceRender] = useState(false);
  const [getGroups, setGroups] = useState([]);
  const [getContact, setContact] = useState({
    fullname: "",
    number: "",
    email: "",
    job: "",
    group: "",
    photo: "",
  });

  const navigate = useNavigate();

  const contactSearch = (event) => {
    setQuery({ ...query, text: event.target.value });
    const allContacts = getContacts.filter((contact) => {
      return contact.fullname
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilteredContacts(allContacts);
  };

  const setContactInfo = (event) => {
    setContact({
      ...getContact,
      [event.target.name.toLowerCase()]: event.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        const { data: groupsData } = await getAllGroups();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactsData } = await getAllContacts();
        setContacts(contactsData);
        setFilteredContacts(contactsData);
        setLoading(false);
      } catch (err) {
        console.log("Error fetching contacts:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, [forceRender]);

  const createContactForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createContact(getContact);
      if (status === 201) {
        setContact({});
        setForceRender(!forceRender);
        navigate("/contacts");
      }
    } catch (err) {
      console.log("Error creating contact:", err);
    }
  };

  const confirm = (contactId, contactFullname) => {
    confirmAlert({
      title: `Delete ${contactFullname}?`,
      message: `Are you sure you want to delete ${contactFullname}?`,
      buttons: [
        {
          label: "Yes, Delete",
          onClick: () => removeContact(contactId),
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypressEscape: () => {},
    });
  };

  const removeContact = async (contactId) => {
    try {
      setLoading(true);
      await deleteContact(contactId);
      const { data: contactsData } = await getAllContacts();
      setContacts(contactsData);
    } catch (err) {
      console.error("Error deleting contact:", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Navbar query={query} search={contactSearch} />
      <Routes>
        <Route path="/" element={<Navigate to="/contacts" />} />
        <Route
          path="/contacts"
          element={
            <Contacts
              contacts={getFilteredContacts}
              loading={loading}
              confirmDelete={confirm}
            />
          }
        />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
        <Route
          path="/contacts/add"
          element={
            <AddContact
              groups={getGroups}
              loading={loading}
              setContactInfo={setContactInfo}
              contact={getContact}
              createContactForm={createContactForm}
            />
          }
        />
        <Route
          path="/contacts/edit/:contactId"
          element={
            <EditContact
              setForceRender={setForceRender}
              forceRender={forceRender}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
