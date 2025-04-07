import React, { useState } from 'react';
import './MainMenu.css';
import { getAllProducts } from '../../services/apiServices';
import { useEffect } from 'react';
import Poster1 from '../../assets/Poster1.png';
import Poster2 from '../../assets/Poster2.png';
import Poster3 from '../../assets/Poster3.png';


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
        <div id="posterCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img
        src={Poster1}
        className="d-block w-100"
        alt="Poster 1"
        style={{ maxHeight: '500px', objectFit: 'cover',width: '100%' }}
      />
    </div>
    <div className="carousel-item">
      <img
        src={Poster2}
        className="d-block w-100"
        alt="Poster 2"
        style={{ maxHeight: '590px', objectFit: 'cover',width: '100%' }}
      />
    </div>
    <div className="carousel-item">
      <img
        src={Poster3}
        className="d-block w-100"
        alt="Poster 3"
        style={{ maxHeight: '550px', objectFit: 'cover',width: '100%'}}
      />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#posterCarousel" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#posterCarousel" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
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
            {currentProducts.map((products, index) => (
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
                      <button className="btn btn-danger w-100">See more details</button>
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
