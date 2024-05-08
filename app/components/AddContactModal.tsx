// components/AddContactModal.tsx
import { useState, FC, ChangeEvent, useEffect } from "react";
import { Button } from "../ui/Button";
import { Contact } from "../types/contactTypes";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AddContactModalProps {
  onSave: (contact: Contact) => void;
  onClose: () => void;
  isOpen: boolean;
}

const AddContactModal: FC<AddContactModalProps> = ({
  onSave,
  onClose,
  isOpen,
}) => {
  const [name, setName] = useState<string>("");
  const [last_contact_date, setLastContactDate] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!name || !last_contact_date || !imageFile) {
      alert("All fields are required!");
      return;
    }

    try {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `contacts-image/${fileName}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("contacts-image")
        .upload(filePath, imageFile);

      if (uploadError) throw new Error(uploadError.message);

      const imageUrl = `${supabaseUrl}/storage/v1/object/public/contacts-image/${uploadData.path}`;

      const newContact = {
        name,
        last_contact_date,
        image: imageUrl,
      };

      onSave(newContact);
      onClose();
    } catch (error: any) {
      console.error("Error in adding contact:", error);
      alert(error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Create a New Contact</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Name
            </label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Contact Date
            </label>
            <input
              type="date"
              value={last_contact_date}
              onChange={(e) => setLastContactDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save Contact
          </Button>
          <Button
            onClick={onClose}
            className="ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;
