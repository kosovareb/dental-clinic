import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./appointment.css";
import patientImage from "../../assets/patient.PNG";
import axios from "axios";

function Appointment({ isLoggedIn, userId }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    doctor: "",
    message: "",
    privacyPolicy: false,
    userId: userId, // Shtuar userId në formData
  });
  const [formErrors, setFormErrors] = useState({});
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3030/doctor");
      console.log("Doctors fetched:", response.data); 
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    if (id === "doctor") {
      const doctor = doctors.find((doc) => doc.fullname === value);
      setSelectedDoctor(doctor); 
    }
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName) errors.fullName = "Full name is required";
    if (!formData.phone) errors.phone = "Phone number is required";
    if (!formData.date) errors.date = "Date is required";
    if (!formData.doctor) errors.doctor = "Selecting a doctor is required";
    if (!formData.privacyPolicy)
      errors.privacyPolicy = "You must accept the privacy policy";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
        if (!selectedDoctor) {
            console.error("No doctor selected.");
            setFormErrors({ doctor: "Doctor selection is required" });
            return;
        }

        setLoading(true);
        const token = localStorage.getItem('your_token_key'); // Adjust as necessary

        try {
            const response = await axios.post(
                "http://localhost:3030/appointment/create",
                {
                    ...formData,
                    doctorId: selectedDoctor.id,
                    userId: formData.userId, // Shtuar userId në të dhënat e dërguara
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            console.log("Form submitted", response.data);
            resetForm();
        } catch (error) {
            console.error("Error submitting appointment:", error);
            setFormErrors({ submit: "Failed to submit appointment. Please try again." });
        } finally {
            setLoading(false);
        }
    } else {
        setFormErrors(errors);
    }
};

  const resetForm = () => {
    setFormData({
      fullName: "",
      phone: "",
      date: "",
      doctor: "",
      message: "",
      privacyPolicy: false,
      userId: "", // Resetimi i userId në të dhënat e formës
    });
    setSelectedDoctor(null);
  };

  useEffect(() => {
    if (formData.doctor) {
      const doctor = doctors.find((doc) => doc.fullname === formData.doctor);
      if (doctor) {
        setSelectedDoctor(doctor);
      } else {
        setSelectedDoctor(null);
      }
    } else {
      setSelectedDoctor(null);
    }
  }, [formData.doctor, doctors]);

  return (
    <div className="container">
      <div className="appointment-section my-5" id="appointment">
        <div className="row justify-content-between">
          <div className="col-12 col-md-6 col-lg-4 mb-5 text-right service_text">
            <h1 appoinment-title>
              MAKE AN <span>APPOINTMENT</span>
            </h1>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4 text-right service_text">
            <h1>
              Consult with our <span>Doctor</span>
            </h1>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="image-appointment">
              <img
                src={patientImage}
                alt="Smiling patient"
                className="img-fluid rounded"
              />
            </div>
          </div>
          <div className="col-md-6">
            <form className="form-appoinment p-5" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 form-group mb-4">
                  <label htmlFor="fullName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Full name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {formErrors.fullName && (
                    <p className="text-danger">{formErrors.fullName}</p>
                  )}
                </div>
                <div className="col-md-6 form-group mb-4">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    placeholder="+01 (555) 000-0000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {formErrors.phone && (
                    <p className="text-danger">{formErrors.phone}</p>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 form-group mb-4">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  {formErrors.date && (
                    <p className="text-danger">{formErrors.date}</p>
                  )}
                </div>
                <div className="col-md-6 form-group mb-4">
                  <label htmlFor="doctor">Doctor</label>
                  <select
                    className="form-control"
                    id="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                  >
                    <option value="">Choose Doctor</option>
                    {doctors.map((doc) => (
                      <option key={doc.id} value={doc.fullname}>
                        {doc.fullname}
                      </option>
                    ))}
                  </select>
                  {formErrors.doctor && (
                    <p className="text-danger">{formErrors.doctor}</p>
                  )}
                </div>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="message">Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Include a message..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-check mb-4">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="privacyPolicy">
                  You agree to our friendly privacy policy.
                </label>
                {formErrors.privacyPolicy && (
                  <p className="text-danger">{formErrors.privacyPolicy}</p>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
