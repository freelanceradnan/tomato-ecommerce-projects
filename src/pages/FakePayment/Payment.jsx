import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft } from 'lucide-react';
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { StoreContext } from '../../contexts/StoreContext';
import { auth, db } from '../../Firebase/Firebase';
import { useDispatch } from 'react-redux';
import { clearCart, removeToCart } from '../../app/userDetails';

const FakePayment = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const [loading, setLoading] = useState(false);
   const {orderDetails}=useContext(StoreContext)
   const genarateOrderId = "SS-" + Math.floor(Math.random() * 900000 + 100000);
    const { orderId,setOrderId}=useContext(StoreContext)
   const {currentUser}=useContext(StoreContext)
   const {doneCoupon,setDoneCoupon}=useContext(StoreContext)
   
   const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
   
    try {
        const colRef = collection(db, 'orders');
        await addDoc(colRef, {genarateOrderId,...orderDetails});
        
        setOrderId(genarateOrderId)
        await dispatch(clearCart()); 
        setLoading(false);

    if (doneCoupon === true) {
        if (currentUser?.uid) {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
                usedCoupon: true
            });
            console.log("User coupon status updated!");
        } else {
            console.error("User ID not found!");
        }
    
        }
          navigate('/order-success', { replace: true });
    } catch (error) {
        setLoading(false);
        console.error("Payment Error: ", error);
        alert("অর্ডারটি সম্পন্ন করা সম্ভব হয়নি।");
    }
};

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-black mb-6 transition">
                    <ArrowLeft size={18} /> <span className="text-sm ml-1">Go Back</span>
                </button>

                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-black italic tracking-tighter">SOLE<span className="text-orange-600">STYLE</span> PAY</h2>
                    <div className="flex gap-1">
                        <div className="w-8 h-5 bg-blue-800 rounded-sm"></div>
                        <div className="w-8 h-5 bg-red-500 rounded-sm"></div>
                    </div>
                </div>

                <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Cardholder Name</label>
                        <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" placeholder="John Doe" />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Card Number</label>
                        <div className="relative">
                            <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" placeholder="xxxx xxxx xxxx xxxx" />
                            <CreditCard className="absolute right-4 top-4 text-gray-300" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">Expiry Date</label>
                            <input type="text" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" placeholder="MM/YY" />
                        </div>
                        <div>
                            <label className="text-xs font-bold uppercase text-gray-400 mb-2 block">CVV</label>
                            <input type="password" required className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" placeholder="***" />
                        </div>
                    </div>

                    <button 
                        disabled={loading}
                        className="w-full bg-black text-white py-5 rounded-2xl font-bold text-lg mt-6 hover:bg-gray-900 transition flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : `PAY NOW`}
                    </button>
                </form>

                <div className="mt-6 flex items-center justify-center gap-2 text-gray-400">
                    <Lock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Encrypted & Secure Payment</span>
                </div>
            </div>
        </div>
    );
};

export default FakePayment;