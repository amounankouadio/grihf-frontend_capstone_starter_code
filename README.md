# StayHealthy — Medical Appointment Booking Application

Frontend capstone project: a medical appointment booking platform where patients
find doctors by speciality, book or cancel appointments, leave reviews and
download their medical reports.

Built with **React 19**, **React Router**, **Vite**, and an **Express + MongoDB**
backend.

## Features

- **Landing page** with the StayHealthy hero section
- **Sign Up / Login** with client-side validation and JWT authentication
- **Navigation bar** that switches to a Logout button once signed in, showing the
  user name extracted from the email address
- **Appointment booking**: search doctors by speciality, view doctor cards, book
  a slot and cancel an existing appointment
- **Instant consultation** variant collecting only name and phone number
- **Profile** card with an edit mode to update name and phone
- **Reports** listing, with view and download of the patient report (PDF)

## Project structure

```
.
├── index.html              SEO meta tags
├── config.js               API_URL of the backend
├── vite.config.js
├── package.json
├── Dockerfile              containerisation for deployment
├── public/
│   └── patient_report.pdf  downloadable patient report
├── screenshots/            deliverables for the final submission
├── server/                 Express API (auth routes, MongoDB)
│   ├── index.js
│   ├── db.js
│   └── routes/auth.js
└── src/
    ├── App.jsx             BrowserRouter and routes
    ├── main.jsx
    ├── index.css
    └── Components/
        ├── Landing_Page/        .css + .html + .jsx
        ├── Navbar/              .css + .html + .jsx
        ├── Sign_Up/             .css + .html + .jsx
        ├── Login/               .css + .html + .jsx
        ├── FindDoctorSearch/    .css + .jsx
        ├── DoctorCard/          .css + .jsx
        ├── AppointmentForm/     .css + .jsx
        ├── ProfileCard/         .css + .jsx
        ├── ReportsLayout/       .css + .jsx
        ├── BookingConsultation.jsx + .css
        └── InstantConsultation/
            ├── FindDoctorSearchIC/
            └── AppointmentFormIC/
```

Each component folder keeps the original `.html` layout next to the `.jsx`
component derived from it.

## Routes

| Path | Component |
|------|-----------|
| `/` | Landing page |
| `/signup` | Sign Up form |
| `/login` | Login form |
| `/booking-consultation` | Doctor search and appointment booking |
| `/profile` | Profile card with edit mode |
| `/reports` | Patient reports, view and download |

## Setup

### 1. Clone and install

```bash
git clone https://github.com/amounankouadio/grihf-frontend_capstone_starter_code.git
cd grihf-frontend_capstone_starter_code
npm install
```

### 2. Configure the backend URL

Edit `config.js` and set `API_URL` to your server URL:

```javascript
export const API_URL = "http://localhost:8181";
```

### 3. Start MongoDB and the API server

Paste your MongoDB connection password in `server/db.js`, then:

```bash
cd server
npm install
node index          # listens on port 8181
```

### 4. Run the client

```bash
npm run dev         # development server
npm run preview     # serves the production build
```

## Production build

```bash
npm run build       # output goes to server/build
cd server && node index
```

The Express server then serves both the API and the built client, with a
catch-all route so client-side routing survives a page refresh.

## Deployment

```bash
MY_NAMESPACE=$(ibmcloud cr namespaces | grep sn-labs-)
docker build . -t us.icr.io/$MY_NAMESPACE/medical_app
docker push us.icr.io/$MY_NAMESPACE/medical_app
docker run -p 8080:4173 us.icr.io/$MY_NAMESPACE/medical_app
```

## API endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/user` | Fetch the profile of the signed-in user |
| PUT | `/api/auth/user` | Update name and phone |

## Author

Amounan Kouadio
