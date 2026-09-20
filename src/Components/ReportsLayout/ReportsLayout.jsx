// Following code has been commented with appropriate comments for your reference.
import React from "react";
import "./ReportsLayout.css";

// Reports available to the signed-in patient.
// The PDF files live in the public folder so they are reachable from anywhere
// in the React project, both in development and in the production build.
const REPORTS = [
  {
    id: 1,
    doctorName: "Dr. Jiao Yang",
    speciality: "Dentist",
    file: "/patient_report.pdf",
  },
  {
    id: 2,
    doctorName: "Dr. Aya Mensah",
    speciality: "General Physician",
    file: "/patient_report.pdf",
  },
  {
    id: 3,
    doctorName: "Dr. Jane Smith",
    speciality: "Dermatologist",
    file: "/patient_report.pdf",
  },
];

const ReportsLayout = () => {
  return (
    <div className="reports-layout">
      <h1 className="reports-title">Reports</h1>

      {REPORTS.length > 0 ? (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Serial Number</th>
              <th>Doctor Name</th>
              <th>Doctor Speciality</th>
              <th>View Report</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {REPORTS.map((report, index) => (
              <tr key={report.id}>
                <td>{index + 1}</td>
                <td>{report.doctorName}</td>
                <td>{report.speciality}</td>
                <td>
                  {/* Opens the report in a new tab */}
                  <a
                    href={report.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="report-btn view-btn"
                  >
                    View Report
                  </a>
                </td>
                <td>
                  {/* The download attribute saves the file instead of opening it */}
                  <a
                    href={report.file}
                    download="patient_report.pdf"
                    className="report-btn download-btn"
                  >
                    Download Report
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Empty state, as required by the testing exercise
        <p className="no-reports">You have no reports yet.</p>
      )}
    </div>
  );
};

export default ReportsLayout;
