import React from "react";

const Footer = () => {
  return (
    <footer style={{ padding: "40px 20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px", justifyContent: "space-between", maxWidth: "1200px", margin: "auto" }}>
        
        {/* 1. Thông tin liên hệ */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3>📞 Thông tin liên hệ</h3>
          <p>📍 Đại học Thăng Long, Nghiêm Xuân Yêm, Hà Nội</p>
          <p>📱 0999999999</p>
          <p>📧 npt6504@gmail.com</p>
          <p>🕗 Giờ làm việc: 8h - 17h hàng ngày</p>
        </div>

        {/* 2. Giới thiệu */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3>🏪 Về cửa hàng</h3>
          <p>Chuyên sneaker từ phổ thông đến độc lạ.</p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>✅ CS1: Việt Yên, Bắc Giang</li>
            <li>✅ CS2: Lục Nam, Bắc Giang</li>
            <li>✅ CS3: Yên Phong, Bắc Ninh</li>
          </ul>
        </div>

        {/* 3. Chính sách */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3>📋 Chính sách</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>🔁 Đổi/trả: Trong 48h, còn tag và hóa đơn</li>
            <li>🛠️ Bảo hành: 2 tháng với lỗi keo, chỉ</li>
            <li>🚚 Vận chuyển: Freeship từ 500K</li>
            <li>🔒 Bảo mật: Thông tin được giữ kín</li>
          </ul>
        </div>

        {/* 4. Hỗ trợ khách hàng */}
        <div style={{ flex: 1, minWidth: 250 }}>
          <h3>🙋‍♂️ Hỗ trợ khách hàng</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>🛒 Hướng dẫn đặt hàng</li>
            <li>👟 Hướng dẫn chọn size giày</li>
          </ul>
        </div>
      </div>

      <hr style={{ margin: "40px auto", width: "80%", borderColor: "#444" }} />

      {/* 5. Mạng xã hội */}
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <h3>🌐 Mạng xã hội</h3>
        <a href="https://www.facebook.com/profile.php?id=100092984384057" target="_blank" rel="noreferrer" style={{ margin: "0 10px", color: "#3b5998" }}>Facebook</a>
        <a href="#" style={{ margin: "0 10px", color: "#E4405F" }}>Instagram</a>
        <a href="#" style={{ margin: "0 10px", color: "#000000" }}>TikTok</a>
        <a href="#" style={{ margin: "0 10px", color: "red" }}>YouTube</a>
      </div>

      {/* 6. Đăng ký nhận tin */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h3>📬 Đăng ký nhận tin</h3>
        <input type="email" placeholder="Nhập email của bạn..." style={{ padding: 10, width: 250, borderRadius: 5, border: "none", marginRight: 10 }} />
        <button style={{ padding: "10px 20px", backgroundColor: "crimson", color: "#fff", border: "none", borderRadius: 5, cursor: "pointer" }}>
          Đăng ký
        </button>
      </div>

      {/* 7. Thanh toán & giao hàng */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h3>💳 Thanh toán & 🚚 Giao hàng</h3>
        <p>Visa | MasterCard | MoMo | ZaloPay | COD</p>
        <p>GHTK | GHN | Viettel Post</p>
      </div>

      {/* 8. Bản quyền */}
      <div style={{ textAlign: "center", fontSize: 14, color: "#888" }}>
        © 2025 SpiderSneaker Man. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
