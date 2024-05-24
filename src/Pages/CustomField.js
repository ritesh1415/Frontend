import React, { useState } from 'react';
import axios from 'axios';

const CustomFieldForm = () => {
  const [customFields, setCustomFields] = useState([{ id: 1, name: '', description: '', selectedOption: '' }]);
  const [isAvailable, setIsAvailable] = useState(false);

  const addCustomField = () => {
    const newCustomFields = [...customFields, { id: customFields.length + 1, name: '', description: '', selectedOption: '' }];
    setCustomFields(newCustomFields);
  };

  const removeCustomField = (id) => {
    if (customFields.length > 1) {
      const updatedCustomFields = customFields.filter(field => field.id !== id);
      setCustomFields(updatedCustomFields);
    }
  };

  const handleChange = (id, field, value) => {
    const updatedCustomFields = customFields.map(cf => {
      if (cf.id === id) {
        return { ...cf, [field]: value };
      }
      return cf;
    });
    setCustomFields(updatedCustomFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/add', { customFields });
      console.log(response.data);
      alert('Custom field set created successfully');
    } catch (error) {
      console.error(error);
      alert('Error creating custom field set');
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
    checkAvailability(option);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Custom Field Set Form</h1>
      <form onSubmit={handleSubmit}>
        {customFields.map(field => (
          <div key={field.id} className="mb-3">
            <label htmlFor={`name_${field.id}`} className="form-label">Name:</label>
            <input 
              type="text" 
              id={`name_${field.id}`} 
              className="form-control" 
              value={field.name} 
              onChange={(e) => handleChange(field.id, 'name', e.target.value)} 
            />
            <label htmlFor={`description_${field.id}`} className="form-label mt-2">Description:</label>
            <textarea 
              id={`description_${field.id}`} 
              className="form-control" 
              value={field.description} 
              onChange={(e) => handleChange(field.id, 'description', e.target.value)} 
            />
            <label htmlFor={`select_${field.id}`} className="form-label mt-2">Select:</label>
            <select 
              id={`select_${field.id}`} 
              className="form-select" 
              value={field.selectedOption} 
              onChange={(e) => handleChange(field.id, 'selectedOption', e.target.value)} 
            >
              <option value="">--Please choose an option--</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </select>
            {customFields.length > 1 && (
              <button type="button" className="btn btn-danger mt-2" onClick={() => removeCustomField(field.id)}>Remove</button>
            )}
          </div>
        ))}
        <button type="button" className="btn btn-primary" onClick={addCustomField}>Add Custom Field</button>
        <button type="submit" className="btn btn-success ms-2">Create Set</button>
      </form>
    </div>
  );
}

export default CustomFieldForm;
