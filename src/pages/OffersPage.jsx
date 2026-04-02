import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsappButton'
import ScrollToTop from '../components/ScrollToTop'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const offers = [
    {
        tag: "🔥 Hot Deal",
        title: "Combo Offer: Bed + Almirah",
        desc: "Get a Modern MDF Bed and Designer Almirah together at a special combo price.",
        original: 47000, price: 40000, saving: 7000,
        img: "/bed.jpeg", validity: "Limited Time"
    },
    {
        tag: "⭐ Best Seller",
        title: "Luxury Sofa Set",
        desc: "Our most popular sofa set — premium fabric, durable frame, perfect for any living room.",
        original: 35000, price: 30000, saving: 5000,
        img: "/sofa.jpeg", validity: "While Stock Lasts"
    },
    {
        tag: "🆕 New Arrival",
        title: "Premium Wardrobe",
        desc: "Brand new large wardrobe with smooth MDF finish and extra storage compartments.",
        original: 30000, price: 26000, saving: 4000,
        img: "/almari2.jpeg", validity: "New Launch Price"
    },
    {
        tag: "💰 Budget Pick",
        title: "Double Sofa",
        desc: "Stylish and affordable double sofa — great quality at an unbeatable price.",
        original: 22000, price: 18000, saving: 4000,
        img: "/doublesofa.jpeg", validity: "Limited Stock"
    },
]

export default function OffersPage() {
    const { addToCart } = useCart()
    const [toast, setToast] = useState('')

    const handleAdd = (offer) => {
        addToCart({ _id: offer.title, name: offer.title, price: offer.price, images: [offer.img] })
        setToast(`✅ ${offer.title} added to cart!`)
        setTimeout(() => setToast(''), 2500)
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <motion.div className="page-hero offers-hero"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.5)), url('/bannner.jpeg')" }}>
                    <motion.div className="offers-hero-badge"
                        animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                        🎉 Special Offers
                    </motion.div>
                    <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        Exclusive Deals & Discounts
                    </motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        Limited time offers on premium MDF furniture — grab them before they're gone!
                    </motion.p>
                </motion.div>

                <section className="offers-section">
                    <div className="offers-grid">
                        {offers.map((offer, i) => (
                            <motion.div key={i} className="offer-card"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.13)" }}>
                                <div className="offer-img-wrap">
                                    <img src={offer.img} alt={offer.title} />
                                    <span className="offer-tag">{offer.tag}</span>
                                    <span className="offer-saving">Save ₹{offer.saving.toLocaleString()}</span>
                                </div>
                                <div className="offer-info">
                                    <h3>{offer.title}</h3>
                                    <p>{offer.desc}</p>
                                    <div className="offer-price-row">
                                        <span className="offer-price">₹{offer.price.toLocaleString()}</span>
                                        <span className="offer-original">₹{offer.original.toLocaleString()}</span>
                                        <span className="offer-discount">
                                            {Math.round((offer.saving / offer.original) * 100)}% OFF
                                        </span>
                                    </div>
                                    <p className="offer-validity">⏰ {offer.validity}</p>
                                    <div className="offer-actions">
                                        <motion.button className="btn-addcart"
                                            onClick={() => handleAdd(offer)}
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                            🛒 Add to Cart
                                        </motion.button>
                                        <motion.a
                                            href={`https://wa.me/919102163272?text=Hi, I'm interested in the offer: ${offer.title} at ₹${offer.price.toLocaleString()}`}
                                            className="btn-whatsapp" target="_blank" rel="noreferrer"
                                            whileHover={{ scale: 1.05 }}>
                                            WhatsApp
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Marketing CTA */}
                    <motion.div className="marketing-cta"
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }} viewport={{ once: true }}>
                        <h2>Can't find what you're looking for?</h2>
                        <p>We make custom furniture to your exact size and design. Contact us and get a free quote!</p>
                        <div className="cta-buttons">
                            <a href="https://wa.me/919102163272?text=Hi, I want a custom furniture quote"
                                className="btn-primary" target="_blank" rel="noreferrer">
                                💬 Get Free Quote
                            </a>
                            <a href="tel:+919102163272" className="btn-outline-dark">📞 Call Now</a>
                        </div>
                    </motion.div>
                </section>
            </div>

            {toast && (
                <motion.div className="toast"
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 40 }}>
                    {toast}
                </motion.div>
            )}

            <WhatsAppButton />
            <ScrollToTop />
        </>
    )
}
