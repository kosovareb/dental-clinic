import React, { useState, useEffect } from 'react';
import './style/dashboard.css';
import axios from 'axios';

const AppointmentDashboardCard = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ fullName: '', phone: '', date: '', doctorId: '', message: '', privacyPolicy: false });
    const [editAppointmentId, setEditAppointmentId] = useState(null);
    const [doctors, setDoctors] = useState([]); 

    useEffect(() => {
        fetchAppointments();
        fetchDoctors(); 
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:3030/appointment');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchDoctors = async () => { 
        try {
            const response = await axios.get('http://localhost:3030/doctor');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleFullNameChange = (e) => {
        const { value } = e.target;
        setNewAppointment({ ...newAppointment, fullName: value });
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        setNewAppointment({ ...newAppointment, phone: value });
    };

    const handleDateChange = (e) => {
        const { value } = e.target;
        setNewAppointment({ ...newAppointment, date: value });
    };

    const handleDoctorIdChange = (e) => {
        const { value } = e.target;
        setNewAppointment({ ...newAppointment, doctorId: value });
    };

    const handleMessageChange = (e) => {
        const { value } = e.target;
        setNewAppointment({ ...newAppointment, message: value });
    };

    const handlePrivacyPolicyChange = (e) => {
        const { checked } = e.target;
        setNewAppointment({ ...newAppointment, privacyPolicy: checked });
    };

    // const addAppointment = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         await axios.post('http://localhost:3030/appointment/create', newAppointment, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         fetchAppointments();
    //         setNewAppointment({ fullName: '', phone: '', date: '', doctorId: '', message: '', privacyPolicy: false });
    //     } catch (error) {
    //         console.error('Error adding appointment:', error);
    //     }
    // };

    const addAppointment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            console.log('Token:', token); // Debugging log
    
            await axios.post('http://localhost:3030/appointment/create', newAppointment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAppointments();
            setNewAppointment({ fullName: '', phone: '', date: '', doctorId: '', message: '', privacyPolicy: false });
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };
    // const deleteAppointment = async (id) => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         await axios.delete(`http://localhost:3030/appointment/delete/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         fetchAppointments();
    //     } catch (error) {
    //         console.error('Error deleting appointment:', error);
    //     }
    // };

    const deleteAppointment = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            console.log('Token:', token); // Debugging log
    
            await axios.delete(`http://localhost:3030/appointment/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAppointments();
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const editAppointment = (id) => {
        setEditAppointmentId(id);
        const appointmentToEdit = appointments.find(appointment => appointment.id === id);
        if (appointmentToEdit) {
            setNewAppointment({ ...appointmentToEdit });
        }
    };

    // const updateAppointment = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         await axios.patch(`http://localhost:3030/appointment/update/${editAppointmentId}`, newAppointment, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         fetchAppointments();
    //         setEditAppointmentId(null);
    //         setNewAppointment({ fullName: '', phone: '', date: '', doctorId: '', message: '', privacyPolicy: false });
    //     } catch (error) {
    //         console.error('Error updating appointment:', error);
    //     }
    // };

    const updateAppointment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');
            console.log('Token:', token); // Debugging log
    
            await axios.patch(`http://localhost:3030/appointment/update/${editAppointmentId}`, newAppointment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAppointments();
            setEditAppointmentId(null);
            setNewAppointment({ fullName: '', phone: '', date: '', doctorId: '', message: '', privacyPolicy: false });
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    return (
        <>
            <section className='appointment'>
                <div className="container">
                    <div className="title-subtitle">
                        <h1 className="title">Appointments</h1>
                        <p className="subtitle">Manage your appointments</p>
                    </div>
                    <div className="form">
                        <input type="text" value={newAppointment.fullName} onChange={handleFullNameChange} placeholder="Full Name" />
                        <input type="text" value={newAppointment.phone} onChange={handlePhoneChange} placeholder="Phone" />
                        <input type="date" value={newAppointment.date} onChange={handleDateChange} />
                        <select value={newAppointment.doctorId} onChange={handleDoctorIdChange}>
                            <option value="">Select a doctor</option>
                            {doctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>{doctor.fullName}</option>
                            ))}
                        </select>
                        <input type="text" value={newAppointment.message} onChange={handleMessageChange} placeholder="Message" />
                        <label>
                            <input type="checkbox" checked={newAppointment.privacyPolicy} onChange={handlePrivacyPolicyChange} /> I agree to the Privacy Policy
                        </label>
                        <button onClick={editAppointmentId ? updateAppointment : addAppointment}>
                            {editAppointmentId ? 'Update Appointment' : 'Add Appointment'}
                        </button>
                    </div>
                </div>
                <div className="appointment-list">
                    {appointments.map((appointment) => (
                        <div key={appointment.id} className="appointment-card">
                            <h3>{appointment.fullName}</h3>
                            <p>Phone: {appointment.phone}</p>
                            <p>Date: {appointment.date}</p>
                            <p>Doctor: {appointment.doctorId}</p>
                            <p>Message: {appointment.message}</p>
                            <p>Privacy Policy: {appointment.privacyPolicy ? 'Agreed' : 'Not Agreed'}</p>
                            <button onClick={() => deleteAppointment(appointment.id)}>Delete</button>
                            <button onClick={() => editAppointment(appointment.id)}>Edit</button>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default AppointmentDashboardCard;
