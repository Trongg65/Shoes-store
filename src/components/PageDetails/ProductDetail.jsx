import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../services/apiServices';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaHeart, FaShare } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [listProductsDetail, setListProductsDetail] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

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
      <div className="container">
        {/* Breadcrumb */}
        <nav className="py-4">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-blue-500">Trang chủ</Link></li>
            <li>/</li>
            <li><span className="hover:text-blue-500">Sản phẩm</span></li>
            <li>/</li>
            <li className="text-gray-700">{name}</li>
          </ol>
        </nav>

        <div className="row">
          {/* Hình ảnh sản phẩm */}
          <div className="flex justify-center p-4 col-md-8">
            <img
              src={image}
              alt={name}
              style={{ maxWidth: '450px', height: 'auto' }}
            />
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-md-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-5xl font-bold">{name}</h2>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:bg-gray-100`}
                >
                  <FaHeart size={24} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full text-gray-400 hover:bg-gray-100"
                >
                  <FaShare size={24} />
                </button>
              </div>
            </div>
            <p className="text-2xl text-red-500 font-semibold mb-6">
              Giá: {price.toLocaleString('vi-VN')} VND
            </p>

            {/* Chọn size giày */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Chọn size giày:</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition-all duration-200 ${selectedSize === size
                      ? 'bg-blue-500 text-white border-blue-500 transform scale-105'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-500 hover:text-blue-500'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize && (
                <p className="mt-2 text-lg">
                  Size: <strong>{selectedSize}</strong>
                </p>
              )}
            </div>

            {/* Nút Mua hàng */}
            <div className="mb-6 border-b border-gray-200 pb-7">
              <button
                className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-bold hover:bg-red-600 transition-colors duration-200"
              >
                Mua ngay
              </button>
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-bold mt-2 hover:bg-blue-600 transition-colors duration-200"
              >
                Thêm vào giỏ
              </button>
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-3">
              <div className="flex">
                <p className="w-20 text-gray-600">Brand:</p>
                <p className="font-medium">{brand}</p>
              </div>
              <div className="flex">
                <p className="w-20 text-gray-600">SKU:</p>
                <p className="font-medium">{sku}</p>
              </div>
              <div className="flex">
                <p className="w-20 text-gray-600">Màu sắc:</p>
                <p className="font-medium">{color}</p>
              </div>
            </div>
          </div>

          {/* Mô tả sản phẩm */}
          <div className="col-12 mt-8 border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-semibold mb-4">Mô tả sản phẩm</h3>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
