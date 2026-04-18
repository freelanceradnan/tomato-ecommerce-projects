import React, { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from '../../app/store';
import { toast } from 'react-toastify';

const User = () => {
    const { data: allusers = [], isLoading, isError } = useGetAllUsersQuery();
    const [deleteUserMutation] = useDeleteUserMutation();
    const [updateUserMutation]=useUpdateUserMutation()
   
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ role: '', isActive: false });

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUserMutation(id).unwrap();
            alert("User deleted successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to delete user");
        }
    };

    // Initialize the form with specific user data
    const startEdit = (user) => {
        setEditingId(user.id);
        setEditForm({ role: user.role || 'user', isActive: user.isActive });
    };

    const cancelEdit = () => {
        setEditingId(null);
    };

    const handleSave = async (id) => {
        try {
            await updateUserMutation({ id, ...editForm }).unwrap();
            setEditingId(null);
            toast.success('user Update Success!', {
                               style: {
                                 backgroundColor: '#ff8c00', 
                                 color: '#ffffff'          
                               },})
        } catch (error) {
            alert("Failed to update user");
        }
    };

    if (isLoading) return <p className="p-4">Loading users...</p>;
    if (isError) return <p className="p-4 text-red-500">Error loading users.</p>;

    return (
        <div className="p-4">
            <h2 className='font-semibold text-xl'>Authenticated Users</h2>
            <table className='w-full mt-6 border-collapse bg-white shadow-sm'>
                <thead>
                    <tr className='bg-gray-100'>
                        <th className='p-3 text-left border'>User Email</th>
                        <th className='p-3 text-center border'>Current Role</th>
                        <th className='p-3 text-center border'>Account Status</th>
                        <th className='p-3 text-center border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {allusers.map((user) => {
                        const isCurrentlyEditing = editingId === user.id;

                        return (
                            <tr className='hover:bg-gray-50 transition-colors' key={user.id}>
                                <td className='p-3 text-left border'>{user.email}</td>
                                
                                {/* ROLE CELL */}
                                <td className='p-3 text-center border capitalize'>
                                    {isCurrentlyEditing ? (
                                        <select 
                                            value={editForm.role}
                                            onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                                            className="border rounded px-1 py-1 text-sm outline-tomato"
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    ) : (
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {user.role || 'User'}
                                        </span>
                                    )}
                                </td>

                                {/* STATUS CELL */}
                                <td className='p-3 text-center border'>
                                    {isCurrentlyEditing ? (
                                        <select 
                                            value={editForm.isActive}
                                            onChange={(e) => setEditForm({...editForm, isActive: e.target.value === 'true'})}
                                            className="border rounded px-1 py-1 text-sm outline-tomato"
                                        >
                                            <option value="true">Active</option>
                                            <option value="false">Disabled</option>
                                        </select>
                                    ) : (
                                        <span className={user.isActive ? "text-green-600 font-medium" : "text-red-500"}>
                                            {user.isActive ? "Active" : "Disabled"}
                                        </span>
                                    )}
                                </td>

                                {/* ACTIONS CELL */}
                                <td className='p-3 text-center border'>
                                    <div className="flex justify-center gap-3">
                                        {isCurrentlyEditing ? (
                                            <>
                                                <button onClick={() => handleSave(user.id)} className="text-green-600 hover:scale-110">
                                                    <Check size={20} />
                                                </button>
                                                <button onClick={cancelEdit} className="text-gray-400 hover:scale-110">
                                                    <X size={20} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(user)} className="text-blue-500 hover:text-blue-700">
                                                    <Pencil size={18} />
                                                </button>
                                                <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 size={18} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default User;