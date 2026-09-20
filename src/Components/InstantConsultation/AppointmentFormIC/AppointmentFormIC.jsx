// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';

// Instant Consultation booking form.
// This variant deliberately collects only the patient name and phone number:
// an instant consultation happens right away, so no date or time is needed.
const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
  // State variables for the two form fields
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    onSubmit({ name, phoneNumber });

    // Clear the fields once the appointment has been registered
    setName('');
    setPhoneNumber('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      {/* Patient name */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Patient phone number */}
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentFormIC;
