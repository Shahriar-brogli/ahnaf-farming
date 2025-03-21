// src/app/cart/page.js
'use client';
import { useCart } from '../../context/CartContext';
import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const CartPage = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const productId = searchParams.get('productId');
  const deliveryCharge = 150;

  const products = [
    { id: 1, name: 'গুড় (Molasses)', category: 'Molasses', price: 150, image: '/images/molasses.png' },
    { id: 2, name: 'সরিষার তেল (Mustard Oil)', category: 'Mustard Oil', price: 200, image: '/images/mustard-oil.png' },
    { id: 3, name: 'ঘি (Ghee)', category: 'Ghee', price: 500, image: '/images/ghee.png' },
    { id: 4, name: 'গুঁড়া মসলা (Spices Powder)', category: 'Spices Powder', price: 100, image: '/images/spices.png' },
    { id: 5, name: 'প্রিমিয়াম গুড় (Premium Molasses)', category: 'Molasses', price: 200, image: '/images/premium-molasses.png' },
  ];

  useEffect(() => {
    if (productId) {
      const selectedProduct = products.find((p) => p.id === parseInt(productId));
      if (selectedProduct && !cart.find((item) => item.id === selectedProduct.id)) {
        addToCart(selectedProduct);
      }
    }
  }, [productId, cart, addToCart]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = totalPrice + deliveryCharge;

  const handleProceed = () => {
    router.push('/confirm-order');
  };

  return (
    <div>
      
      <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-6 lg:px-8">
        {/* Centered "Your Cart" Title */}
        <h1 className="text-4xl font-extrabold text-center text-green-800 mb-8">
          Your Cart
        </h1>

        {/* Cart Container */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {cart.length === 0 ? (
            <p className="text-center text-green-800 text-lg">
              Your cart is empty.
            </p>
          ) : (
            <div>
              {/* Cart Items */}
              <ul className="space-y-6">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-green-200"
                      />
                      <div>
                        <span className="text-green-800 font-semibold text-lg">
                          {item.name}
                        </span>
                        <p className="text-green-600 text-sm mt-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-amber-600 font-medium mt-1">
                          ৳ {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-800 font-medium text-sm transition-colors duration-200"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Totals and Proceed Button */}
              <div className="mt-8 border-t border-green-200 pt-6">
                <div className="flex justify-between text-green-800 text-lg">
                  <span>Subtotal:</span>
                  <span>৳ {totalPrice}</span>
                </div>
                <div className="flex justify-between text-green-800 text-lg mt-2">
                  <span>Delivery Charge:</span>
                  <span>৳ {deliveryCharge}</span>
                </div>
                <div className="flex justify-between text-amber-600 font-bold text-xl mt-4">
                  <span>Grand Total:</span>
                  <span>৳ {grandTotal}</span>
                </div>

                {/* Proceed Button */}
                <button
                  onClick={handleProceed}
                  className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                >
                  এগিয়ে যান (Proceed)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;