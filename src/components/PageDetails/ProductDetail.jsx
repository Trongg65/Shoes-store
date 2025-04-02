import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { getAllProducts } from '../../services/apiServices';
const ProductDetail = (props) => {
  const { id } = useParams(); // Lấy ID từ URL
  const [listProductsDetail, setListProductsDetail] = useState([]);
  //get products
  useEffect(() => {
    fetchListProductsDetail();
  }, []);

  const fetchListProductsDetail = async () => {
    let res = await getAllProducts();
    setListProductsDetail(res)
  }
  console.log('check product: ', listProductsDetail)

  const product = listProductsDetail.find(item => item.id == id)
  console.log('check id: ', product)



  return (
    <>
      <Header />
      <Footer />
    </>
  );
};

export default ProductDetail;
