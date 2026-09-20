// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FindDoctorSearchIC.css';

// List of specialities offered by StayHealthy
const initSpeciality = [
  'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist',
  'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda',
];

const FindDoctorSearchIC = ({ onSearch }) => {
  // Controls the visibility of the speciality list
  const [doctorResultHidden, setDoctorResultHidden] = useState(true);
  // Current value typed in the search field
  const [searchDoctor, setSearchDoctor] = useState('');
  // Specialities matching what the user typed
  const [specialities] = useState(initSpeciality);

  const navigate = useNavigate();

  // Store the chosen speciality and notify the parent component
  const handleDoctorSelect = (speciality) => {
    setSearchDoctor(speciality);
    setDoctorResultHidden(true);

    if (onSearch) {
      onSearch(speciality);
    }

    navigate(`/instant-consultation?speciality=${speciality}`);
  };

  return (
    <div className="finddoctor">
      <center>
        <h1>Find a doctor and Consult instantly</h1>
        <div>
          <i style={{ color: '#000000', fontSize: '20rem' }} className="fa fa-user-md"></i>
        </div>

        <div className="home-search-container" style={{ display: 'flex' }}>
          <div className="doctor-search-box">
            <input
              type="text"
              className="search-doctor-input-box"
              placeholder="Search doctors, clinics, hospitals, etc."
              /* onFocus reveals the speciality list */
              onFocus={() => setDoctorResultHidden(false)}
              /* onBlur hides it when the user clicks anywhere else */
              onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
              value={searchDoctor}
              onChange={(e) => setSearchDoctor(e.target.value)}
            />

            <div className="findiconimg">
              <img
                className="findIcon"
                src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                alt="Search"
                width="20"
              />
            </div>

            <div className="search-doctor-input-results" hidden={doctorResultHidden}>
              {specialities
                .filter((speciality) =>
                  speciality.toLowerCase().includes(searchDoctor.toLowerCase())
                )
                .map((speciality) => (
                  <div
                    className="search-doctor-result-item"
                    key={speciality}
                    onMouseDown={() => handleDoctorSelect(speciality)}
                  >
                    <span>
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
                        alt=""
                        width="12"
                        style={{ height: '10px', width: '10px' }}
                      />
                    </span>
                    <span>{speciality}</span>
                    <span className="speciality-tag">SPECIALITY</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </center>
    </div>
  );
};

export default FindDoctorSearchIC;
