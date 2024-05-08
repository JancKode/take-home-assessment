"use client";
import { useState, FC, ReactNode, useEffect } from "react";
import { Button } from "../ui/Button";
import ContactList from "../components/ContactList";
import AddContactModal from "../components/AddContactModal";
import { Contact } from "../types/contactTypes";
import ViewContactModal from "../components/ViewContactModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Layout({ children }: any) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from("contacts").select("*");
      if (error) throw new Error(error.message);
      setContacts(data);
    } catch (error: any) {
      setError("Failed to fetch contacts: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddContact = async (newContact: Contact) => {
    setShowAddModal(false);
    const { last_contact_date, name, image } = newContact;

    try {
      const { error } = await supabase
        .from("contacts")
        .insert([{ name, last_contact_date, image_url: image }]);

      if (error) throw new Error(error.message);

      alert("Contact added successfully!");
      fetchContacts(); // Re-fetch contacts to update the list
    } catch (error: any) {
      console.error("Failed to add contact:", error);
      alert(error.message);
    }
  };

  const handleUpdateContact = async (updatedContact: Contact) => {
    if (!updatedContact.id) {
      alert("Cannot update contact without an ID");
      return;
    }
    const { last_contact_date, name, image } = updatedContact;

    try {
      const { error } = await supabase
        .from("contacts")
        .update({
          name: name,
          last_contact_date,
          image_url: image,
        })
        .match({ id: updatedContact.id });

      if (error) throw error;

      alert("Contact updated successfully!");
      fetchContacts();
    } catch (error: any) {
      console.error("Failed to update contact:", error);
      alert(error.message);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <h1>Contacts</h1>
        <Button className="self-end" onClick={() => setShowAddModal(true)}>
          + Add Contact
        </Button>
      </div>
      <ContactList
        contacts={contacts}
        onContactSelect={handleContactSelect}
        isLoading={isLoading}
      />
      {showAddModal && (
        <AddContactModal
          onSave={handleAddContact}
          onClose={() => setShowAddModal(false)}
          isOpen={showAddModal}
        />
      )}
      {selectedContact && (
        <ViewContactModal
          contact={selectedContact}
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          onSave={handleUpdateContact}
        />
      )}
      {children}
    </div>
  );
}
