import React, { useState } from 'react';

const UserDetails = ({ data }) => {
  console.log("User Data:", data);

  // Keep data as an object, not an array
  const [userData, setUserData] = useState(data);

  return (
    <div className="overflow-y-auto max-h-96 w-full pb-4">
      <table className="border-4 border-gray-300 mt-8 w-full">
        <thead>
          <tr>
            <th className="px-5">number</th>
            <th className="px-5">name</th>
            <th className="px-18">address</th>
          </tr>
        </thead>

        <tbody>
          <tr className="items-center justify-center border border-gray-300">
            <td className="text-center">{userData.number}</td>
            <td className="text-center">{userData.name}</td>
            <td className="flex flex-col justify-center text-center items-center">
              {userData.address && userData.address.map((address, idx) => (
                <div key={idx} className="flex space-x-2">
                  <span>{address.street}</span>
                  <span>{address.city}</span>
                  <span>{address.state}</span>
                </div>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserDetails;
