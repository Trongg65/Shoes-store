import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaStore, FaExchangeAlt, FaTools, FaTruck, FaLock, FaShoppingCart, FaShoePrints, FaCreditCard } from "react-icons/fa";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* 1. Thông tin liên hệ */}
        <div className="footer-section">
          <h3 className="section-title">
            <FaPhone className="section-icon" />
            Thông tin liên hệ
          </h3>
          <div className="contact-info">
            <p>
              <FaMapMarkerAlt className="info-icon" />
              <span>Đại học Thăng Long, Nghiêm Xuân Yêm, Hà Nội</span>
            </p>
            <p>
              <FaPhone className="info-icon" />
              <span>0999999999</span>
            </p>
            <p>
              <FaEnvelope className="info-icon" />
              <span>npt6504@gmail.com</span>
            </p>
            <p>
              <FaClock className="info-icon" />
              <span>Giờ làm việc: 8h - 17h hàng ngày</span>
            </p>
          </div>
        </div>

        {/* 2. Giới thiệu */}
        <div className="footer-section">
          <h3 className="section-title">
            <FaStore className="section-icon" />
            Về cửa hàng
          </h3>
          <p className="store-description">Chuyên sneaker từ phổ thông đến độc lạ.</p>
          <ul className="store-list">
            <li>
              <span className="check-icon">✓</span>
              CS1: Việt Yên, Bắc Giang
            </li>
            <li>
              <span className="check-icon">✓</span>
              CS2: Lục Nam, Bắc Giang
            </li>
            <li>
              <span className="check-icon">✓</span>
              CS3: Yên Phong, Bắc Ninh
            </li>
          </ul>
        </div>

        {/* 3. Chính sách */}
        <div className="footer-section">
          <h3 className="section-title">
            <FaCreditCard className="section-icon" />
            Chính sách
          </h3>
          <ul className="policy-list">
            <li>
              <FaExchangeAlt className="policy-icon" />
              <span>Đổi/trả: Trong 48h, còn tag và hóa đơn</span>
            </li>
            <li>
              <FaTools className="policy-icon" />
              <span>Bảo hành: 2 tháng với lỗi keo, chỉ</span>
            </li>
            <li>
              <FaTruck className="policy-icon" />
              <span>Vận chuyển: Freeship từ 500K</span>
            </li>
            <li>
              <FaLock className="policy-icon" />
              <span>Bảo mật: Thông tin được giữ kín</span>
            </li>
          </ul>
        </div>

        {/* 4. Hỗ trợ khách hàng */}
        <div className="footer-section">
          <h3 className="section-title">
            <FaShoppingCart className="section-icon" />
            Hỗ trợ khách hàng
          </h3>
          <ul className="support-list">
            <li>
              <FaShoppingCart className="support-icon" />
              <span>Hướng dẫn đặt hàng</span>
            </li>
            <li>
              <FaShoePrints className="support-icon" />
              <span>Hướng dẫn chọn size giày</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-divider"></div>

      {/* 5. Mạng xã hội */}
      <div className="social-section">
        <h3 className="social-title">Kết nối với chúng tôi</h3>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=100092984384057" target="_blank" rel="noreferrer" className="social-icon facebook">
            <FaFacebook />
          </a>
          <a href="#" className="social-icon instagram">
            <FaInstagram />
          </a>
          <a href="#" className="social-icon tiktok">
            <FaTiktok />
          </a>
          <a href="#" className="social-icon youtube">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* 6. Đăng ký nhận tin */}
      <div className="newsletter-section">
        <h3 className="newsletter-title">Đăng ký nhận tin</h3>
        <div className="newsletter-form">
          <input 
            type="email" 
            placeholder="Nhập email của bạn..." 
            className="newsletter-input" 
          />
          <button className="newsletter-button">
            Đăng ký
          </button>
        </div>
      </div>

      {/* 7. Thanh toán & giao hàng */}
      <div className="payment-section">
        <h3 className="payment-title">Phương thức thanh toán & giao hàng</h3>
        <div className="payment-methods">
          <div className="payment-group">
            <span className="payment-label">Thanh toán:</span>
            <span className="payment-value">Visa | MasterCard | MoMo | ZaloPay | COD</span>
          </div>
          <div className="payment-group">
            <span className="payment-label">Giao hàng:</span>
            <span className="payment-value">GHTK | GHN | Viettel Post</span>
          </div>
        </div>
      </div>

      {/* 8. Bản quyền */}
      <div className="copyright">
        © 2025 SpiderSneaker Man. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;