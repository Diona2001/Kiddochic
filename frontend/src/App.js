// src/App.js
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context'; // Updated import
import { ShoppingCartProvider } from './components/ShoppingCartContext';
function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider> 
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-120px)]'>
        <Outlet />
      </main>
      <Footer />
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
