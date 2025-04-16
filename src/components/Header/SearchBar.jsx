import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts } from "../../services/apiServices";
import { toast } from 'react-toastify';

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (searchTerm) => {
    setIsSearching(true);
    try {
      const res = await getAllProducts();
      if (res.EC === 0) {
        const filteredResults = res.DT.filter((product) => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredResults.length === 0) {
          toast.info("Không tìm thấy sản phẩm phù hợp");
          setResults([]);
        } else {
          setResults(filteredResults);
        }
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tìm kiếm");
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.warning("Vui lòng nhập từ khóa tìm kiếm");
      return;
    }
    handleSearch(input);
  };

  const handleChange = (value) => {
    setInput(value);
    if (!value.trim()) {
      setResults([]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="form-control mx-3 flex-grow-1" style={{ width: '60%' }}>
      <form className="d-flex flex-grow-1" onSubmit={handleSubmit}>
        <img
          className="mx-2"
          style={{ width: '30px', height: '30px' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Search_Icon.svg/1024px-Search_Icon.svg.png"
          alt="Search Icon"
        />
        {/* Large screen */}
        <div className="input-group d-none d-lg-flex">
          <input
            className="form-control border-0 border-end"
            type="search"
            placeholder="Tìm kiếm giày..."
            aria-label="Search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="text-primary bg-white border-0 border-start" 
            type="submit"
            disabled={isSearching}
          >
            {isSearching ? 'Đang tìm...' : 'Tìm kiếm'}
          </button>
        </div>
        {/* Small screen */}
        <div className="input-group d-flex d-lg-none">
          <input
            className="form-control border-0"
            type="search"
            placeholder="Tìm kiếm giày..."
            aria-label="Search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
