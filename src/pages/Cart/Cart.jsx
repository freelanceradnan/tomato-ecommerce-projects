import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, modifyQuantity, removeToCart } from '../../app/userDetails';
import { Trash2, Plus, Minus, ShoppingBag, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
    const cart = useSelector(state => state.user);
    const dispatch = useDispatch();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = cart.length > 0 ? 5.00 : 0;

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <ShoppingBag size={80} className="text-gray-300" />
                <h2 className="text-2xl font-semibold text-gray-600">Your cart is empty</h2>
               <Link to="/">
                <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition">
                    Go Shopping
                </button></Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100 gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img src={item.image} alt={item.title} className="w-20 h-20 object-contain rounded-lg bg-gray-50 p-2" />
                                <div>
                                    <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                                    <p className="text-orange-500 font-bold">${item.price}</p>
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center border rounded-lg bg-gray-50">
                                <button 
                                    className="p-2 hover:text-orange-500 transition"
                                    onClick={() => item.quantity > 1 ? dispatch(modifyQuantity({ id: item.id, quantity: item.quantity - 1 })) : dispatch(removeToCart(item.id))}
                                >
                                    <Minus size={16} />
                                </button>
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    className="w-10 text-center bg-transparent font-medium focus:outline-none"
                                    readOnly 
                                />
                                <button 
                                    className="p-2 hover:text-orange-500 transition"
                                    onClick={() => dispatch(modifyQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8">
                                <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                                <button 
                                    onClick={() => dispatch(removeToCart(item.id))}
                                    className="text-gray-400 hover:text-red-500 transition"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <button 
                        onClick={() => dispatch(clearCart())}
                        className="text-sm  font-medium mt-4 flex items-center justify-center bg-red-700 p-2 text-white gap-1 rounded-sm hover:bg-red-900"
                    >
                       <span> Clear Cart</span> <Trash2 size={20}/>
                    </button>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-2xl sticky top-8">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
                        <div className="space-y-4 border-b pb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery Fee</span>
                                <span>${deliveryFee.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center py-6">
                            <span className="text-lg font-bold">Total</span>
                            <span className="text-2xl font-extrabold text-orange-600">${(subtotal + deliveryFee).toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all active:scale-[0.98]">
                            Proceed to Checkout
                        </button>
                        <p className="text-center text-xs text-gray-400 mt-4 italic">
                            Secure payment powered by tomato
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;