import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import { useState } from "react"

const trending = [
    { _id: "p2", name: "Luxury Sofa Set", price: 30000, originalPrice: 35000, img: "/sofa.jpeg", category: "Sofa", rating: 4.8, reviews: 42, stock: 3, delivery: "4-6 days", badge: "🔥 Best Seller" },
    { _id: "p1", name: "Modern MDF Bed", price: 25000, originalPrice: 30000, img: "/bed.jpeg", category: "Bed", rating: 4.5, reviews: 28, stock: 5, delivery: "3-5 days", badge: "⭐ Top Rated" },
    { _id: "p8", name: "Premium Wardrobe", price: 26000, originalPrice: 31000, img: "/almari2.jpeg", category: "Almirah", rating: 4.9, reviews: 8, stock: 3, delivery: "6-8 days", badge: "🆕 New" },
    { _id: "p5", name: "Sofa Double Set", price: 28000, originalPrice: 33000, img: "/sofa double.jpeg", category: "Sofa", rating: 4.7, reviews: 24, stock: 2, delivery: "5-7 days", badge: "⚡ Limited" },
]

export default function TrendingProducts() {
    const navigate = useNavigate()
    const { addToCart } = useCart()
    const [toast, setToast] = useState("")

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2000) }

    return (
        <section className="trending-section">
            <motion.div className="section-title"
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}>
                <h2>🔥 Trending Now</h2>
                <p>Most popular furniture this week</p>
                <div className="underline"></div>
            </motion.div>

            <div className="trending-grid">
                {trending.map((p, i) => (
                    <motion.div key={p._id} className="trending-card"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(0,0,0,0.13)" }}>

                        <div className="trending-img" onClick={() => navigate(`/product/${p._id}`, { state: { product: p } })}>
                            <img src={p.img} alt={p.name} />
                            <span className="trending-badge">{p.badge}</span>
                            {p.stock <= 2 && <span className="low-stock-badge">Only {p.stock} left!</span>}
                        </div>

                        <div className="trending-info">
                            <h4 onClick={() => navigate(`/product/${p._id}`, { state: { product: p } })}>{p.name}</h4>
                            <div className="star-rating" style={{ fontSize: '0.9rem' }}>
                                {"★".repeat(Math.floor(p.rating)).split("").map((s, j) => <span key={j} className="star filled">{s}</span>)}
                                <span className="rating-num">{p.rating}</span>
                                <span style={{ color: '#aaa', fontSize: '0.78rem', marginLeft: '4px' }}>({p.reviews})</span>
                            </div>
                            <div className="trending-price-row">
                                <span className="trending-price">₹{p.price.toLocaleString()}</span>
                                <span className="trending-original">₹{p.originalPrice.toLocaleString()}</span>
                                <span className="trending-off">{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}% off</span>
                            </div>
                            <p className="delivery-info">🚚 {p.delivery} delivery</p>
                            <div className="trending-actions">
                                <motion.button className={`btn-addcart ${p.stock === 0 ? "disabled" : ""}`}
                                    disabled={p.stock === 0}
                                    onClick={() => { addToCart({ ...p, images: [p.img] }); showToast(`✅ ${p.name} added to cart!`) }}
                                    whileHover={p.stock > 0 ? { scale: 1.04 } : {}}>
                                    🛒 Add to Cart
                                </motion.button>
                                <motion.button className="buy-now-btn"
                                    disabled={p.stock === 0}
                                    onClick={() => { addToCart({ ...p, images: [p.img] }); navigate('/checkout') }}
                                    whileHover={{ scale: 1.04 }}>
                                    ⚡ Buy Now
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {toast && <motion.div className="toast" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>{toast}</motion.div>}
        </section>
    )
}
