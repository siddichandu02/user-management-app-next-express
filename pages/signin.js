// pages/signin.js
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Signin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/signin', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            alert('Signin successful!');
            router.push('/profile');
        } catch (error) {
            console.error(error);
            alert('Error signing in');
        }
    };

    return (
        <div className="container">
            <h2>Signin</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Signin</button>
            </form>
        </div>
    );
}
