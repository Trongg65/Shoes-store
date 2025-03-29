import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const BookDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Hàm render các sao đánh giá
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
      <>
        {'★'.repeat(fullStars)}
        {halfStars ? '☆' : ''}
        {'☆'.repeat(emptyStars)}
      </>
    );
  };

  // Component hiển thị đánh giá sao
  const BookRating = ({ rating_average }) => (
    <p>{renderStars(rating_average)}</p>
  );

  // Hàm tăng giảm số lượng
  const handleQuantityChange = (change) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + change));
  };

  // Tính toán tổng giá
  const totalPrice = book ? book.list_price * quantity : 0;

  useEffect(() => {
    const fetchBookDetails = async () => {
      const url = `https://ty4857-8080.csb.app/books/${id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setBook(json);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div>Chờ xíu nhé ✍✍✍</div>;
  }
  if (error) {
    return <div>Lỗi ☹: {error}</div>;
  }

  return (
    <>
      <Header />
      <div className='container mt-4'>
        <div className='row'>
        {/*Sách */}
          <div className='col-lg-3 col-md-6 mb-4 '>
            <div className='border p-3'>
              <div className='card-img-top'>
              {book?.images && book.images.length > 0 && (
              <img src={book.images[0]?.large_url} alt={book.name} className="img-fluid" />
            )}
            <div className='border d-flex '>
              <img src={book?.images[0]?.small_url} alt={book.name} className=" img-fluid w-10" />
              <img src={book?.images[0]?.small_url} alt={book.name} className=" img-fluid w-10 mx-1" />
              <img src={book?.images[0]?.small_url} alt={book.name} className=" img-fluid w-10 mx-1" />
              <img src={book?.images[0]?.small_url} alt={book.name} className=" img-fluid w-10 mx-1" />
              <img src={book?.images[0]?.small_url} alt={book.name} className=" img-fluid w-10 mx-1" />
            </div>
              </div>
              <div className='card-body'>
              <h6>Đặc điểm nổi bật</h6>
            <ul>
              <li><p>Kích thước lớn và bìa cứng, tạo cảm giác sang trọng và bền bỉ.</p></li>
              <li><p>Hình vẽ ngộ nghĩnh và màu sắc sống động, thu hút sự chú ý của trẻ em.</p></li>
              <li><p>Cung cấp thông tin tổng quát về diện tích, dân số và ngôn ngữ của các quốc gia.</p></li>
            </ul>
              </div>
            <div className='bg-light d-flex'>
              <p className='text-secondary'>Xem thêm</p>
              <p>Xem thêm nội dung sách</p>
            </div>
            </div>
          </div>
          {/* Chi tiết sản phẩm */}
          <div className='col-lg-5 col-md-12 mb-4 mx-2 h-100'>
            <div className='border p-3'>
              <div className='d-flex '>
              <img
                style={{ width: "80px", height: "20px" }}
                src="https://salt.tikicdn.com/ts/upload/d7/56/04/b93b8c666e13f49971483596ef14800f.png"
                className="card-img-top mx-3"
                alt="..."
              />
                <p>Tác giả: </p>
                <p className='text-primary ms-2'>
                  {book?.authors && book.authors.length > 0 ? book.authors[0]?.name : 'N/A'}
                </p>
              </div>
              <h5 className='mt-2'>{book?.categories?.name || 'N/A'}</h5>
              <div className='d-flex align-items-center mt-2'>
                <p className='me-2'>{book?.rating_average || 'N/A'}</p>
                <p className='text-warning mx-2'><BookRating rating_average={book?.rating_average || 0} /></p>
                <p className='ms-2'>{book?.quantity_sold?.text || 'N/A'}</p>
              </div>
              <p className='mt-3'>
                <h4>{book?.list_price?.toLocaleString() || '0'} VNĐ</h4>
              </p>
              <p><strong>Thông tin chi tiết</strong></p>
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Công ty phát hành</td>
                    <td>{book?.specifications[0]?.attributes.find(attr => attr.code === 'publisher_vn')?.value || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Ngày xuất bản</td>
                    <td>{book?.specifications[0]?.attributes.find(attr => attr.code === 'publication_date')?.value || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Loại bìa</td>
                    <td>{book?.specifications[0]?.attributes.find(attr => attr.code === 'book_cover')?.value || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Số trang</td>
                    <td>{book?.specifications[0]?.attributes.find(attr => attr.code === 'number_of_page')?.value || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td>Nhà xuất bản</td>
                    <td>{book?.specifications[0]?.attributes.find(attr => attr.code === 'manufacturer')?.value || 'N/A'}</td>
                  </tr>
                </tbody>
              </table>
              <div className='border mt-3 p-3'>
                <p><strong>Mô tả sản phẩm</strong></p>
                <div dangerouslySetInnerHTML={{ __html: book?.description || 'N/A' }} />
              </div>
            </div>
          </div>
          {/* Muaaaaa */}
          <div className='col-lg-3 col-md-6 mb-4 mx-2 h-100'>
            <div className='border p-3'>
              <p className='mx-3'><strong>Số lượng</strong></p>
              <div className='d-flex align-items-center'>
                <button
                  className='btn border me-2'
                  onClick={() => handleQuantityChange(-1)}
                >
                  -
                </button>
                <p className='mx-3 mb-0'>{quantity}</p>
                <button
                  className='btn border ms-2'
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
              <p className='mt-3'><strong>Tạm tính: </strong></p>
              <p><h4>{totalPrice.toLocaleString()} VNĐ</h4></p>
              <div className='list-group'>
                <a href="#" className="list-group-item list-group-item-action text-white bg-danger text-center">Mua ngay</a>
                <a href="#" className="list-group-item list-group-item-action bg-light text-center">Thêm vào giỏ</a>
                <a href="#" className="list-group-item list-group-item-action bg-light text-center">Mua trước trả sau</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetail;
