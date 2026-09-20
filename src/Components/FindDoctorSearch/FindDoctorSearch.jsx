// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './FindDoctorSearch.css';

// Specialities a patient can search for
const initSpeciality = [
  'Dentist',
  'Gynecologist/obstetrician',
  'General Physician',
  'Dermatologist',
  'Ear-nose-throat (ent) Specialist',
  'Homeopath',
  'Ayurveda',
];

const FindDoctorSearch = ({ onSearch }) => {
  // Controls the visibility of the speciality list
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  // Current value typed in the search field
  const [searchDoctor, setSearchDoctor] = useState('');
  // Full list of specialities, filtered as the user types
  const [specialities] = useState(initSpeciality);

  // Store the chosen speciality and hand it to the parent component
  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    if (onSearch) {
      onSearch(speciality);
    }
  };

  // Submitting the form searches on whatever has been typed
  const handleSubmit = (e) => {
    e.preventDefault();
    setDoctorResultHidden(true);

    if (onSearch) {
      onSearch(searchDoctor);
    }
  };

  // Specialities matching the current input
  const filteredSpecialities = specialities.filter((speciality) =>
    speciality.toLowerCase().includes(searchDoctor.toLowerCase())
  );

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and book an appointment</h1>
        <p className="finddoctor-subtitle">
          Search by speciality and pick the slot that suits you
        </p>

        <form className="home-search-container" onSubmit={handleSubmit}>
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              /* onFocus reveals the speciality list */
              onFocus={() => setDoctorResultHidden(false)}
              /* onBlur hides the list when the user clicks anywhere else.
                 The delay lets a click on a result register first. */
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            <div className="findiconimg">
              <svg className="findIcon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6.2" stroke="#3685fb" strokeWidth="2" />
                <path d="M13.6 13.6L18 18" stroke="#3685fb" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            {/* Speciality suggestions, toggled by onFocus / onBlur */}
            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {filteredSpecialities.length > 0 ? (
                filteredSpecialities.map((speciality) => (
                  <div
                    className="search-doctor-result-item"
                    key={speciality}
                    /* onMouseDown fires before onBlur, so the click is not lost */
                    onMouseDown={() => handleDoctorSelect(speciality)}
                  >
                    <span className="result-icon">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="#8a97a8" strokeWidth="1.6" />
                        <path d="M10.8 10.8L14 14" stroke="#8a97a8" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                    </span>
                    <span className="result-label">{speciality}</span>
                    <span className="speciality-tag">SPECIALITY</span>
                  </div>
                ))
              ) : (
                <div className="search-doctor-result-item no-result">
                  No speciality matches your search
                </div>
              )}
            </div>
          </div>

          <button type="submit" className="search-btn">Search</button>
        </form>
      </center>
    </div>
  );
};

export default FindDoctorSearch;
