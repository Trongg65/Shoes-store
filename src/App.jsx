import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/Components/Header/Header';
import MainMenu from './assets/Components/Main/MainMenu';
import BookDetail from './assets/Components/PageDetails/BookDetail';
import Footer from './assets/Components/Footer/Footer';
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
                    <MainMenu  />
                  </div>
                </div>
              </div>
              <Footer/>
            </>
          }
        />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
