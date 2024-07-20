import React, { useState } from 'react'
 import { account,databases } from '../Appwrite/appwriteClient'

 const Register = () => {
     const [email,setEmail]=useState('');
     const [password,setPassword]=useState('');
     const [confirmPassword,setConfirmPassword]=useState('');
     const [username,setUsername]=useState('');
     const [role,setRole]=useState('user');
     const [error,setError]=useState('');

     const handleSubmit=async(e)=>{
         e.preventDefault();
         setError('');

        if(password !== confirmPassword)
        {
         setError('Passwords do not match');
        return ;
        }
       const allowedAdminEmails=['tambiarchit@gmail.com'];
       const role = allowedAdminEmails.includes(email) ? 'admin' : 'user';
    
         try {
      const user= await account.create('unique()',email,password);
       //  const userData={
//             email,role
//         };
//     // await databases.createDocument(
//     //     '[Database_id]','[vollection id]', user.$id,
//     //     userData
     // )
     console.log("User register with role:",userData.role)
         } catch (error) {
             console.error('Registration error:', error);
             setError('Registration failed. Please try again.');
         }
       }

    
   return (
     <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
     {error&&<p className='text-red-500'>{error}</p>} 
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
      <label className="block mb-2 text-gray-700" htmlFor="username">
             Username
           </label>
           <input
             type="text"
             id="username"
             className="form-input mt-1 block w-full border-gray-300 rounded-md"
             value={username}
             onChange={(e) => setUsername(e.target.value)}
             required
             />
      </div>
      <div className="mb-4">
           <label className="block mb-2 text-gray-700" htmlFor="email">
             Email
           </label>
           <input
             type="email"
             id="email"
             className="form-input mt-1 block w-full border-gray-300 rounded-md"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             required
           />
         </div>
        <div className="mb-4">
           <label className="block mb-2 text-gray-700" htmlFor="password">
             Password
           </label>
          <input
             type="password"
             id="password"
             className="form-input mt-1 block w-full border-gray-300 rounded-md"
             value={password}
            onChange={(e) => setPassword(e.target.value)}
             required
          />
         </div>
        <div className="mb-4">
           <label className="block mb-2 text-gray-700" htmlFor="confirmpassword">
           Confirm Password
           </label>
           <input
             type="password"
             id="confirmpassword"
             className="form-input mt-1 block w-full border-gray-300 rounded-md"
             value={password}
            onChange={(e) => setConfirmPassword(e.target.value)}
             required
          />
        </div>
      <button
           type="submit"
           className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
         >
           Register
         </button>
      </form>
      
     </div>
   )
 }

 export default Register
