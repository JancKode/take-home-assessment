import { FC, useEffect, useState } from "react";
import { Contact } from "../types/contactTypes";
import { Button } from "../ui/Button";

interface ViewContactModalProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedContact: Contact) => void;
}

const ViewContactModal: FC<ViewContactModalProps> = ({
  contact,
  isOpen,
  onClose,
  onSave,
}) => {
  const [editedContact, setEditedContact] = useState(contact);

  useEffect(() => {
    setEditedContact(contact);
  }, [contact, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setEditedContact((prev) => ({
            ...prev,
            image: reader.result as string,
          }));
        };

        reader.readAsDataURL(file);
      }
    } else {
      setEditedContact((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    onSave({
      ...editedContact,
      name: editedContact.name,
      last_contact_date: editedContact.last_contact_date,
      image: editedContact.image,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Edit Contact Information</h2>
        <div className="space-y-4">
          <div className="flex flex-col justify-center">
            <img
              src={editedContact.image_url}
              alt={editedContact.name}
              className="w-20 h-20 rounded-full mx-auto"
            />
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="mt-1 block self-center pt-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={editedContact.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Contact Date:
            </label>
            <input
              type="date"
              name="last_contact_date"
              value={editedContact.last_contact_date.split("T")[0]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </Button>
          <Button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewContactModal;
