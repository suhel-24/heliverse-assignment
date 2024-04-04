import React, { useState } from 'react';
import axios from 'axios';

const AddUser = () => {
  // State variables to store form data and ID
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    gender: '',
    domain: '',
    available: false,
    avatar:'https://robohash.org/sintessequaerat.png?size=50x50&set=set1'
  });
  const [id, setId] = useState(130); // Starting ID

  // Handler function to update form data when input values change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler function to submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Add ID to form data
      const dataWithId = { ...formData, id };

      // Make POST request to backend API using Axios
      const response = await axios.post('http://localhost:3000/api/users/', dataWithId);

      // Handle successful response
      console.log('Form submitted successfully', response.data);

      // Increment ID for the next submission
      setId(id + 1);
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form className="max-w-sm mx-auto mt-5" onSubmit={handleSubmit}>
        {/* Email field */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>
        
        {/* First name field */}
        <div className="mb-5">
          <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your first name</label>
          <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        {/* Last name field */}
        <div className="mb-5">
          <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your last name</label>
          <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        {/* Gender field */}
        <div className="mb-5">
          <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your gender</label>
          <input type="text" id="gender" name="gender" value={formData.gender} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        {/* Domain field */}
        <div className="mb-5">
          <label htmlFor="domain" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your domain</label>
          <input type="text" id="domain" name="domain" value={formData.domain} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
        </div>

        <div className="mb-5">
          <label htmlFor="available" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your availability</label>
          <select id="available" name="available" value={formData.available} onChange={handleChange} className="...">
            <option value={true}>True</option>
            <option value={false}>False</option>
          </select>
        </div>

        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
