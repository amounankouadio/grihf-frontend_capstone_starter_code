// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import './DoctorCard.css';

const DoctorCard = ({ name, speciality, experience, ratings, profilePic }) => {
  // Controls the visibility of the appointment form popup
  const [showModal, setShowModal] = useState(false);
  // Appointments already booked with this doctor
  const [appointments, setAppointments] = useState([]);

  // Cancel an appointment: remove it from the list by its id
  const handleCancel = (appointmentId) => {
    const updated = appointments.filter(
      (appointment) => appointment.id !== appointmentId
    );
    setAppointments(updated);
  };

  // Register a new appointment coming from the form
  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: `${Date.now()}`,
      ...appointmentData,
    };

    setAppointments([...appointments, newAppointment]);
    // The popup stays open so the patient sees the confirmation
    // and can cancel the appointment straight away.
  };

  return (
    <div className="doctor-card-container">
      {/* Doctor avatar */}
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-profile-pic" />
          ) : (
            <svg width="70" height="70" viewBox="0 0 70 70" fill="none" aria-hidden="true">
              <circle cx="35" cy="35" r="35" fill="#e3ecfb" />
              <circle cx="35" cy="28" r="12" fill="#3685fb" />
              <path d="M12 70c0-13 10-21 23-21s23 8 23 21H12z" fill="#3685fb" />
            </svg>
          )}
        </div>

        {/* Doctor details */}
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>

        {/* Book an appointment for this doctor */}
        <div>
          <button className="book-appointment-btn" onClick={() => setShowModal(true)}>
            {appointments.length > 0 ? (
              <div>View / Cancel Appointment</div>
            ) : (
              <div>Book Appointment</div>
            )}
            <div>No Booking Fee</div>
          </button>
        </div>
      </div>

      {/* Popup holding the appointment form or the booked appointments */}
      <div className="doctor-card-options-container">
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                &times;
              </button>

              <div className="doctor-card-profile-image-container">
                <svg width="60" height="60" viewBox="0 0 70 70" fill="none" aria-hidden="true">
                  <circle cx="35" cy="35" r="35" fill="#e3ecfb" />
                  <circle cx="35" cy="28" r="12" fill="#3685fb" />
                  <path d="M12 70c0-13 10-21 23-21s23 8 23 21H12z" fill="#3685fb" />
                </svg>
              </div>

              <div className="doctor-card-details">
                <div className="doctor-card-detail-name">{name}</div>
                <div className="doctor-card-detail-speciality">{speciality}</div>
                <div className="doctor-card-detail-experience">
                  {experience} years experience
                </div>
                <div className="doctor-card-detail-consultationfees">
                  Ratings: {ratings}
                </div>
              </div>

              {appointments.length > 0 ? (
                // An appointment exists: show it with the option to cancel
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date of Appointment: {appointment.appointmentDate}</p>
                      <p>Time Slot: {appointment.selectedSlot}</p>
                      <button
                        className="cancel-appointment-btn"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel Appointment
                      </button>
                    </div>
                  ))}
                </>
              ) : (
                // No appointment yet: show the booking form
                <AppointmentForm
                  doctorName={name}
                  doctorSpeciality={speciality}
                  onSubmit={handleFormSubmit}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorCard;
