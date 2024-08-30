import React, { useState, useEffect } from 'react';
import './style/dashboard.css';
import axios from 'axios';

const ServiceDashboardCard = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ title: '', description: '' });
    const [editServiceId, setEditServiceId] = useState(null);
    const [iconFile, setIconFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:3030/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const handleTitleChange = (e) => {
        const { value } = e.target;
        setNewService({ ...newService, title: value });
    };

    const handleDescriptionChange = (e) => {
        const { value } = e.target;
        setNewService({ ...newService, description: value });
    };

    const handleIconChange = (e) => {
        setIconFile(e.target.files[0]);
    };

    const addService = async () => {
        if (!newService.title || !newService.description || !iconFile) {
            setErrorMessage('Please provide all required fields');
            return;
        }
        try {
            const formData = new FormData();
            formData.append('icon', iconFile);
            formData.append('title', newService.title);
            formData.append('description', newService.description);

            await axios.post('http://localhost:3030/services/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchServices();
            setNewService({ title: '', description: '' });
            setIconFile(null);
            setErrorMessage('');  // Clear error message on successful addition
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    const deleteService = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3030/services/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    const editService = (id) => {
        setEditServiceId(id);
        const serviceToEdit = services.find(service => service.id === id);
        if (serviceToEdit) {
            setNewService({ ...serviceToEdit });
        }
    };

    const updateService = async () => {
        if (!newService.title || !newService.description) {
            setErrorMessage('Please provide all required fields');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('id', editServiceId);
            if (iconFile) {
                formData.append('icon', iconFile);
            }
            formData.append('title', newService.title);
            formData.append('description', newService.description);
    
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:3030/services/update/${editServiceId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            fetchServices();
            setEditServiceId(null);
            setNewService({ title: '', description: '' });
            setIconFile(null);
            setErrorMessage('');
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };
 

    return (
        <>
            <section className='service'>
                <div className="container">
                    <div className="content">
                        <h1>Services</h1>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        <table>
                            <thead>
                                <tr>
                                    <th>Icon</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((service) => {
                                    return (
                                        <tr key={service.id}>
                                            <td>{editServiceId === service.id ?
                                                <input
                                                    type="file"
                                                    onChange={handleIconChange}
                                                /> :
                                                <img src={service.icon} alt="icon" style={{ width: '50px', height: '50px' }} />
                                            }</td>
                                            <td>{editServiceId === service.id ?
                                                <input
                                                    type="text"
                                                    value={newService.title}
                                                    onChange={handleTitleChange}
                                                /> :
                                                service.title
                                            }</td>
                                            <td>{editServiceId === service.id ?
                                                <input
                                                    type="text"
                                                    value={newService.description}
                                                    onChange={handleDescriptionChange}
                                                /> :
                                                service.description
                                            }</td>
                                            <td>
                                                {editServiceId === service.id ?
                                                    <>
                                                        <button onClick={updateService}>Save</button>
                                                        <button onClick={() => setEditServiceId(null)}>Cancel</button>
                                                    </> :
                                                    <>
                                                        <button onClick={() => deleteService(service.id)}>Delete</button>
                                                        <button onClick={() => editService(service.id)}>Edit</button>
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {editServiceId === null && (
                            <>
                                <h2>Add New Service</h2>
                                <div className="add-inputs">
                                    <input
                                        type="file"
                                        onChange={handleIconChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={newService.title}
                                        onChange={handleTitleChange}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        value={newService.description}
                                        onChange={handleDescriptionChange}
                                    />
                                    <button onClick={addService}>Add Service</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServiceDashboardCard;
