import React from 'react';
import { Trash2 } from 'lucide-react';
import { useDeleteUserMutation, useGetAllUsersQuery } from '../../app/store';
// Assuming you are using react-hot-toast or react-toastify
// import { toast } from 'react-hot-toast'; 

const User = () => {
    // 1. Get data directly from the hook
    const { data: allusers = [], isLoading, isError } = useGetAllUsersQuery();
    const [deleteUserMutation] = useDeleteUserMutation();

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            // Use the mutation trigger (renamed to avoid conflict)
            await deleteUserMutation(id).unwrap();
            alert("User deleted successfully"); // Replace with toast.success()
        } catch (error) {
            console.error(error);
            alert("Failed to delete user"); // Replace with toast.error()
        }
    };

    if (isLoading) return <p>Loading users...</p>;
    if (isError) return <p>Error loading users.</p>;

    return (
        <div className="p-4">
            <h2 className='font-semibold text-xl'>Authenticated Users</h2>
            <table className='w-full mt-6 border-collapse'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='p-2 text-left border'>User Email</th>
                        <th className='p-2 text-center border'>Current Role</th>
                        <th className='p-2 text-center border'>Account Status</th>
                        <th className='p-2 text-center border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allusers.map((singleUser) => (
                        <tr className='hover:bg-gray-50' key={singleUser.id}>
                            <td className='p-2 text-left border'>{singleUser.email}</td>
                            <td className='p-2 text-center border capitalize'>
                                {singleUser.role || 'User'}
                            </td>
                            <td className='p-2 text-center border'>
                                <select 
                                    className="border rounded p-1"
                                    defaultValue={singleUser.isActive ? "Active" : "Disabled"}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Disabled">Disabled</option>
                                </select>
                            </td>
                            <td className='p-2 text-center border'>
                                <button 
                                    onClick={() => handleDelete(singleUser.id)}
                                    className="text-red-500 hover:text-red-700 transition-colors"
                                >
                                    <Trash2 size={18} className="mx-auto" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default User;