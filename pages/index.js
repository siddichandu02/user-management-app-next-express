// pages/index.js
import Link from 'next/link';

export default function Home() {
    return (
        <div className="container">
            <h1>Welcome to the User Management System</h1>
            <nav>
                <Link href="/signup">Signup</Link> | 
                <Link href="/signin">Signin</Link> | 
                <Link href="/profile">Profile</Link>
            </nav>
        </div>
    );
}
