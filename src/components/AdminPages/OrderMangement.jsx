import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { auth, db } from '../../Firebase/Firebase';
import { StoreContext } from '../../contexts/StoreContext';

const OrderMangement = () => {
    const [userOrderData, setUserOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(StoreContext);

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
                    // ইউজার অনুযায়ী ফিল্টার
                    const filteredData = snapData.filter(order => order.email === user.email);
                    setUserOrderData(filteredData);
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

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="bg-blue-600 w-2 h-8 rounded-full"></span>
                    Order History
                </h2>

                {/* Desktop Table View (Hidden on Mobile) */}
                <div className="hidden md:block overflow-hidden bg-white shadow-lg rounded-xl">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Products ID</th>
                                <th className="px-6 py-4 font-semibold">Order Number</th>
                                <th className="px-6 py-4 font-semibold">Total</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {userOrderData.map((order) => (
                                <tr key={order.id} className="hover:bg-blue-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                                            {order.OrderProduct?.map((pid, i) => (
                                                <span key={i} className="bg-gray-200 text-[10px] px-2 py-0.5 rounded text-gray-700 border border-gray-300">
                                                    {pid}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-sm font-semibold">{order.genarateOrderId}</td>
                                    <td className="px-6 py-4 font-bold text-blue-600">${order.totalPrice}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            {order.status || 'Processing'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View (Hidden on Desktop) */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {userOrderData.map((order) => (
                        <div key={order.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">Order ID</p>
                                    <p className="font-mono font-bold text-gray-700">{order.genarateOrderId}</p>
                                </div>
                                <span className="bg-yellow-100 text-yellow-800 text-[10px] px-2 py-1 rounded-lg font-bold">
                                    {order.status?.toUpperCase() || 'PENDING'}
                                </span>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs text-gray-400 mb-1">Products:</p>
                                <div className="flex flex-wrap gap-2">
                                    {order.OrderProduct?.map((pid, i) => (
                                        <span key={i} className="bg-blue-50 text-blue-600 text-[11px] px-2 py-1 rounded border border-blue-100">
                                            #{pid}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                                <span className="text-sm text-gray-500">{order.date}</span>
                                <span className="text-lg font-black text-blue-600">${order.totalPrice}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {userOrderData.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                        <p className="text-gray-400 italic">No Order Available!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderMangement;