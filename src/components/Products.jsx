import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"

const products = [
    { _id: "p1", name: "Modern MDF Bed", price: 25000, img: "/bed.jpeg", desc: "Elegant king-size bed with premium MDF finish", category: "Bed", rating: 4.5, reviews: 28, stock: 5, delivery: "3-5 days" },
    { _id: "p2", name: "Luxury Sofa Set", price: 30000, img: "/sofa.jpeg", desc: "Comfortable 3-seater sofa with premium fabric", category: "Sofa", rating: 4.8, reviews: 42, stock: 3, delivery: "4-6 days" },
    { _id: "p3", name: "Double Sofa", price: 18000, img: "/doublesofa.jpeg", desc: "Stylish double sofa perfect for living rooms", category: "Sofa", rating: 4.3, reviews: 19, stock: 8, delivery: "3-5 days" },
    { _id: "p4", name: "Bed with Headboard", price: 22000, img: "/bed head.jpeg", desc: "Designer bed with cushioned headboard", category: "Bed", rating: 4.6, reviews: 31, stock: 4, delivery: "4-6 days" },
    { _id: "p5", name: "Sofa Double Set", price: 28000, img: "/sofa double.jpeg", desc: "Premium double sofa set for large spaces", category: "Sofa", rating: 4.7, reviews: 24, stock: 2, delivery: "5-7 days" },
    { _id: "p6", name: "MDF Almirah", price: 20000, img: "/almari.jpeg", desc: "Spacious wardrobe with smooth MDF finish", category: "Almirah", rating: 4.4, reviews: 16, stock: 6, delivery: "5-7 days" },
    { _id: "p7", name: "Designer Almirah", price: 22000, img: "/almari1.jpeg", desc: "Elegant almirah with mirror and storage", category: "Almirah", rating: 4.5, reviews: 12, stock: 0, delivery: "5-7 days" },
    { _id: "p8", name: "Premium Wardrobe", price: 26000, img: "/almari2.jpeg", desc: "Large premium wardrobe for bedroom storage", category: "Almirah", rating: 4.9, reviews: 8, stock: 3, delivery: "6-8 days" },
]

const categories = ["All", "Bed", "Sofa", "Almirah"]

function StarRating({ rating }) {
    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map(s => (
                <span key={s} className={s <= Math.floor(rating) ? "star filled" : s - 0.5 <= rating ? "star half" : "star"}>★</span>
            ))}
            <span className="rating-num">{rating}</span>
        </div>
    )
}

