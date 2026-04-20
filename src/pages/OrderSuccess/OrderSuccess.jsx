import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { StoreContext } from '../../contexts/StoreContext';

const OrderSuccess = () => {
    const {orderDetails}=useContext(StoreContext)
    const { orderId,setOrderId}=useContext(StoreContext)
    const {currentUser}=useContext(StoreContext)
    
    
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
            <div className="max-w-lg w-full">
                <div className="mb-8 flex justify-center">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle size={60} className="text-green-500" />
                    </div>
                </div>

                <h1 className="text-4xl font-black mb-4">THANK YOU!</h1>
                <p className="text-gray-500 mb-8 text-lg">Your order has been placed successfully. We'll send you a confirmation email shortly.</p>

                <div className="bg-gray-50 p-6 rounded-3xl border border-dashed border-gray-200 mb-10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-400 font-bold text-sm uppercase">Order Number</span>
                        <span className="font-black text-lg">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400 font-bold text-sm uppercase">Status</span>
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Processing</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/myDashboard/orders" className="flex items-center justify-center gap-2 bg-gray-100 text-black py-4 rounded-2xl font-bold hover:bg-gray-200 transition">
                        <Package size={20} /> View Orders
                    </Link>
                    <Link to="/" className="flex items-center justify-center gap-2 bg-black text-white py-4 rounded-2xl font-bold hover:bg-orange-600 transition">
                        Continue Shopping <ArrowRight size={20} />
                    </Link>
                </div>

                <p className="mt-12 text-gray-400 text-xs uppercase font-bold tracking-[0.2em]">SoleStyle Premium Footwear</p>
            </div>
        </div>
    );
};

export default OrderSuccess;