import "./SearchResult.css";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const handleClick = () => {
    navigate(`/product/${result.id}`);
  };

  return (
    <div className="search-result" onClick={handleClick}>
      <div className="search-result-content">
        <img 
          src={result.image} 
          alt={result.name} 
          className="search-result-image"
        />
        <div className="search-result-info">
          <div className="search-result-name">{result.name}</div>
          <div className="search-result-price">{formatPrice(result.price)}</div>
        </div>
      </div>
    </div>
  );
};
