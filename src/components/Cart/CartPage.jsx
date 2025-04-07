import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId, size) => {
    dispatch(removeFromCart({ productId, size }));
    toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
  };

  const handleUpdateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, size, quantity: newQuantity }));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Giỏ hàng của bạn</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center border-b border-gray-200 py-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">{formatPrice(item.price)}</p>
                <p className="text-gray-600">Size: {item.size}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-4">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                    className="text-gray-600 hover:text-blue-600"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </p>
                <button
                  onClick={() => handleRemoveFromCart(item.id, item.size)}
                  className="text-red-500 hover:text-red-700 mt-2"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Tổng đơn hàng</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Tạm tính:</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
              <div className="flex justify-between">
                <span>Phí vận chuyển:</span>
                <span>Miễn phí</span>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between font-bold">
                  <span>Tổng cộng:</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 