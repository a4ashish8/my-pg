import React from "react";
import { getAllUsers } from "../services/opertions/user"
const UserList = () => {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Doe", email: "jane@example.com", role: "Editor" },
    { id: 3, name: "Sam Smith", email: "sam@example.com", role: "Viewer" },
  ];

  const fetchUsers = async () => {

    try {
      const res = await getAllUsers()
      console.log(res)
    } catch (error) {
      console.log("Could not fetch user details", error)
    }
  }

  fetchUsers()
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.id}>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{person.name}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{person.email}</td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
