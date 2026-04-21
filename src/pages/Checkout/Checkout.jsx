import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChevronLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../contexts/StoreContext';
import { useGetAllUsersQuery } from '../../app/store';
import { toast } from 'react-toastify';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';

const Checkout = () => {
 const cart = useSelector(state => state.user);
 const {data:alluser}=useGetAllUsersQuery()

    const navigate = useNavigate();
    const { setOrderDetails, currentUser } = useContext(StoreContext);
   
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 15.00;
    const total = subtotal + shipping;
    const orderProductIds = cart.map(item => item.id);
    const [cuponInput,setCuponInput]=useState("")
    const [newTotal,setNewTotal]=useState("")
    const updateTotal=newTotal?newTotal:total
    const [cuponError,setCuponError]=useState("")
    const [actionUser,setActionUser]=useState([])
    // const actionUser=alluser?.find((c)=>c.email==currentUser?.email)
    const {doneCoupon,setDoneCoupon}=useContext(StoreContext)

    const [orderInfo, setOrderInfo] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        email: currentUser?.email || "",
        status: "Processing",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setOrderInfo(data => ({ ...data, [name]: value }));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const finalOrder = {
            ...orderInfo,
            OrderProduct: orderProductIds,
            totalPrice: updateTotal,
            date: new Date().toISOString()
        };

        setOrderDetails(finalOrder);
        navigate("/payment");
    };
    
    const applyCoupon=async()=>{
    try {
    const hasused=actionUser.usedCoupon
    
    if (actionUser.usedCoupon === false) {
    if(cuponInput==='Welcome20'){
    const discount = total * 0.20;
    const finalPrice = total - discount;
    setNewTotal(finalPrice)
    setDoneCoupon(true)
     toast.success('Well Done!Coupon Code Success!', {
      style: {
        backgroundColor: 'pink', 
        color: '#ffffff'          
      },
      progressStyle: {
        background: '#ffffff'     
         }});
    
    }
    else{
    setCuponError('Coupon code not Valied')
    }


} else {
    
    toast.success('Coupon code already Used!', {
     style: {
       backgroundColor: 'red', 
       color: '#ffffff'          
     },
     progressStyle: {
       background: '#ffffff'     
        }});
}  
    } catch (error) {
        
    }
    }
