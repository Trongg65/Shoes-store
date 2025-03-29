import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainMenu from './components/Main/MainMenu';
import BookDetail from './components/PageDetails/BookDetail';
import Footer from './components/Footer/Footer';
function App() {

  return (
    <Router>
      <Routes>
        {/* Group với Header và MenuLeft */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <div className="container mt-1">
                <div className="row">
                  <div className="col-md-12">
                    <MainMenu />
                  </div>
                </div>
              </div>
              <Footer />
            </>
          }
        />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
