import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../services/apiServices';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaHeart, FaShare, FaUserCircle, FaThumbsUp, FaThumbsDown, FaSort, FaReply } from 'react-icons/fa';
import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listProductsDetail, setListProductsDetail] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  // New state variables for reviews
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [reviewsPerPage] = useState(5);
  const [showReplyForm, setShowReplyForm] = useState(null);

  // Mock reviews data with more fields
  const reviews = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      date: "2024-03-15",
      content: "Giày rất đẹp và chất lượng. Đóng gói cẩn thận, giao hàng nhanh. Size vừa vặn, đi rất êm chân. Tôi đã mua size 42 và nó vừa in. Shop tư vấn rất nhiệt tình, sẽ ủng hộ shop dài dài.",
      avatar: "NVA",
      isVerified: true,
      likes: 12,
      dislikes: 1,
      replies: [
        {
          id: 1,
          name: "Shop",
          content: "Cảm ơn bạn đã ủng hộ shop! Chúc bạn hài lòng với sản phẩm.",
          date: "2024-03-15",
          isShop: true
        }
      ]
    },
    {
      id: 2,
      name: "Trần Thị B",
      date: "2024-03-14",
      content: "Sản phẩm tốt, đúng như mô tả. Chỉ có điều giá hơi cao một chút. Nhưng bù lại chất lượng rất tốt nên cũng đáng đồng tiền.",
      avatar: "TTB",
      isVerified: true,
      likes: 8,
      dislikes: 0,
      replies: []
    },
    {
      id: 3,
      name: "Lê Văn C",
      date: "2024-03-13",
      content: "Mẫu mã đẹp, chất liệu tốt. Rất hài lòng với sản phẩm này. Đặc biệt là dịch vụ chăm sóc khách hàng rất tốt.",
      avatar: "LVC",
      isVerified: false,
      likes: 5,
      dislikes: 2,
      replies: []
    }
  ];

  // Sort reviews based on selected option
  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'mostLiked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Get current reviews for pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle like/dislike
  const handleLike = (reviewId, isLike) => {
    toast.success(isLike ? 'Đã thích đánh giá này' : 'Đã bỏ thích đánh giá này');
  };

  // Handle reply
  const handleReply = (reviewId) => {
    setShowReplyForm(showReplyForm === reviewId ? null : reviewId);
  };

  // Submit reply
  const submitReply = (reviewId, replyContent) => {
    if (!replyContent.trim()) {
      toast.error('Vui lòng nhập nội dung trả lời');
      return;
    }
    toast.success('Đã gửi trả lời thành công');
    setShowReplyForm(null);
  };

  useEffect(() => {
    fetchListProductsDetail();
  }, []);

  const fetchListProductsDetail = async () => {
    try {
      setLoading(true);
      let res = await getAllProducts();
      setListProductsDetail(res.DT);
    } catch (err) {
      setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const product = listProductsDetail.find(item => item.id == id);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
        <button
          onClick={fetchListProductsDetail}
          className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500">Sản phẩm không tồn tại!</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  const { name, price, description, brand, sku, color, image } = product;
  const sizes = [38, 39, 40, 41, 42, 43, 44];

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.warning('Vui lòng chọn size giày!');
      return;
    }
    dispatch(addToCart({ product, size: selectedSize }));
    toast.success('Đã thêm sản phẩm vào giỏ hàng!');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.warning('Vui lòng chọn size giày!');
      return;
    }
    dispatch(addToCart({ product, size: selectedSize }));
    navigate('/cart');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Đã sao chép link sản phẩm!');
    }
  };

  return (
    <>
      <Header />
      <div className="product-detail">
      <div className="container">
          <nav className="breadcrumb">
            <ol className="flex items-center space-x-2">
              <li><Link to="/">Trang chủ</Link></li>
            <li>/</li>
              <li><span>Sản phẩm</span></li>
            <li>/</li>
              <li>{name}</li>
          </ol>
        </nav>

        <div className="row">
            <div className="col-md-6">
              <div className="product-image">
                <img src={image} alt={name} className="w-100" />
              </div>
          </div>

            <div className="col-md-6">
              <div className="product-info">
                <div className="d-flex justify-content-between align-items-start">
                  <h1 className="product-title">{name}</h1>
                  <div className="d-flex gap-3">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                      className={`btn btn-light rounded-circle p-2 ${isFavorite ? 'text-danger' : ''}`}
                >
                  <FaHeart size={24} />
                </button>
                <button
                  onClick={handleShare}
                      className="btn btn-light rounded-circle p-2"
                >
                  <FaShare size={24} />
                </button>
              </div>
            </div>

                <div className="product-price">
                  {formatPrice(price)}
                </div>

                <div className="size-selector">
                  <h3 className="size-title">Chọn size giày:</h3>
                  <div className="size-buttons">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                        className={selectedSize === size ? 'selected' : ''}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

                <div className="action-buttons">
              <button
                onClick={handleBuyNow}
                    className="btn btn-buy-now w-100 mb-2"
              >
                Mua ngay
              </button>
              <button
                onClick={handleAddToCart}
                    className="btn btn-add-cart w-100"
              >
                Thêm vào giỏ
              </button>
            </div>

                <div className="product-meta">
                  <div className="meta-item">
                    <span className="label">Thương hiệu:</span>
                    <span className="value">{brand}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">SKU:</span>
                    <span className="value">{sku}</span>
                  </div>
                  <div className="meta-item">
                    <span className="label">Màu sắc:</span>
                    <span className="value">{color}</span>
              </div>
              </div>
              </div>
            </div>
          </div>

          <div className="product-description">
            <h3>Mô tả sản phẩm</h3>
            <p>{description}</p>
          </div>

          <div className="product-reviews">
            <div className="reviews-header">
              <div className="reviews-title">
                <h3>Đánh giá từ khách hàng</h3>
                <span className="total-reviews">{reviews.length} đánh giá</span>
              </div>
              <div className="reviews-sort">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="oldest">Cũ nhất</option>
                  <option value="mostLiked">Nhiều lượt thích</option>
                </select>
              </div>
            </div>

            <div className="reviews-list">
              {currentReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="avatar-wrapper">
                        <div className="avatar">{review.avatar}</div>
                        {review.isVerified && (
                          <div className="verified-badge" title="Đã mua hàng">✓</div>
                        )}
                      </div>
                      <div className="reviewer-details">
                        <div className="name">
                          {review.name}
                          {review.isVerified && (
                            <span className="verified-tag">Đã mua hàng</span>
                          )}
                        </div>
                        <div className="date">
                          {new Date(review.date).toLocaleDateString('vi-VN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="review-content">
                    <p>{review.content}</p>
                    <div className="review-actions">
                      <button 
                        className="btn-action"
                        onClick={() => handleLike(review.id, true)}
                      >
                        <FaThumbsUp /> <span>{review.likes}</span>
                      </button>
                      <button 
                        className="btn-action"
                        onClick={() => handleLike(review.id, false)}
                      >
                        <FaThumbsDown /> <span>{review.dislikes}</span>
                      </button>
                      <button 
                        className="btn-action"
                        onClick={() => handleReply(review.id)}
                      >
                        <FaReply /> Trả lời
                      </button>
                    </div>

                    {/* Reply form */}
                    {showReplyForm === review.id && (
                      <div className="reply-form">
                        <textarea 
                          placeholder="Nhập trả lời của bạn..."
                          rows="3"
                          className="form-control"
                        />
                        <div className="reply-actions">
                          <button 
                            className="btn-cancel"
                            onClick={() => setShowReplyForm(null)}
                          >
                            Hủy
                          </button>
                          <button 
                            className="btn-submit"
                            onClick={() => submitReply(review.id, document.querySelector('textarea').value)}
                          >
                            Gửi
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {review.replies.length > 0 && (
                      <div className="replies-list">
                        {review.replies.map((reply) => (
                          <div key={reply.id} className="reply-item">
                            <div className="reply-header">
                              <strong>{reply.name}</strong>
                              {reply.isShop && <span className="shop-tag">Quản trị viên</span>}
                              <span className="reply-date">
                                {new Date(reply.date).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                            <p>{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {reviews.length > reviewsPerPage && (
              <div className="reviews-pagination">
                {Array.from({ length: Math.ceil(reviews.length / reviewsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}

            <div className="reviews-footer">
              <button className="btn-write-review">
                Viết đánh giá
              </button>
            </div>
          </div>

          {listProductsDetail.filter(item => item.brand === brand && item.id !== id).length > 0 && (
            <div className="related-products">
              <h3>Sản phẩm liên quan</h3>
              <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                {listProductsDetail
                  .filter(item => item.brand === brand && item.id !== id)
                  .slice(0, 4)
                  .map((relatedProduct) => (
                    <div key={relatedProduct.id} className="col">
                      <Link 
                        to={`/product/${relatedProduct.id}`} 
                        className="product-card"
                      >
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="card-img-top"
                        />
                        <div className="card-body">
                          <h5 className="card-title">{relatedProduct.name}</h5>
                          <p className="card-price">
                            {formatPrice(relatedProduct.price)}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
