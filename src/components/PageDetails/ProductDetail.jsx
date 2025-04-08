import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../services/apiServices';
import { Modal } from 'bootstrap';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [listProductsDetail, setListProductsDetail] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  // Lấy danh sách sản phẩm
  useEffect(() => {
    fetchListProductsDetail();
  }, []);

  const fetchListProductsDetail = async () => {
    let res = await getAllProducts();
    setListProductsDetail(res);
  };

  const product = listProductsDetail.find(item => item.id == id);

  // Kiểm tra nếu sản phẩm không tồn tại
  if (!product) {
    return <p className="text-center text-red-500">Sản phẩm không tồn tại!</p>;
  }

  // Lấy dữ liệu từ backend
  const { name, price, description, image } = product;

  // Danh sách size giày (tạo thủ công)
  const sizes = [38, 39, 40, 41, 42, 43, 44];

  return (
    <>
      <Header />
      <div className="container">
        <div className="row ">
          {/* Hình ảnh sản phẩm */}
          <div className="flex justify-center p-4 col-md-8 ">
            {/* <img  
              src={image}
              alt="Ảnh sản phẩm"
              className="w-full h-auto rounded-lg shadow-lg"
            /> */}
            <img src='https://sneakerdaily.vn/wp-content/uploads/2024/08/Giay-Air-Jordan-1-Low-OG-Mocha-CZ0790-102.jpg' style={{ maxWidth: '450px', height: 'auto' }}></img>
          </div>

          {/* Thông tin sản phẩm */}
          <div className="col-md-4  ">
            <h2 className="text-5xl font-bold">{name}</h2>
            <p className=" text-2xl text-red-500 font-semibold ">Giá: {price} VND</p>

            {/* Chọn size giày */}
            <div className="mt-3">
              <h3 className="text-lg font-semibold mb-2">Chọn size giày:</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-lg border transition ${selectedSize === size
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-black'
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
            <div className="mt-4 border-b border-gray-200 pb-7">
              <button className="w-full bg-red-500 text-white py-3 rounded-lg text-lg font-bold">Mua ngay</button>
              <button className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-bold mt-2">Thêm vào giỏ</button>
            </div>
            {/*Thông tin chi tiết */}
            <div className=' mt-3'>
              <div className="d-flex m-1 mt-2">
                <p className="w-20 mb-0 ">Brand:</p>
                <h5 className=" mb-0">{product?.brand}</h5>
              </div>
              <div className="d-flex m-1 mt-2 ">
                <p className="w-20 mb-0 ">Sku:</p>
                <h5 className=" mb-0">{product?.sku}</h5>
              </div>
              <div className="d-flex m-1 mt-2">
                <p className="w-20 mb-0 ">Color:</p>
                <h5 className=" mb-0">{product?.color}</h5>
              </div>
            </div>



          </div>
          {/* Mô tả sản phẩm */}
          <div className="mt-4  border-t border-gray-250 ">
            <div className="flex flex-wrap gap-2 mt-3 mx-md-5">

              <h3 className="text-lg font-semibold mb-1">Mô tả sản phẩm:</h3>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>

          {/*Lựa chọn*/}
          <div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
