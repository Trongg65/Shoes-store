import Header from './components/Header/Header';
import MainMenu from './components/Home/MainMenu'
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom'
function App() {

  return (
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


  );
}

export default App;
