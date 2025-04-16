import React, { useState } from 'react';
import './MainMenu.css';
import { getAllProducts } from '../../services/apiServices';
import { useEffect } from 'react';
import Poster1 from '../../assets/Poster1.png';
import Poster2 from '../../assets/Poster2.png';
import Poster3 from '../../assets/Poster3.png';
import { FaStar } from 'react-icons/fa';

// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from '../../redux/counterSlice';
import { Link } from 'react-router-dom'
const MainMenu = () => {
  const [listProducts, setListProducts] = useState([]);
  const [filter, setFilter] = useState(''); // Filter for brand
  const [priceRange, setPriceRange] = useState('all'); // Filter for price
  const [ratingFilter, setRatingFilter] = useState('all'); // Filter for rating
  const [currentPage, setCurrentPage] = useState(1); // Pagination state

  //get products
  useEffect(() => {
    fetchListProducts();
  }, []);

  const fetchListProducts = async () => {
    let res = await getAllProducts();
    if (res.EC === 0) {
      // Thêm dữ liệu đánh giá giả
      const productsWithRatings = res.DT.map(product => ({
        ...product,
        rating: generateMockRating()
      }));
      setListProducts(productsWithRatings);
    }
  }

 
  const generateMockRating = () => {
 
    return (Math.random() * (5.0 - 3.5) + 3.5).toFixed(1);
  };

  console.log("check res: ", listProducts)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  // Constants
  const productsPerPage = 12; 

  // Price range options
  const priceRanges = {
    all: { min: 0, max: Infinity },
    range1: { min: 0, max: 50 },
    range2: { min: 50, max: 100 },
    range3: { min: 100, max: 200 },
    range4: { min: 200, max: Infinity }
  };


  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "star-filled" : "star-empty"}
          />
        ))}
      </div>
    );
  };

  // Filter products based on all criteria
  const filteredProducts = listProducts.filter((product) => {
    const matchesBrand = filter ? product.brand.toLowerCase() === filter.toLowerCase() : true;
    const matchesPrice = priceRange === 'all' ? true : 
      (product.price >= priceRanges[priceRange].min && product.price < priceRanges[priceRange].max);
    const matchesRating = ratingFilter === 'all' ? true : Math.floor(product.rating) === parseInt(ratingFilter);
    
    return matchesBrand && matchesPrice && matchesRating;
  });

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
        {/* Carousel với Bootstrap data attributes */}
        <div id="posterCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#posterCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#posterCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#posterCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img
                src={Poster1}
                className="d-block w-100"
                alt="Poster 1"
                style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src={Poster2}
                className="d-block w-100"
                alt="Poster 2"
                style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
              />
            </div>
            <div className="carousel-item" data-bs-interval="3000">
              <img
                src={Poster3}
                className="d-block w-100"
                alt="Poster 3"
                style={{ maxHeight: '500px', objectFit: 'cover', width: '100%' }}
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

        {/* Enhanced filter section */}
        <div className="container filter-bar mb-4">
          <div className="row">
            <div className="col-md-4 mb-3">
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
            <div className="col-md-4 mb-3">
              <p>Filter by price:</p>
              <select
                className="form-select"
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
              >
                <option value="all">All Prices</option>
                <option value="range1">$0 - $50</option>
                <option value="range2">$50 - $100</option>
                <option value="range3">$100 - $200</option>
                <option value="range4">$200+</option>
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <p>Filter by rating:</p>
              <select
                className="form-select"
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
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
                      alt={products.name}
                    />
                    <div className="card-body d-flex flex-column">
                      <h6 className="card-title">{products.name}</h6>
                      <p className="card-text product-price centered-text">
                        <strong>{formatPrice(products.price)}</strong>
                      </p>
                      <div className="product-rating">
                        <StarRating rating={parseFloat(products.rating)} />
                        <span className="rating-text">({products.rating})</span>
                      </div>
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
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default MainMenu;
