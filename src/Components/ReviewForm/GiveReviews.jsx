// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './GiveReviews.css';

// Doctors the patient has consulted, and therefore can review.
// In the full capstone this list comes from the appointment history.
const CONSULTED_DOCTORS = [
  { id: 1, doctorName: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, doctorName: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { id: 3, doctorName: 'Dr. Aya Mensah', speciality: 'General Physician' },
];

const GiveReviews = () => {
  // Reviews already submitted, keyed by doctor id
  const [reviews, setReviews] = useState({});
  // Doctor currently being reviewed, null when the form is closed
  const [activeDoctor, setActiveDoctor] = useState(null);

  // Form fields
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');
  const [errors, setErrors] = useState({});

  // Open the review form for one doctor
  const handleOpenForm = (doctor) => {
    setActiveDoctor(doctor);
    setName('');
    setReview('');
    setRating('');
    setErrors({});
  };

  // Validation run before the review is stored
  const validate = () => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = 'Name is required';
    }
    if (!review.trim()) {
      nextErrors.review = 'Review is required';
    }
    if (!rating) {
      nextErrors.rating = 'Please select a rating';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // Store the review and close the form
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setReviews({
      ...reviews,
      [activeDoctor.id]: {
        name: name.trim(),
        review: review.trim(),
        rating: Number(rating),
      },
    });

    setActiveDoctor(null);
  };

  // A doctor already reviewed cannot be reviewed twice
  const hasReview = (doctorId) => Boolean(reviews[doctorId]);

  return (
    <div className="reviews-container">
      <h1 className="reviews-heading">Reviews</h1>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Review</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {CONSULTED_DOCTORS.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{doctor.doctorName}</td>
              <td>{doctor.speciality}</td>
              <td>
                {/* The button is disabled once a review has been given */}
                <button
                  className="give-review-btn"
                  onClick={() => handleOpenForm(doctor)}
                  disabled={hasReview(doctor.id)}
                >
                  {hasReview(doctor.id) ? 'Review Submitted' : 'Click Here'}
                </button>
              </td>
              <td>
                {hasReview(doctor.id) ? (
                  <div className="given-review">
                    <span className="given-stars">
                      {'★'.repeat(reviews[doctor.id].rating)}
                      <span className="muted">
                        {'★'.repeat(5 - reviews[doctor.id].rating)}
                      </span>
                    </span>
                    <p>{reviews[doctor.id].review}</p>
                    <small>by {reviews[doctor.id].name}</small>
                  </div>
                ) : (
                  <span className="muted">No review yet</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review form, shown in a popup for the selected doctor */}
      {activeDoctor && (
        <div className="review-overlay" onClick={() => setActiveDoctor(null)}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            <button className="review-close" onClick={() => setActiveDoctor(null)}>
              &times;
            </button>

            <h2>Give Your Review</h2>
            <p className="review-doctor">
              {activeDoctor.doctorName} &middot; {activeDoctor.speciality}
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {/* Name of the patient writing the review */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>

              {/* Rating selector, from 1 to 5 */}
              <div className="form-group">
                <label htmlFor="rating">Rating</label>
                <select
                  id="rating"
                  name="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select a rating</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very good</option>
                  <option value="5">5 - Excellent</option>
                </select>
                {errors.rating && <div className="err">{errors.rating}</div>}
              </div>

              {/* Review text */}
              <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea
                  id="review"
                  name="review"
                  rows="4"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with this doctor"
                ></textarea>
                {errors.review && <div className="err">{errors.review}</div>}
              </div>

              <button type="submit" className="submit-review-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiveReviews;
