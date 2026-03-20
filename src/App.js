import './App.css';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import CounterStrip from './components/CounterStrip';
import Products from './components/Products';
import Gallery from './components/Gallery';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import Enquiry from './components/Enquiry';
import Contact from './components/Contact';
import WhatsAppButton from './components/WhatsappButton';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <CounterStrip />
      <Products />
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

export default App;