export default function Products() {
    const [lightbox, setLightbox] = useState(null)
    const [activeCategory, setActiveCategory] = useState("All")
    const [sortBy, setSortBy] = useState("default")
    const [toast, setToast] = useState("")
    const [recentlyViewed, setRecentlyViewed] = useState([])
    const { addToCart } = useCart()
    const { toggle, isWishlisted } = useWishlist()

    let filtered = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory)

    if (sortBy === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price)
    else if (sortBy === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price)
    else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating)

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500) }

    const handleAddToCart = (p) => {
        if (p.stock === 0) return
        addToCart({ ...p, images: [p.img] })
        showToast(`✅ ${p.name} added to cart!`)
    }

    const handleView = (p) => {
        setLightbox(p)
        setRecentlyViewed(prev => {
            const filtered = prev.filter(i => i._id !== p._id)
            return [p, ...filtered].slice(0, 4)
        })
    }

    return (
        <section id="products" className="products">
            <motion.div className="section-title"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }} viewport={{ once: true }}>
                <h2>Our Furniture Collection</h2>
                <p>Quality MDF furniture crafted with precision and care</p>
                <div className="underline"></div>
            </motion.div>

            {/* Filter + Sort Bar */}
            <div className="products-toolbar">
                <div className="category-filter">
                    {categories.map(cat => (
                        <motion.button key={cat}
                            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
                            onClick={() => setActiveCategory(cat)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            {cat}
                        </motion.button>
                    ))}
                </div>
                <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="default">Sort: Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                </select>
            </div>

            <p className="results-count">{filtered.length} products found</p>

            <div className="products-grid">
                <AnimatePresence>
                    {filtered.map((p, i) => (
                        <motion.div key={p._id} className="product-card"
                            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: i * 0.07 }}
                            whileHover={{ y: -6, boxShadow: "0 20px 50px rgba(0,0,0,0.13)" }}>

                            <div className="product-img-wrap" onClick={() => handleView(p)}>
                                <motion.img src={p.img} alt={p.name} whileHover={{ scale: 1.06 }} transition={{ duration: 0.4 }} />
                                <div className="img-overlay">🔍 Quick View</div>
                                <span className="product-category-tag">{p.category}</span>
                                {p.stock === 0 && <span className="out-of-stock-badge">Out of Stock</span>}
                                {p.stock > 0 && p.stock <= 3 && <span className="low-stock-badge">Only {p.stock} left!</span>}
                            </div>

                            {/* Wishlist button */}
                            <motion.button
                                className={`wishlist-btn ${isWishlisted(p._id) ? "wishlisted" : ""}`}
                                onClick={() => { toggle(p); showToast(isWishlisted(p._id) ? `💔 Removed from wishlist` : `❤️ Added to wishlist`) }}
                                whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                                {isWishlisted(p._id) ? "❤️" : "🤍"}
                            </motion.button>

                            <div className="product-info">
                                <h3>{p.name}</h3>
                                <StarRating rating={p.rating} />
                                <p className="review-count">{p.reviews} reviews</p>
                                <p className="product-desc">{p.desc}</p>
                                <div className="price-row">
                                    <span className="product-price">₹{p.price.toLocaleString()}</span>
                                </div>
                                <p className="delivery-info">🚚 Delivery in {p.delivery}</p>
                                <div className="product-actions">
                                    <motion.button
                                        className={`btn-addcart ${p.stock === 0 ? "disabled" : ""}`}
                                        onClick={() => handleAddToCart(p)}
                                        disabled={p.stock === 0}
                                        whileHover={p.stock > 0 ? { scale: 1.05 } : {}}
                                        whileTap={p.stock > 0 ? { scale: 0.95 } : {}}>
                                        {p.stock === 0 ? "Out of Stock" : "🛒 Add to Cart"}
                                    </motion.button>
                                    <motion.a
                                        href={`https://wa.me/919102163272?text=Hi, I'm interested in ${p.name} (₹${p.price.toLocaleString()})`}
                                        className="btn-whatsapp" target="_blank" rel="noreferrer"
                                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        WhatsApp
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Recently Viewed */}
            {recentlyViewed.length > 0 && (
                <motion.div className="recently-viewed"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <h3>Recently Viewed</h3>
                    <div className="rv-grid">
                        {recentlyViewed.map(p => (
                            <div key={p._id} className="rv-item" onClick={() => handleView(p)}>
                                <img src={p.img} alt={p.name} />
                                <p>{p.name}</p>
                                <span>₹{p.price.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div className="toast"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}>
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Lightbox */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div className="lightbox-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setLightbox(null)}>
                        <motion.div className="lightbox-content"
                            initial={{ scale: 0.75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.75, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 22 }}
                            onClick={e => e.stopPropagation()}>
                            <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
                            <img src={lightbox.img} alt={lightbox.name} />
                            <div className="lightbox-info">
                                <h3>{lightbox.name}</h3>
                                <StarRating rating={lightbox.rating} />
                                <p style={{ color: '#777', fontSize: '0.88rem', margin: '8px 0' }}>{lightbox.desc}</p>
                                <span className="product-price">₹{lightbox.price.toLocaleString()}</span>
                                <p className="delivery-info" style={{ marginTop: '8px' }}>🚚 Delivery in {lightbox.delivery}</p>
                                <p style={{ fontSize: '0.82rem', color: lightbox.stock === 0 ? '#e53935' : '#4caf50', fontWeight: 700, marginTop: '6px' }}>
                                    {lightbox.stock === 0 ? "❌ Out of Stock" : `✅ In Stock (${lightbox.stock} available)`}
                                </p>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                                    <button className={`btn-addcart ${lightbox.stock === 0 ? "disabled" : ""}`}
                                        disabled={lightbox.stock === 0}
                                        onClick={() => { handleAddToCart(lightbox); setLightbox(null) }}>
                                        🛒 Add to Cart
                                    </button>
                                    <a href={`https://wa.me/919102163272?text=Hi, I'm interested in ${lightbox.name} (₹${lightbox.price.toLocaleString()})`}
                                        className="btn-whatsapp" target="_blank" rel="noreferrer">
                                        WhatsApp Order
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
