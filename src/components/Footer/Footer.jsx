import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Thông tin cửa hàng */}
          <div>
            <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
            <p className="text-gray-600 mb-4">
              Chuyên cung cấp các sản phẩm giày sneaker chính hãng với chất lượng tốt nhất.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600 transition-colors">
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Liên kết nhanh */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Chính sách */}
          <div>
            <h3 className="text-xl font-bold mb-4">Chính sách</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link to="/return" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Điều khoản sử dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Thông tin liên hệ */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>123 Đường ABC, Quận XYZ, TP.HCM</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span>
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">✉️</span>
                <span>contact@sneakerstore.com</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2">⏰</span>
                <span>9:00 - 21:00 (T2 - CN)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Phần thanh toán */}
        <div className="mt-12 pt-8 border-t border-gray-300">
          <h3 className="text-xl font-bold mb-4">Phương thức thanh toán</h3>
          <div className="flex flex-wrap gap-4">
            <img 
              src="https://salt.tikicdn.com/ts/upload/67/de/1e/90e54b0a7a59948dd7ba39d7d6c6225f.png" 
              alt="Visa" 
              className="h-8"
            />
            <img 
              src="https://salt.tikicdn.com/ts/upload/6a/0e/21/0a0f5a5f1f4d2c2b0e0a0f5a5f1f4d2c.png" 
              alt="Mastercard" 
              className="h-8"
            />
            <img 
              src="https://salt.tikicdn.com/ts/upload/6a/0e/21/0a0f5a5f1f4d2c2b0e0a0f5a5f1f4d2c.png" 
              alt="JCB" 
              className="h-8"
            />
            <img 
              src="https://salt.tikicdn.com/ts/upload/6a/0e/21/0a0f5a5f1f4d2c2b0e0a0f5a5f1f4d2c.png" 
              alt="Momo" 
              className="h-8"
            />
            <img 
              src="https://salt.tikicdn.com/ts/upload/6a/0e/21/0a0f5a5f1f4d2c2b0e0a0f5a5f1f4d2c.png" 
              alt="ZaloPay" 
              className="h-8"
            />
          </div>
        </div>

        {/* Bản quyền */}
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-gray-500">
          <p>© 2024 Sneaker Store. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;