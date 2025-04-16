import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from "../../services/apiServices";
import { toast } from 'react-toastify';
import './SearchBar.scss';

const SearchBar = ({ setResults, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Fetch all products once when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                if (res.EC === 0) {
                    setAllProducts(res.DT);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Live search as user types
    useEffect(() => {
        if (searchTerm.trim()) {
            const filteredResults = allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(filteredResults);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
            // Reset main menu results when search term is cleared
            if (onSearch) {
                onSearch('');
            }
        }
    }, [searchTerm, allProducts, onSearch]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            toast.warning("Vui lòng nhập từ khóa tìm kiếm");
            return;
        }

        setIsLoading(true);
        try {
            // Filter products based on search term
            const filteredResults = allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredResults.length === 0) {
                toast.info("Không tìm thấy sản phẩm phù hợp");
            }

            // Update main menu results
            if (onSearch) {
                onSearch(searchTerm);
            }

            setShowResults(false);
            navigate('/'); // Navigate to home page to show filtered results
        } catch (error) {
            toast.error("Có lỗi xảy ra khi tìm kiếm");
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
    };

    const handleResultClick = (result) => {
        navigate(`/product/${result.id}`);
        setShowResults(false);
        setSearchTerm('');
        setSearchResults([]);
  };

  return (
        <div className="search-container" ref={searchRef}>
            <form onSubmit={handleSearch} className="search-bar">
          <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    className={isLoading ? 'loading' : ''}
                />
                <button type="submit" className="search-button" disabled={isLoading}>
                    <FaSearch />
          </button>
            </form>

            {showResults && searchResults.length > 0 && (
                <div className={`search-results ${showResults ? 'show' : ''}`}>
                    {searchResults.slice(0, 5).map((result) => (
                        <div
                            key={result.id}
                            className="search-result-item"
                            onClick={() => handleResultClick(result)}
                        >
                            <div className="result-content">
                                <img src={result.image} alt={result.name} className="result-image" />
                                <div className="result-details">
                                    <h4>{result.name}</h4>
                                    <p className="result-price">{result.price.toLocaleString('vi-VN')}đ</p>
                                </div>
                            </div>
                        </div>
                    ))}
        </div>
            )}
    </div>
  );
};

export default SearchBar;
