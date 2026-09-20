// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';
import './BookingConsultation.css';

// Doctors available on the platform.
// In the full capstone this list comes from the backend API.
const DOCTORS = [
  { name: 'Dr. Jiao Yang', speciality: 'Dentist', experience: 9, ratings: '★★★★★' },
  { name: 'Dr. Denis Raj', speciality: 'Dentist', experience: 12, ratings: '★★★★☆' },
  { name: 'Dr. Aya Mensah', speciality: 'General Physician', experience: 15, ratings: '★★★★★' },
  { name: 'Dr. John Doe', speciality: 'General Physician', experience: 7, ratings: '★★★★☆' },
  { name: 'Dr. Jane Smith', speciality: 'Dermatologist', experience: 11, ratings: '★★★★★' },
  { name: 'Dr. Kwame Diallo', speciality: 'Gynecologist/obstetrician', experience: 8, ratings: '★★★★☆' },
  { name: 'Dr. Sarah Kone', speciality: 'Ear-nose-throat (ent) Specialist', experience: 10, ratings: '★★★★★' },
  { name: 'Dr. Ravi Kumar', speciality: 'Homeopath', experience: 6, ratings: '★★★★☆' },
  { name: 'Dr. Priya Nair', speciality: 'Ayurveda', experience: 14, ratings: '★★★★★' },
];

const BookingConsultation = () => {
  // Doctors matching the current search
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  // True once a search has been run, so we know whether to show results
  const [isSearched, setIsSearched] = useState(false);
  // Speciality the user searched for, shown above the results
  const [searchedSpeciality, setSearchedSpeciality] = useState('');

  // Filter the doctors on the speciality coming from the search bar
  const handleSearch = (speciality) => {
    setSearchedSpeciality(speciality);

    if (!speciality || !speciality.trim()) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const matches = DOCTORS.filter((doctor) =>
      doctor.speciality.toLowerCase().includes(speciality.toLowerCase())
    );

    setFilteredDoctors(matches);
    setIsSearched(true);
  };

  return (
    <div className="booking-consultation">
      {/* Search bar */}
      <FindDoctorSearch onSearch={handleSearch} />

      {/* Results */}
      <div className="search-results-container">
        {isSearched ? (
          <>
            <h2 className="results-title">
              {filteredDoctors.length} doctors available
              {searchedSpeciality ? ` in ${searchedSpeciality}` : ''}
            </h2>
            <p className="results-subtitle">
              Book appointments with minimum wait-time and verified doctor details
            </p>

            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <DoctorCard {...doctor} key={doctor.name} />
              ))
            ) : (
              <p className="no-results">
                No doctor found for this speciality. Try another search.
              </p>
            )}
          </>
        ) : (
          <p className="results-hint">
            Search for a speciality above to see the doctors available.
          </p>
        )}
      </div>
    </div>
  );
};

export default BookingConsultation;
