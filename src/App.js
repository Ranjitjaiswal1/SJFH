import './App.css';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Layout components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Products from './components/Products';
import Updates from './components/Updates';
import Gallery from './components/Gallery';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import Enquiry from './components/Enquiry';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsappButton';
import ScrollToTop from './components/ScrollToTop';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import AdminPage from './pages/AdminPage';

function HomePage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Products />
      <Updates />
      <Gallery />
      <WhyUs />
      <Reviews />
      <Enquiry />
      <Contact />
      <footer className="footer">
        <p>© 2025 Shree Jaiswal Furniture House, Ghorasahan, Bihar. All rights reserved.</p>
      </footer>
      <WhatsAppButton />
      <ScrollToTop />
    </motion.div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  );
}

export default App;
