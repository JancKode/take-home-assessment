import { FC, useEffect, useState } from "react";
import { Contact } from "../types/contactTypes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Spinner } from "../ui/Spinner";

interface ContactListProps {
  contacts: Contact[];
  onContactSelect: (contact: Contact) => void; // Function to handle contact click
  isLoading: boolean;
}

const ContactList: FC<ContactListProps> = ({
  contacts,
  onContactSelect,
  isLoading,
}: ContactListProps) => {
  if (isLoading) <Spinner />;
  return (
    <ul className="pt-4 w-[50%]">
      {contacts.map((contact, index) => (
        <li
          key={index}
          className="flex justify-between items-center p-2 mt-2 cursor-pointer border rounded-md"
          onClick={() => onContactSelect(contact)}
        >
          <div className="flex items-center">
            <img
              src={contact.image_url}
              className="w-10 h-10 rounded-full mr-2"
            />
            <span>{contact.name}</span>
          </div>
          <span>{contact.last_contact_date}</span>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
