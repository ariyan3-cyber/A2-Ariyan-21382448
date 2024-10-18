import React from 'react';

function Contact({ contact, onClick }) {
    return (
        <div className="contact" onClick={() => onClick(contact)}>
            <div className="title">
                <h3>{contact.name}</h3>
            </div>
            <p>{contact.address}</p>
            <button className="button red" onClick={(e) => { e.stopPropagation(); contact.doDelete(contact.id); }}>
                Delete Contact
            </button>
        </div>
    );
}

export default Contact;
