import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/opertions/user";
const UserList = () => {
  const [data, setData] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.length > 0) {
        // Directly map over res since it appears to be an array
        const formattedUsers = res.map((user) => ({
          id: user._id,
          name: `${user.userDetails.first_name} ${user.userDetails.last_name}`,
          email: user.userDetails.emailId,
          role: user.userType,
          ammount: user.userDetails.ammount,
        }));
        setData(formattedUsers);
      }
    } catch (error) {
      console.log("Could not fetch user details", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
            <th className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Rent Ammount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((person) => (
            <tr key={person.id}>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                {person.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                {person.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                {person.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                {person.ammount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
