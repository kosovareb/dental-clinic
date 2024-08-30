import React, { useState, useEffect } from 'react';
import './style/dashboard.css';
import axios from '../../api/apiClient';

const DoctorDashboardCard = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ fullname: '', specialized: '', university: '', imgSrc: '' });
    const [editDoctorId, setEditDoctorId] = useState(null);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/doctor');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleFullnameChange = (e) => {
        const { value } = e.target;
        setNewDoctor({ ...newDoctor, fullname: value });
    };

    const handleSpecializedChange = (e) => {
        const { value } = e.target;
        setNewDoctor({ ...newDoctor, specialized: value });
    };

    const handleUniversityChange = (e) => {
        const { value } = e.target;
        setNewDoctor({ ...newDoctor, university: value });
    };

    const handleImgSrcChange = (e) => {
        const { value } = e.target;
        setNewDoctor({ ...newDoctor, imgSrc: value });
    };

    const addDoctor = async () => {
        try {
            await axios.post('/doctor/create', newDoctor);
            fetchDoctors();
            setNewDoctor({ fullname: '', specialized: '', university: '', imgSrc: '' });
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    const deleteDoctor = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/doctor/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDoctors();
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    const editDoctor = (id) => {
        setEditDoctorId(id);
        const doctorToEdit = doctors.find(doctor => doctor.id === id);
        if (doctorToEdit) {
            setNewDoctor({ ...doctorToEdit });
        }
    };

    const updateDoctor = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`/doctor/update/${editDoctorId}`, newDoctor, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchDoctors();
            setEditDoctorId(null);
            setNewDoctor({ fullname: '', specialized: '', university: '', imgSrc: '' });
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    return (
        <>
            <section className='doctor'>
                <div className="container">
                    <div className="content">
                        <h1>Doctors</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Fullname</th>
                                    <th>Specialized</th>
                                    <th>University</th>
                                    <th>Image URL</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctors.map((doctor) => {
                                    return (
                                        <tr key={doctor.id}>
                                            <td>{editDoctorId === doctor.id ?
                                                <input
                                                    type="text"
                                                    value={newDoctor.fullname}
                                                    onChange={handleFullnameChange}
                                                /> :
                                                doctor.fullname
                                            }</td>
                                            <td>{editDoctorId === doctor.id ?
                                                <input
                                                    type="text"
                                                    value={newDoctor.specialized}
                                                    onChange={handleSpecializedChange}
                                                /> :
                                                doctor.specialized
                                            }</td>
                                            <td>{editDoctorId === doctor.id ?
                                                <input
                                                    type="text"
                                                    value={newDoctor.university}
                                                    onChange={handleUniversityChange}
                                                /> :
                                                doctor.university
                                            }</td>
                                            <td>{editDoctorId === doctor.id ?
                                                <input
                                                    type="text"
                                                    value={newDoctor.imgSrc}
                                                    onChange={handleImgSrcChange}
                                                /> :
                                                doctor.imgSrc
                                            }</td>
                                            <td>
                                                {editDoctorId === doctor.id ?
                                                    <>
                                                        <button onClick={updateDoctor}>Save</button>
                                                        <button onClick={() => setEditDoctorId(null)}>Cancel</button>
                                                    </> :
                                                    <>
                                                        <button onClick={() => deleteDoctor(doctor.id)}>Delete</button>
                                                        <button onClick={() => editDoctor(doctor.id)}>Edit</button>
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {editDoctorId === null && (
                            <>
                                <h2>Add New Doctor</h2>
                                <div className="add-inputs">
                                    <input
                                        type="text"
                                        placeholder="Fullname"
                                        value={newDoctor.fullname}
                                        onChange={handleFullnameChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Specialized"
                                        value={newDoctor.specialized}
                                        onChange={handleSpecializedChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="University"
                                        value={newDoctor.university}
                                        onChange={handleUniversityChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Image URL"
                                        value={newDoctor.imgSrc}
                                        onChange={handleImgSrcChange}
                                    />
                                    <button onClick={addDoctor}>Add Doctor</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default DoctorDashboardCard;
