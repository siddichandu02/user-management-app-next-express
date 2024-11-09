// pages/profile.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Profile() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        gender: ''
    });
    const router = useRouter();

    // Fetch user profile on component mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to sign in first.');
            router.push('/signin');  // Redirect to signin page if not authenticated
        } else {
            fetchProfile(token);
        }
    }, []);

    const fetchProfile = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFormData(response.data);  // Populate form with user data
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put('http://localhost:5000/api/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert(response.data.message);  // Display update confirmation
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile');
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                const response = await axios.delete('http://localhost:5000/api/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                alert(response.data.message);
                localStorage.removeItem('token');  // Clear token
                router.push('/signin');  // Redirect to signin page after deletion
            } catch (error) {
                console.error('Error deleting account:', error);
                alert('Error deleting account');
            }
        }
    };

    return (
        <div className="container">
            <h2>User Profile</h2>
            <form onSubmit={handleUpdate}>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>
                <button type="submit">Update Profile</button>
            </form>
            <button onClick={handleDelete} className="delete" style={{ marginTop: '20px', color: 'red' }}>
                Delete Account
            </button>
        </div>
    );
}
