import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../Firebase/Firebase';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Pencil, Trash2, X, Check, ShoppingBag, Calendar, Mail } from 'lucide-react';

const OrderMangement = () => {
    const [userOrderData, setUserOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const docRef = collection(db, 'orders');
                    const res = await getDocs(docRef);
                    const snapData = res.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setUserOrderData(snapData);
                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm("Delete this order?")) {
            await deleteDoc(doc(db, 'orders', id));
            setUserOrderData(userOrderData.filter(item => item.id !== id));
        }
    };

    const updateStatus = async (id, newStatus) => {
        await updateDoc(doc(db, 'orders', id), { status: newStatus });
        setUserOrderData(userOrderData.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
        setEditId(null);
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
    );

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <ShoppingBag className="text-blue-600" />
                        Order Management
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">Manage and customer orders</p>
                </header>

                {/* --- DESKTOP VIEW (Visible on md screens and up) --- */}
                <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Order Info</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Products</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {userOrderData.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.genarateOrderId}</div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Mail size={14} /> {order.email}
                                    </div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1">
                                            <Calendar size={12} /> {order.date}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {order.OrderProduct?.map((p, i) => (
                                                <span key={i} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-md border border-blue-100">
                                                    {p}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">${order.totalPrice}</td>
                                    <td className="px-6 py-4">
                                        {editId === order.id ? (
                                            <select 
                                                className="text-sm border rounded-lg p-1 bg-white outline-none ring-1 ring-blue-500"
                                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                                defaultValue={order.status}
                                            >
                                                <option value="Processing">Processing</option>
                                                <option value="On Way">On Way</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {order.status || 'Processing'}
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => setEditId(editId === order.id ? null : order.id)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg">
                                                {editId === order.id ? <X size={18} /> : <Pencil size={18} />}
                                            </button>
                                            <button onClick={() => deleteHandler(order.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- MOBILE VIEW (Visible on small screens) --- */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {userOrderData.map((order) => (
                        <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-gray-900">#{order.genarateOrderId}</h3>
                                    <p className="text-xs text-gray-500">{order.date}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-blue-600 text-lg">${order.totalPrice}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Customer</label>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Mail size={14} /> {order.email}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Status</label>
                                    {editId === order.id ? (
                                        <select 
                                            className="w-full text-sm border rounded-lg p-2 mt-1"
                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                            defaultValue={order.status}
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="On Way">On Way</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    ) : (
                                        <span className="text-sm font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                            {order.status || 'Processing'}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="mt-5 pt-4 border-t border-gray-100 flex gap-2">
                                <button 
                                    onClick={() => setEditId(editId === order.id ? null : order.id)}
                                    className="flex-1 bg-gray-50 text-gray-700 py-2 rounded-xl text-sm font-semibold flex justify-center items-center gap-2"
                                >
                                    {editId === order.id ? <><X size={16}/> Close</> : <><Pencil size={16}/> Edit Status</>}
                                </button>
                                <button 
                                    onClick={() => deleteHandler(order.id)}
                                    className="p-2 bg-red-50 text-red-600 rounded-xl"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

               
                {userOrderData.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
                        <p className="text-gray-400">No orders found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderMangement;