import { supabase } from "./supabaseClient";
import { Contact } from "../types/contactTypes";

export const addContact = async (contact: Contact): Promise<Contact | null> => {
  const { data, error } = await supabase.from("contacts").insert([contact]);

  if (error) {
    console.error("Error adding contact:", error);
    return null;
  }

  return data ? data[0] : null;
};
