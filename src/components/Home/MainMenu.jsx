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
        src="https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-8e20-51f7-b0f5-d6a21bf7c77f/raw?se=2025-04-07T04%3A17%3A46Z&sp=r&sv=2024-08-04&sr=b&scid=160a8ed1-2989-56d4-8edb-0cbe208ed476&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-06T07%3A07%3A53Z&ske=2025-04-07T07%3A07%3A53Z&sks=b&skv=2024-08-04&sig=zfiq5IzTbFi33jBTeVqM7CW67T4Xj4Jp%2BMvRg%2BUpRaI%3D"
        className="d-block w-100"
        alt="Poster 1"
        style={{ maxHeight: '500px', objectFit: 'cover',width: '100%' }}
      />
    </div>
    <div className="carousel-item">
      <img
        src="https://sdmntprwestus.oaiusercontent.com/files/00000000-9754-5230-9061-acc14cee0697/raw?se=2025-04-07T04%3A40%3A38Z&sp=r&sv=2024-08-04&sr=b&scid=67adf520-ffbc-5516-bf48-cb89656b3287&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-06T10%3A52%3A41Z&ske=2025-04-07T10%3A52%3A41Z&sks=b&skv=2024-08-04&sig=5v9QkKfgwXe3XXtDXWdhqa8RWa2GgVigdlpmzw6CHYI%3D"
        className="d-block w-100"
        alt="Poster 2"
        style={{ maxHeight: '600px', objectFit: 'cover',width: '100%' }}
      />
    </div>
    <div className="carousel-item">
      <img
        src="https://sdmntpritalynorth.oaiusercontent.com/files/00000000-47e8-5246-bc93-8c4fadbd6f3c/raw?se=2025-04-07T04%3A05%3A29Z&sp=r&sv=2024-08-04&sr=b&scid=6756ecb6-ddd4-50a6-982b-9297f9f411ca&skoid=a3336399-497e-45e5-8f28-4b88ecca3d1f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-06T19%3A21%3A44Z&ske=2025-04-07T19%3A21%3A44Z&sks=b&skv=2024-08-04&sig=Zc88kPHOQifZ4svu2qv4Dr31J6j%2BAwZRsXRqBpQ/e2E%3D"
        className="d-block w-100"
        alt="Poster 3"
        style={{ maxHeight: '500px', objectFit: 'cover',width: '100%'}}
      />
    </div>
  </div>
  {/* Controls */}
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
        <div className="pagination d-flex btn-danger justify-content-center">
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
