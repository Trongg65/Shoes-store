import Header from './components/Header/Header';
import MainMenu from './components/Home/MainMenu'
import Footer from './components/Footer/Footer';
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <>
      <Header />
      <MainMenu />
      <Footer />
    </>


  );
}

export default App;
