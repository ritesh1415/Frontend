import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      name,
      description,
      textfield: selectedOption
    };

    try {
      const response = await axios.post('http://localhost:8080/add', userData);
      console.log(response.data);
      alert('New custom field added successfully');
    } catch (error) {
      console.error(error);
      alert('Error adding custom field');
    }
  };

  const checkAvailability = async (option) => {
    try {
      const response = await axios.post('http://localhost:8080/check', { textfield: option });
      setIsAvailable(response.data.success);
    } catch (error) {
      console.error(error);
      alert('Error checking availability');
    }
  };

  const handleOptionChange = (e) => {
    const option = e.target.value;
    setSelectedOption(option);
    if (option) {
      checkAvailability(option);
    } else {
      setIsAvailable(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Form Page</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input 
            type="text" 
            id="name" 
            className="form-control" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea 
            id="description" 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="selectField" className="form-label">Select Field:</label>
          <select 
            id="selectField" 
            className="form-select" 
            value={selectedOption} 
            onChange={handleOptionChange}
          >
            <option value="">Please choose an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </div>
        {selectedOption && (
          <div className="mb-3">
            <p>Availability: {isAvailable === null ? 'Checking...' : isAvailable ? <span className="text-success">Yes</span> : <span className="text-danger">No</span>}</p>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default Home;
