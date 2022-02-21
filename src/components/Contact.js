import React from "react";

function Contact(props) {
  const { id, first_name, last_name, email, mobile } = props.contact;
  return (
    <div className="contact">
      <h2 className="contact-name">
        {first_name} {last_name}
      </h2>
      <h3 className="contact-email">{email}</h3>
      <h3 className="contact-mobile">{mobile}</h3>
      <button className={props.selected ? "contact-button contact-selected " : "contact-button contact-unselected"} onClick={props.onClick}>
        {props.selected ? "Deselect" : "Select"}
      </button>
    </div>
  );
}

export default Contact;
