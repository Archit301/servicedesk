import React, { useEffect, useState } from 'react'
import { account,databases } from './Appwrite/appwriteClient';

const TicketForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');
    const [price, setPrice] = useState('');
    const  [user,setUser]=useState('')
    //  useEffect(()=>{
    //     setUser(account.get());
    //  },[])

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setError('');
        try {
            await databases.createDocument('669b5d0e001f4ab16443', '669b65580014a9137d67', 'unique()', {
                title,
                description,
                priority,
                category,
                status: 'open',
                isApproved: false, // By default not approved
                createdBy: user.$id,
                price,
              });
        
              // Trigger payment after creating the ticket
               const payment = await loadRazorpay(price);
               if (payment) {
                alert('Payment successful');
               } else {
                 alert('Payment failed');
               }
  //           const ticketData = {
  //               title,
  //                description,
  //               priority,
  //               category,
  //              status: 'open',
  //               isApproved: false, // By default not approved
  //               createdBy: user.$id,
  //             };
  //  await databases.createDocument(
  //   '[669b5d0e001f4ab16443]','[669b65580014a9137d67]','unique()'
  //  )
        } catch (error) {
            console.log(error);
        }
      
    

    }
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Create a Ticket</h2>
    {error && <p className="text-red-500">{error}</p>}
    <div className="mb-4">
      <label className="block mb-2 text-gray-700" htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        className="form-input mt-1 block w-full border-gray-300 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-gray-700" htmlFor="title">Price</label>
      <input
        type="number"
        id="price"
        className="form-input mt-1 block w-full border-gray-300 rounded-md"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-gray-700" htmlFor="description">Description</label>
      <textarea
        id="description"
        className="form-textarea mt-1 block w-full border-gray-300 rounded-md"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-gray-700" htmlFor="priority">Priority</label>
      <select
        id="priority"
        className="form-select mt-1 block w-full border-gray-300 rounded-md"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-gray-700" htmlFor="category">Category</label>
      <select
        id="category"
        className="form-select mt-1 block w-full border-gray-300 rounded-md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Select category</option>
        <option value="software">Software</option>
        <option value="hardware">Hardware</option>
        <option value="network">Network</option>
      </select>
    </div>
    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Create Ticket</button>
  </form>
  )
}

export default TicketForm
