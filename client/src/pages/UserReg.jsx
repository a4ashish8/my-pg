import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { regUser } from "../services/opertions/user";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    emailId: "",
    password: "",
    userType: "",
    userid: "",
    userStatus: "",
    phoneNo: "",
    joiningDate: "",
    ammount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    try {
      await regUser(formData);
      setFormData({
        first_name: "",
        last_name: "",
        emailId: "",
        password: "",
        userType: "",
        userid: "",
        userStatus: "",
        phoneNo: "",
        ammount: "",
        joiningDate: "",
      });
    } catch (error) {
    //   console.error("Registration error:", error);
      toast.error("Registration failed, please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-5 border border-gray-200 rounded-md bg-white">
      <h2 className="text-2xl font-semibold mb-5">Register</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-12 gap-4">
        <div className="col-span-6 mb-4">
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="emailId" className="block text-sm font-medium text-gray-700">
            emailId
          </label>
          <input
            type="emailId"
            id="emailId"
            name="emailId"
            value={formData.emailId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="userid" className="block text-sm font-medium text-gray-700">
            User Id
          </label>
          <input
            type="text"
            id="userid"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
            Confirm password
          </label>
          <input
            type="password"
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="userStatus" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            id="userStatus"
            name="userStatus"
            value={formData.userStatus}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="phoneNo" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNo"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-6 mb-4">
          <label htmlFor="ammount" className="block text-sm font-medium text-gray-700">
            Rent Amount
          </label>
          <input
            type="text"
            id="ammount"
            name="ammount"
            value={formData.ammount}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        
        <div className="col-span-6 mb-4">
          <label htmlFor="joiningDate" className="block text-sm font-medium text-gray-700">
            Rent Amount
          </label>
          <input
            type="date"
            id="joiningDate"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="col-span-12">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
