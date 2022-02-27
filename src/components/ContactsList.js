import React from "react";
import Contact from "./Contact";

function ContactsList(props) {
  const { contacts, selectContact, selectedContacts, selectedAll } = props;

  return (
    <div>
      {contacts.map((contact) => (
            <Contact onClick={()=>selectContact(contact)} key={contact.id} contact={contact} selected={selectedContacts.filter(s=>s.id===contact.id).length>0 || selectedAll} />
      ))}
    </div>
  );
}

export default ContactsList;
