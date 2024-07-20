import React, { useState, useEffect } from 'react';
import { databases,account } from '../Appwrite/appwriteClient';

const AdminDashboard = () => {
  
  const [tickets, setTickets] = useState([]);
  
  //useEffect(()=>{
//     const fetchUser = async () => {
//         try {
//             const currentUser = await account.get();
//             setUser(currentUser);
//         } catch (error) {
//             console.log('No user logged in', error);
//         }
//     };
    
//     fetchUser();
// },[])
  
  useEffect(() => {
  //   if (user.role !== 'admin') return;

    const fetchTickets = async () => {
      try {
        const response = await databases.listDocuments(
          '669b5d0e001f4ab16443',
          '669b65580014a9137d67'
         );
         setTickets(response.documents);
       } catch (error) {
         console.error('Error fetching tickets:', error);
       }
     };
    fetchTickets();
   }, [user]);

  const handleApproval = async (ticketId, isApproved) => {
    try {
      await databases.updateDocument(
         '[669b5d0e001f4ab16443]',
          '[669b65580014a9137d67]',
        ticketId,
        { isApproved }
      );
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.$id === ticketId ? { ...ticket, isApproved } : ticket
        )
      );
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  // if (user.role !== 'admin') {
  //   return <p>You do not have access to this page.</p>;
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Priority</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Approval</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.$id}>
                <td className="py-2 px-4 border">{ticket.title}</td>
                <td className="py-2 px-4 border">{ticket.description}</td>
                <td className="py-2 px-4 border">{ticket.priority}</td>
                <td className="py-2 px-4 border">{ticket.category}</td>
                <td className="py-2 px-4 border">{ticket.status}</td>
                <td className="py-2 px-4 border">
                  {ticket.isApproved ? (
                    'Approved'
                  ) : (
                    <>
                      <button
                        onClick={() => handleApproval(ticket.$id, true)}
                        className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApproval(ticket.$id, false)}
                        className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 ml-2"
                      >
                        Disapprove
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
