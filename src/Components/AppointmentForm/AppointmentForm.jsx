// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './AppointmentForm.css';

// Time slots a patient can pick for an upcoming appointment
const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
];

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  // State variables for every field of the form
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [errors, setErrors] = useState({});

  // Today's date, used to forbid booking in the past
  const today = new Date().toISOString().split('T')[0];

  // Validation logic run before the appointment is registered
  const validate = () => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Name is required';
    }

    // StayHealthy requirement: the phone number must be exactly 10 digits
    if (!phoneNumber.trim()) {
      nextErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      nextErrors.phoneNumber = 'Phone number must be exactly 10 digits';
    }

    if (!appointmentDate) {
      nextErrors.appointmentDate = 'Please choose a date';
    } else if (appointmentDate < today) {
      nextErrors.appointmentDate = 'The date cannot be in the past';
    }

    if (!selectedSlot) {
      nextErrors.selectedSlot = 'Please choose a time slot';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Handle the form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({ name, phoneNumber, appointmentDate, selectedSlot });

    // Clear the fields once the appointment has been registered
    setName('');
    setPhoneNumber('');
    setAppointmentDate('');
    setSelectedSlot('');
    setErrors({});
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form" noValidate>
      {/* Patient name */}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        {errors.name && <div className="err">{errors.name}</div>}
      </div>

      {/* Patient phone number */}
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          type="tel"
          id="phoneNumber"
          maxLength="10"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter your phone number"
        />
        {errors.phoneNumber && <div className="err">{errors.phoneNumber}</div>}
      </div>

      {/* Date of the appointment: allows booking for upcoming days */}
      <div className="form-group">
        <label htmlFor="appointmentDate">Date of Appointment:</label>
        <input
          type="date"
          id="appointmentDate"
          min={today}
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
        />
        {errors.appointmentDate && <div className="err">{errors.appointmentDate}</div>}
      </div>

      {/* Time slot of the appointment */}
      <div className="form-group">
        <label htmlFor="selectedSlot">Book Time Slot:</label>
        <select
          id="selectedSlot"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot) => (
            <option key={slot} value={slot}>{slot}</option>
          ))}
        </select>
        {errors.selectedSlot && <div className="err">{errors.selectedSlot}</div>}
      </div>

      <button type="submit" className="book-now-btn">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
