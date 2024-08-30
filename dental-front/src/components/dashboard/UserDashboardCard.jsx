import React, { useState, useEffect } from 'react';
import "./style/dashboard.css";
import Title from '../title/Title';
import axios from 'axios';

const UsersDashboardCard = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', surname: '', email: '', password: '', role: '' });
    const [editUserId, setEditUserId] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3030/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Gabim gjatë marrjes së përdoruesve:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    const addUser = async () => {
        try {
            await axios.post('http://localhost:3030/users/create', newUser);
            fetchUsers();
            setNewUser({ name: '', surname: '', email: '', password: '', role: '' });
        } catch (error) {
            console.error('Gabim gjatë shtimit të përdoruesit:', error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:3030/users/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchUsers();
        } catch (error) {
            console.error('Gabim gjatë fshirjes së përdoruesit:', error);
        }
    };

    const editUser = async (id) => {
        setEditUserId(id);
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            setNewUser({ ...userToEdit });
        }
    };

    const updateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(`http://localhost:3030/users/update/${editUserId}`, newUser, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchUsers();
            setEditUserId(null);
            setNewUser({ name: '', surname: '', email: '', password: '', role: '' });
        } catch (error) {
            console.error('Gabim gjatë përditësimit të përdoruesit:', error);
        }
    };

    return (
        <>
            <section className='users'>
                <div className="container">
                    {/* <Title subtitle="Dashboard/Users" /> */}
                    <div className="content">
                        <h1>Perdoruesit</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Emri</th>
                                    <th>Mbiemri</th>
                                    <th>Email</th>
                                    <th>Fjalekalimi</th>
                                    <th>Roli</th>
                                    <th>Aksionet</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{editUserId === user.id ?
                                            <input
                                                type="text"
                                                name="name"
                                                value={newUser.name}
                                                onChange={handleInputChange}
                                            /> :
                                            user.name
                                        }</td>
                                        <td>{editUserId === user.id ?
                                            <input
                                                type="text"
                                                name="surname"
                                                value={newUser.surname}
                                                onChange={handleInputChange}
                                            /> :
                                            user.surname
                                        }</td>
                                        <td>{editUserId === user.id ?
                                            <input
                                                type="text"
                                                name="email"
                                                value={newUser.email}
                                                onChange={handleInputChange}
                                            /> :
                                            user.email
                                        }</td>
                                        <td>{editUserId === user.id ?
                                            <input
                                                type="password"
                                                name="password"
                                                value={newUser.password}
                                                onChange={handleInputChange}
                                            /> :
                                            user.password
                                        }</td>
                                        <td>{editUserId === user.id ?
                                            <input
                                                type="text"
                                                name="role"
                                                value={newUser.role}
                                                onChange={handleInputChange}
                                            /> :
                                            user.role
                                        }</td>
                                        <td>
                                            {editUserId === user.id ?
                                                <>
                                                    <button onClick={updateUser}>Ruaj</button>
                                                    <button onClick={() => setEditUserId(null)}>Anulo</button>
                                                </>
                                                :
                                                <>
                                                    <button onClick={() => deleteUser(user.id)}>Fshij</button>
                                                    <button onClick={() => editUser(user.id)}>Ndrysho</button>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Remove the "Add New User" section when editing */}
                        {editUserId === null && (
                            <>
                                <h2>Shto Përdorues të Ri</h2>
                                <div className="add-inputs">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Emri"
                                        value={newUser.name}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Mbiemri"
                                        value={newUser.surname}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="Email"
                                        value={newUser.email}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Fjalëkalimi"
                                        value={newUser.password}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="role"
                                        placeholder="Roli"
                                        value={newUser.role}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={addUser}>Shto Përdorues</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        
        </>
    );
};

export default UsersDashboardCard;
