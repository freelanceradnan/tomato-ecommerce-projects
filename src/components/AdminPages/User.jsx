import { Trash2 } from 'lucide-react';
import React from 'react';

const User = () => {
    return (
        
        <div>
            <h2 className='font-semibold'>All Authenticate User available Here</h2>
            <table className='w-[100%] mt-6'>
                <thead>
                    <tr className='border'>
                    <th className='text-left border'>User Email</th>
                    <th className='text-center border'>Current Role</th>
                    <th className='text-center border'>Account Status</th>
                    <th className='text-center border'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border'>
                        <td className='text-left border'>reactorbro722@gmail.com</td>
                        <td className='text-center border'>
                            <select name="" id="">
                            <option>Admin</option>
                            <option>user</option>
                            </select>
                        </td>
                        <td className='text-center border'>
                            <select name="" id="">
                            <option>Active</option>
                            <option>Disabled</option>
                            </select>
                        </td>
                        <td className='text-center border'>x</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default User;