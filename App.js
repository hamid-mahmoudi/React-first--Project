import { useState, useEffect } from "react"
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"

import Navbar from "./components/Navbar"
import Contacts from "./components/Contacts"
import ViewContact from "./components/ViewContact"
import AddContact from "./components/AddContact"
import EditContact from "./components/EditContact"

import { getAllContacts, getAllGroups, createContact } from "./services/contactService"

const App = () => {
  const [getContacts, setContacts]= useState([])
  const [loading, setLoading]=useState(false)
  const [forceRender, setForceRender] = useState(false)
  const [getGroups, setGroups]= useState([])
  const [getContact, setContact] = useState({
    fullname: "",
    mobile: "",
    email: "",
    job: "",
    group:"",
    photo: ""
  })
  const navigate= useNavigate()

  useEffect(()=>{ 
    // دریافت دیتا از سرور
    // تغییر دام
    // خواندن اطلاعات از لوکال استوریج
    const fetchData= async()=>{
      try{
        setLoading(true)
        const {data:contactsData} = await getAllContacts()
        const {data:groupsData} = await getAllGroups()
        setContacts(contactsData)
        setGroups(groupsData)
        setLoading(false)
      }catch(err){
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData()
  },[])

  useEffect(()=>{ 
    const fetchData= async()=>{
      try{
        setLoading(true)
        const {data:contactsData} = await getAllContacts()
        setContacts(contactsData)
        setLoading(false)
      }catch(err){
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData()
  },[forceRender])

  const createContactForm = async(event)=>{
    event.preventDefault()
    try{
      const {status} = await createContact(getContact)
      if(status === 201){
        setContact({})
        setForceRender(!forceRender)
        navigate("/contacts")
      }
    }catch(err){
      console.log(err)
    }
  }

  const setContactInfo= (event)=>{
    setContact({
      ...getContact,
      [event.target.name] : event.target.value,
    })
  }

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to='/contacts' />} />
        <Route path="/contacts" element={<Contacts contacts={getContacts} loading={loading}  />} />
        <Route path="/contacts/add" element={<AddContact groups={getGroups}  setContactInfo={setContactInfo} contact={getContact} createContactForm={createContactForm}/>} />
        <Route path="/contacts/edit/:contactId" element={<EditContact />} />
        <Route path="/contacts/:contactId" element={<ViewContact />} />
      </Routes>
    </div>
  )
}

export default App