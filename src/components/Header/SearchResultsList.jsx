import "./SearchResultsList.css";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ results }) => {
  if (!results || results.length === 0) return null;

  return (
    <div className="results-list">
      {results.map((result) => (
        <SearchResult result={result} key={result.id} />
      ))}
    </div>
  );
};
