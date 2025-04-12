import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { QRCodeSVG } from 'qrcode.react';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [showQR, setShowQR] = useState(false);

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
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const generatePaymentQRData = () => {
    const total = calculateTotal();
    const bankInfo = {
      accountNumber: "0867689783",
      accountName: "PHUNG VAN MINH",
      bankName: "MB BANK",
      amount: total,
      content: `Thanh toan don hang ${Date.now()}`
    };
    
    return `${bankInfo.bankName}|${bankInfo.accountNumber}|${bankInfo.accountName}|${bankInfo.amount}|${bankInfo.content}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <FaShoppingBag className="mx-auto text-gray-400 text-6xl mb-6" />
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-8">Bạn chưa có sản phẩm nào trong giỏ hàng</p>
          <Link
            to="/"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Giỏ hàng của bạn</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex items-center space-x-6 py-6 border-b border-gray-100 last:border-0"
              >
                <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center" style={{ minWidth: '200px', height: '200px' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-lg text-gray-600 mb-2">{formatPrice(item.price)}</p>
                  <p className="text-gray-500 mb-4">Size: {item.size}</p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-black transition-colors"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.size, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-black transition-colors"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-gray-800 mb-4">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id, item.size)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Tổng đơn hàng</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span className="text-green-500 font-medium">Miễn phí</span>
                </div>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-800">Tổng cộng</span>
                    <span className="text-2xl font-bold text-gray-800">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowQR(true)}
                className="w-full bg-red-500 text-white py-4 rounded-xl mt-8 font-medium hover:bg-red-600 transition-colors duration-300"
              >
                Thanh toán ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-8 rounded-2xl max-w-sm w-full">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Quét mã QR để thanh toán</h4>
            <div className="bg-gray-50 p-6 rounded-xl flex justify-center mb-6">
              <QRCodeSVG
                value={generatePaymentQRData()}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Ngân hàng:</span>
                <span className="font-medium text-gray-800">MB BANK</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Số tài khoản:</span>
                <span className="font-medium text-gray-800">0867689783</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Chủ tài khoản:</span>
                <span className="font-medium text-gray-800">PHUNG VAN MINH</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Số tiền:</span>
                <span className="font-medium text-gray-800">{formatPrice(calculateTotal())}</span>
              </div>
            </div>
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 