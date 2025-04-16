import React, { useState } from 'react';
import './MainMenu.css';
import { getAllProducts } from '../../services/apiServices';
import { useEffect } from 'react';
import Poster1 from '../../assets/Poster1.png';
import Poster2 from '../../assets/Poster2.png';
import Poster3 from '../../assets/Poster3.png';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom'

// import { useSelector, useDispatch } from 'react-redux';
// import { increment, decrement, incrementByAmount } from '../../redux/counterSlice';

const MainMenu = () => {
  const [listProducts, setListProducts] = useState([]);
  const [filter, setFilter] = useState(''); // Filter for brand
  const [priceRange, setPriceRange] = useState('all'); // Filter for price
  const [ratingFilter, setRatingFilter] = useState('all'); // Filter for rating
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [searchKeyword, setSearchKeyword] = useState(''); // Search keyword state

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

  // Handle search from header
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter products based on all criteria including search
  const filteredProducts = listProducts.filter((product) => {
    const matchesBrand = filter ? product.brand.toLowerCase() === filter.toLowerCase() : true;
    const matchesPrice = priceRange === 'all' ? true : 
      (product.price >= priceRanges[priceRange].min && product.price < priceRanges[priceRange].max);
    const matchesRating = ratingFilter === 'all' ? true : Math.floor(product.rating) === parseInt(ratingFilter);
    const matchesSearch = searchKeyword ? 
      product.name.toLowerCase().includes(searchKeyword.toLowerCase()) : true;
    
    return matchesBrand && matchesPrice && matchesRating && matchesSearch;
  });

  // Pagination: Get current products for the selected page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Reset filters
  const resetFilters = () => {
    setFilter('');
    setPriceRange('all');
    setRatingFilter('all');
    setSearchKeyword('');
    setCurrentPage(1);
  };

  return (
    <>
      <div className="container-fluid">
        {/* Enhanced Carousel */}
        <div id="posterCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-touch="true">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#posterCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#posterCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#posterCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="5000">
              <img
                src={Poster1}
                className="d-block w-100"
                alt="New Collection"
                loading="lazy"
              />

            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src={Poster2}
                className="d-block w-100"
                alt="Special Offers"
                loading="lazy"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2>Special Offers</h2>
                <p>Get up to 30% off on selected items</p>
              </div>
            </div>
            <div className="carousel-item" data-bs-interval="5000">
              <img
                src={Poster3}
                className="d-block w-100"
                alt="Premium Collection"
                loading="lazy"
              />
              <div className="carousel-caption d-none d-md-block">
                <h2>Premium Collection</h2>
                <p>Experience luxury and comfort</p>
              </div>
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

        {/* Filter section */}
        <div className="container filter-bar mb-4">
          <div className="row align-items-end">
            <div className="col-md-3 mb-3">
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
            <div className="col-md-3 mb-3">
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
            <div className="col-md-3 mb-3">
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
            <div className="col-md-3 mb-3">
              <button 
                className="btn btn-secondary w-100" 
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products grid */}
        <div className='container'>
          {filteredProducts.length === 0 ? (
            <div className="text-center my-5">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          ) : (
            <div className="row row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2">
              {currentProducts.map((product, index) => (
                <div key={index} className="col mb-4">
                  <Link to={`product/${product.id}`} className="card mt-1 border-0 text-decoration-none shadow" style={{ width: '100%' }}>
                    <div className="card h-100">
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body d-flex flex-column">
                        <h6 className="card-title">{product.name}</h6>
                        <p className="card-text product-price centered-text">
                          <strong>{formatPrice(product.price)}</strong>
                        </p>
                        <div className="product-rating">
                          <StarRating rating={parseFloat(product.rating)} />
                          <span className="rating-text">({product.rating})</span>
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
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4 mb-4">
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
