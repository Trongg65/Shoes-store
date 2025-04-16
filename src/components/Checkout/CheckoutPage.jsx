import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { FaArrowLeft } from 'react-icons/fa';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [showQR, setShowQR] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    shippingMethod: 'normal', // normal, express
    paymentMethod: 'cod' // cod, prepaid
  });

  const shippingCost = formData.shippingMethod === 'express' ? 20 : 0;

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + shippingCost;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'prepaid') {
      setShowQR(true);
    } else {
      // Xử lý đặt hàng COD
      console.log('Đặt hàng thành công:', formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <FaArrowLeft />
          <span>Quay lại giỏ hàng</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Thông tin đặt hàng</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Họ và tên</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Số điện thoại</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Địa chỉ nhận hàng</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows="3"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Phương thức vận chuyển</label>
                <select
                  name="shippingMethod"
                  value={formData.shippingMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="normal">Giao hàng thường (Miễn phí)</option>
                  <option value="express">Giao hàng hỏa tốc (+$20)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Phương thức thanh toán</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="cod">Thanh toán khi nhận hàng</option>
                  <option value="prepaid">Thanh toán trước</option>
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển</span>
                  <span>{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(calculateTotal())}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-4 rounded-xl font-medium hover:bg-red-600 transition-colors duration-300"
            >
              Đặt hàng
            </button>
          </form>
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

export default CheckoutPage; 