const ChangeCuponHandler=async(e)=>{
  
        setCuponError("")
        setCuponInput(e.target.value)
    }
    useEffect(() => {
    if (currentUser?.uid) {
        const userRef = doc(db, "users", currentUser.uid);
        
        const unsubscribe = onSnapshot(userRef, (doc) =>{ 
            setActionUser(doc.data()); 
        });
        return () => unsubscribe(); 
    }
}, [currentUser]);
    return (
        <div className="bg-[#FBFBFB] min-h-screen py-5 px-4 md:px-8">
            <form onSubmit={submitHandler}>
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        {actionUser?.usedCoupon === false && (
    <div className="bg-black border-l-4 border-orange-500 p-1 mb-1 rounded-r-xl shadow-sm animate-in fade-in slide-in-from-top duration-500">
        <div className="flex items-center gap-3">
            <div className="bg-orange-500/10 p-2 rounded-lg">
                <span className="text-xl">🎁</span>
            </div>
            <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-orange-500">First Order Bonus</h4>
                <p className="text-white text-[13px] font-medium tracking-tight">
                    Get <span className="text-orange-500 font-bold">20% OFF</span> on your first order! 
                    Use code <span className="bg-white/10 px-2 py-0.5 rounded border border-white/20 text-white font-mono mx-1">Welcome20</span>
                </p>
            </div>
        </div>
    </div>
)}
                        <Link to="/cart" className="flex items-center text-gray-500 hover:text-black transition mb-4">
                            <ChevronLeft size={20} />
                            <span className="text-sm font-medium">Back to Cart</span>
                        </Link>
                        <h1 className="text-4xl font-black tracking-tight uppercase">Checkout</h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Left Side */}
                        <div className="lg:col-span-7 space-y-8">
                            
                            {/* 1. Contact Info */}
                            <section className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">1</span>
                                    Contact Information
                                </h2>
                                <input 
                                    type="email" 
                                    className="w-full p-4 bg-gray-100 border border-gray-200 rounded-xl outline-none cursor-not-allowed" 
                                    value={currentUser?.email || "Guest"} 
                                    disabled
                                />
                            </section>

                            {/* 2. Shipping Address */}
                            <section className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">2</span>
                                    Shipping Address
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input name="firstName" onChange={onChangeHandler} value={orderInfo.firstName} type="text" placeholder="First Name" className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" required/>
                                    <input name="lastName" onChange={onChangeHandler} value={orderInfo.lastName} type="text" placeholder="Last Name" className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" required/>
                                    <input name="address" onChange={onChangeHandler} value={orderInfo.address} type="text" placeholder="Address" className="col-span-2 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" required/>
                                    <input name="city" onChange={onChangeHandler} value={orderInfo.city} type="text" placeholder="City" className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" required/>
                                    <input name="postalCode" onChange={onChangeHandler} value={orderInfo.postalCode} type="text" placeholder="Postal Code" className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-black outline-none transition" required/>
                                </div>
                            </section>

                            {/* 3. Payment Method */}
                            <section className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="bg-black text-white w-7 h-7 rounded-full flex items-center justify-center text-xs">3</span>
                                    Payment Method
                                </h2>
                                <div className="p-4 border-2 border-black rounded-xl flex justify-between items-center bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        <CreditCard size={20} />
                                        <span className="font-bold text-sm">Credit / Debit Card</span>
                                    </div>
                                    <div className="flex gap-1">
                                        <div className="w-8 h-5 bg-gray-300 rounded-sm"></div>
                                        <div className="w-8 h-5 bg-gray-400 rounded-sm"></div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Side Summary */}
                        <div className="lg:col-span-5">
                            <div className="bg-white p-2 rounded-2xl shadow-xl border border-gray-100 sticky top-8">
                                <h2 className="text-2xl font-black mb-8 italic">ORDER SUMMARY</h2>
                                
                                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex gap-4">
                                            <div className="relative">
                                                <img src={item.image} alt="" className="w-20 h-20 object-cover rounded-xl bg-gray-50" />
                                                <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-sm line-clamp-1 uppercase">{item.title}</h3>
                                                <p className="text-gray-400 text-xs mt-1">Standard Shipping</p>
                                                <p className="font-black mt-1 text-orange-600">${item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 border-t pt-6">
                                    <div className="flex justify-between text-gray-500 font-bold text-xs uppercase">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 font-bold text-xs uppercase">
                                        <span>Shipping</span>
                                        <span>${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className='flex items-center justify-between gap-2'>
    <div>
        <input 
            type="text" 
            className='border h-7 rounded-sm focus:outline-none' 
            value={cuponInput} 
            onChange={ChangeCuponHandler}
            disabled={ actionUser?.usedCoupon} 
        />
        {cuponError && <h2 className='text-red-500'>{cuponError}</h2>}
    </div>
    <button 
        className={`px-10 py-1 font-extralight text-white ${ actionUser?.usedCoupon ? 'bg-gray-400' : 'bg-blue-500'}`} 
        type='button' 
        onClick={applyCoupon}
        disabled={ actionUser?.usedCoupon} 
    >
        {actionUser?.usedCoupon ? 'Applied' : 'Apply'}
    </button>
</div>
                                    <div className="flex justify-between items-center border-t border-black pt-6">
                                        <span className="text-xl font-black italic">TOTAL</span>
                                        <span className="text-3xl font-black text-black">${newTotal?newTotal:total}</span>
                                    </div>
                                </div>

                                <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg mt-8 hover:bg-orange-600 transition-all shadow-lg uppercase tracking-tighter">
                                    Proceed to Payment
                                </button>

                                <div className="grid grid-cols-3 gap-2 mt-8 border-t pt-8">
                                    <div className="flex flex-col items-center text-center">
                                        <ShieldCheck size={18} className="text-gray-400 mb-1" />
                                        <span className="text-[9px] text-gray-400 font-black uppercase">Secure</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <Truck size={18} className="text-gray-400 mb-1" />
                                        <span className="text-[9px] text-gray-400 font-black uppercase">Fast</span>
                                    </div>
                                    <div className="flex flex-col items-center text-center">
                                        <CreditCard size={18} className="text-gray-400 mb-1" />
                                        <span className="text-[9px] text-gray-400 font-black uppercase">Verified</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Checkout;