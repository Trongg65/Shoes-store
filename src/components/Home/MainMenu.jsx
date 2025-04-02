import React, { useState } from 'react';
import './MainMenu.css';
import { getAllProducts } from '../../services/apiServices';
import { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from '../../redux/counterSlice';
import { Link } from 'react-router-dom'
const MainMenu = () => {
  const [listProducts, setListProducts] = useState([]);
  const [filter, setFilter] = useState(''); // Filter state for shoes
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  //get products
  useEffect(() => {
    fetchListProducts();
  }, []);

  const fetchListProducts = async () => {
    let res = await getAllProducts();
    setListProducts(res)
  }
  console.log("check res: ", listProducts)

  // Constants
  const productsPerPage = 12; // Number of products per page

  // // Sample product data, can be replaced with fetched data later
  // const products = [
  //   { id: 1, name: 'Converse Classic', price: 1200000, brand: 'Converse', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/082/392/543/original/568383_01.jpg.jpeg?action=crop&width=600', sku: 'SD-001', color: 'Black' },
  //   { id: 2, name: 'Vans Old Skool', price: 1400000, brand: 'Vans', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-002', color: 'Blue' },
  //   { id: 3, name: 'Nike Air Max', price: 2500000, brand: 'Nike', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-003', color: 'Red' },
  //   { id: 4, name: 'Adidas UltraBoost', price: 2800000, brand: 'Adidas', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-004', color: 'White' },
  //   { id: 5, name: 'Converse Chuck 70', price: 1350000, brand: 'Converse', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/096/977/182/original/147186_01.jpg.jpeg?action=crop&width=600', sku: 'SD-005', color: 'Green' },
  //   { id: 6, name: 'Vans Authentic', price: 1100000, brand: 'Vans', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-006', color: 'Yellow' },
  //   { id: 7, name: 'Nike Jordan 1', price: 3200000, brand: 'Nike', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-007', color: 'Black/Red' },
  //   { id: 8, name: 'Adidas Superstar', price: 1900000, brand: 'Adidas', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-008', color: 'White/Black' },
  //   { id: 9, name: 'Converse All Star', price: 1250000, brand: 'Converse', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/084/146/672/original/1255_01.jpg.jpeg?action=crop&width=600', sku: 'SD-009', color: 'Red' },
  //   { id: 10, name: 'Vans Slip-On', price: 1200000, brand: 'Vans', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-010', color: 'White/Black' },
  //   { id: 11, name: 'Nike ZoomX', price: 2800000, brand: 'Nike', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-011', color: 'Black' },
  //   { id: 12, name: 'Adidas NMD', price: 2400000, brand: 'Adidas', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-012', color: 'Blue' },
  //   { id: 13, name: 'Converse One Star', price: 1400000, brand: 'Converse', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/015/781/060/original/162569C.png.png?action=crop&width=600', sku: 'SD-013', color: 'Green' },
  //   { id: 14, name: 'Vans Era', price: 1150000, brand: 'Vans', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-014', color: 'Red' },
  //   { id: 15, name: 'Nike Pegasus', price: 2300000, brand: 'Nike', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-015', color: 'Black' },
  //   { id: 16, name: 'Adidas Gazelle', price: 1750000, brand: 'Adidas', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-016', color: 'Yellow' },
  //   { id: 17, name: 'Adidas Superstar', price: 1900000, brand: 'Adidas', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-017', color: 'White' },
  //   { id: 18, name: 'Converse All Star', price: 1250000, brand: 'Converse', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/084/146/672/original/1255_01.jpg.jpeg?action=crop&width=600', sku: 'SD-018', color: 'Black' },
  //   { id: 19, name: 'Vans Slip-On', price: 1200000, brand: 'Vans', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-019', color: 'Blue' },
  //   { id: 20, name: 'Nike ZoomX', price: 2800000, brand: 'Nike', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-020', color: 'Yellow' },
  //   { id: 21, name: 'Adidas NMD', price: 2400000, brand: 'Adidas', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-021', color: 'White' },
  //   { id: 22, name: 'Converse One Star', price: 1400000, brand: 'Converse', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_pictures/images/015/781/060/original/162569C.png.png?action=crop&width=600', sku: 'SD-022', color: 'Black/White' },
  //   { id: 23, name: 'Vans Era', price: 1150000, brand: 'Vans', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-023', color: 'White/Black' },
  //   { id: 24, name: 'Nike Pegasus', price: 2300000, brand: 'Nike', imageUrl: 'https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/079/325/005/original/517878_01.jpg.jpeg?action=crop&width=600', sku: 'SD-024', color: 'Red' }
  // ];

  // Filter products based on selected brand
  const filteredProducts = listProducts.filter((product) =>
    filter ? product.brand.toLowerCase() === filter.toLowerCase() : true
  );

  // Pagination: Get current products for the selected page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>

      <div className="container-fluid">
        {/* Large poster/banner at the top */}
        <div className="poster mb-4">
          <img
            src="https://i.etsystatic.com/38094285/r/il/7c5837/5795459463/il_fullxfull.5795459463_gip8.jpg"
            alt="Poster"
            className="img-fluid"
          />
        </div>

        {/* Filter bar for selecting shoe brands */}
        <div className="container filter-bar mb-4">
          <p>Filter by brand:</p>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Brands</option>
            <option value="Converse">Converse</option>
            <option value="Vans">Vans</option>
            <option value="Nike">Nike</option>
            <option value="Adidas">Adidas</option>
          </select>
        </div>
        <div className='container'>

          <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2">
            {listProducts.map((products, index) => (
              <div key={index} className="col mb-4">
                <Link to={'product/' + products.id} className="card mt-1 border-0 text-decoration-none shadow" style={{ width: '100%' }}>

                  <div className="card h-100">
                    <img
                      src={products.image}
                      className="card-img-top"
                    />

                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{products.name}</h6>
                      <p className="card-text product-price centered-text">
                        <strong>{products.price}$</strong>
                      </p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary w-100">Add to cart</button>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => paginate(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MainMenu;
