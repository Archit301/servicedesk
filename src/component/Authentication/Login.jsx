import React, { useEffect, useState } from 'react'
import { client,account } from '../Appwrite/appwriteClient';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
    const  [user,setUser]=useState('')
    useEffect(()=>{
    const fetchUser = async () => {
        try {
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            console.log('No user logged in', error);
        }
    };
    
    fetchUser();
},[])
 
    const handleLogin=async(e)=>{
        e.preventDefault();
        try {
          //  await account.createEmailPasswordSession(email, password);
          const sessions = await account.listSessions();
          if (sessions.length > 0) {
            // A session is active, so no need to create a new one
            console.log('User is already logged in');
            return;
        }
        //  const currentUser = await account.get();
         console.log(user)
            alert('Login successful'); 
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed'); 
            console.log(error);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block w-full mb-2 p-2 border"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block w-full mb-4 p-2 border"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
