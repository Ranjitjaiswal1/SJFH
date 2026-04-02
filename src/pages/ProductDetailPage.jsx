import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsappButton'
import ScrollToTop from '../components/ScrollToTop'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const PINCODES = { '845303': 'Ghorasahan', '845304': 'Motihari', '845401': 'Raxaul', '800001': 'Patna' }

const EMI_PLANS = [
    { months: 3, rate: 0 },
    { months: 6, rate: 1 },
    { months: 12, rate: 1.5 },
]

function StarRating({ rating, size = '1rem' }) {
    return (
        <div className="star-rating" style={{ fontSize: size }}>
            {[1,2,3,4,5].map(s => (
                <span key={s} className={s <= Math.floor(rating) ? 'star filled' : s - 0.5 <= rating ? 'star half' : 'star'}>★</span>
            ))}
            <span className="rating-num">{rating}</span>
        </div>
    )
}

export default function ProductDetailPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const product = location.state?.product
    const { addToCart } = useCart()
    const { toggle, isWishlisted } = useWishlist()

    const [activeImg, setActiveImg] = useState(0)
    const [pincode, setPincode] = useState('')
    const [deliveryInfo, setDeliveryInfo] = useState(null)
    const [showEMI, setShowEMI] = useState(false)
    const [qty, setQty] = useState(1)
    const [toast, setToast] = useState('')
    const [zoom, setZoom] = useState(false)

    if (!product) return (
        <div className="empty-page">
            <h2>Product not found</h2>
            <button className="btn-primary" onClick={() => navigate('/')}>Go Home</button>
        </div>
    )

    const images = product.images?.length ? product.images : [product.img]

    const checkPincode = () => {
        const area = PINCODES[pincode]
        if (area) setDeliveryInfo({ available: true, area, days: pincode === '845303' ? '1-2' : '3-5' })
        else setDeliveryInfo({ available: false })
    }

    const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

    const handleAddToCart = () => {
        for (let i = 0; i < qty; i++) addToCart({ ...product, images })
        showToast(`✅ ${product.name} (×${qty}) added to cart!`)
    }

    const handleBuyNow = () => {
        addToCart({ ...product, images })
        navigate('/checkout')
    }

    const emiAmount = (months, rate) => {
        const total = product.price * (1 + (rate * months) / 100)
        return Math.round(total / months)
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                <div className="product-detail-page">
                    {/* Breadcrumb */}
                    <div className="breadcrumb">
                        <a href="/">Home</a> › <a href="/#products">Products</a> › <span>{product.name}</span>
                    </div>

                    <div className="pd-inner">
                        {/* Left: Images */}
                        <div className="pd-images">
                            <div className="pd-thumbnails">
                                {images.map((img, i) => (
                                    <motion.div key={i}
                                        className={`pd-thumb ${activeImg === i ? 'active' : ''}`}
                                        onClick={() => setActiveImg(i)}
                                        whileHover={{ scale: 1.05 }}>
                                        <img src={img} alt={`${product.name} ${i+1}`} />
                                    </motion.div>
                                ))}
                            </div>
                            <div className="pd-main-img" onClick={() => setZoom(true)}>
                                <motion.img
                                    key={activeImg}
                                    src={images[activeImg]}
                                    alt={product.name}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="zoom-hint">🔍 Click to zoom</span>
                                <motion.button
                                    className={`wishlist-btn ${isWishlisted(product._id) ? 'wishlisted' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); toggle(product) }}
                                    whileHover={{ scale: 1.2 }}>
                                    {isWishlisted(product._id) ? '❤️' : '🤍'}
                                </motion.button>
                            </div>

                            {/* Action buttons below image */}
                            <div className="pd-action-row">
                                <motion.button className="btn-addcart pd-btn"
                                    onClick={handleAddToCart} disabled={product.stock === 0}
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    🛒 Add to Cart
                                </motion.button>
                                <motion.button className="pd-buynow-btn pd-btn"
                                    onClick={handleBuyNow} disabled={product.stock === 0}
                                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    ⚡ Buy Now
                                </motion.button>
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="pd-info">
                            <span className="pd-category">{product.category}</span>
                            <h1 className="pd-title">{product.name}</h1>

                            <div className="pd-rating-row">
                                <StarRating rating={product.rating || 4.5} size="1.1rem" />
                                <span className="pd-reviews">{product.reviews || 0} ratings</span>
                            </div>

                            <div className="pd-price-section">
                                <span className="pd-price">₹{product.price?.toLocaleString()}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="pd-original">₹{product.originalPrice?.toLocaleString()}</span>
                                        <span className="pd-discount-badge">
                                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                                        </span>
                                    </>
                                )}
                            </div>

                            <p className="pd-desc">{product.desc || product.description}</p>

                            {/* Stock */}
                            <div className="pd-stock">
                                {product.stock === 0 ? (
                                    <span className="stock-out">❌ Out of Stock</span>
                                ) : product.stock <= 3 ? (
                                    <span className="stock-low">⚠️ Only {product.stock} left in stock!</span>
                                ) : (
                                    <span className="stock-in">✅ In Stock</span>
                                )}
                            </div>

                            {/* Qty */}
                            {product.stock > 0 && (
                                <div className="pd-qty">
                                    <label>Quantity:</label>
                                    <div className="qty-control">
                                        <button onClick={() => setQty(q => Math.max(1, q - 1))}>−</button>
                                        <span>{qty}</span>
                                        <button onClick={() => setQty(q => Math.min(product.stock, q + 1))}>+</button>
                                    </div>
                                </div>
                            )}

                            {/* Delivery checker */}
                            <div className="pd-delivery-check">
                                <h4>🚚 Check Delivery</h4>
                                <div className="pincode-row">
                                    <input type="text" placeholder="Enter pincode" maxLength={6}
                                        value={pincode} onChange={e => setPincode(e.target.value)} />
                                    <button onClick={checkPincode}>Check</button>
                                </div>
                                {deliveryInfo && (
                                    <motion.p className={`delivery-result ${deliveryInfo.available ? 'available' : 'unavailable'}`}
                                        initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
                                        {deliveryInfo.available
                                            ? `✅ Delivery available to ${deliveryInfo.area} in ${deliveryInfo.days} days`
                                            : '❌ Delivery not available to this pincode'}
                                    </motion.p>
                                )}
                            </div>

                            {/* EMI */}
                            <div className="pd-emi">
                                <button className="emi-toggle" onClick={() => setShowEMI(!showEMI)}>
                                    💳 EMI Options {showEMI ? '▲' : '▼'}
                                </button>
                                <AnimatePresence>
                                    {showEMI && (
                                        <motion.div className="emi-table"
                                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}>
                                            {EMI_PLANS.map(plan => (
                                                <div key={plan.months} className="emi-row">
                                                    <span>{plan.months} months</span>
                                                    <span>₹{emiAmount(plan.months, plan.rate).toLocaleString()}/month</span>
                                                    <span className="emi-tag">{plan.rate === 0 ? 'No Cost EMI' : `${plan.rate}% interest`}</span>
                                                </div>
                                            ))}
                                            <p className="emi-note">* EMI available via Razorpay at checkout</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Highlights */}
                            <div className="pd-highlights">
                                <h4>Highlights</h4>
                                <ul>
                                    <li>✅ Premium MDF material</li>
                                    <li>✅ Smooth finish & durable</li>
                                    <li>✅ Custom size available</li>
                                    <li>✅ Free delivery in Ghorasahan</li>
                                    <li>✅ After-sales support</li>
                                </ul>
                            </div>

                            {/* WhatsApp */}
                            <a href={`https://wa.me/919102163272?text=Hi, I want to order ${product.name} (₹${product.price?.toLocaleString()})`}
                                className="btn-whatsapp pd-wa-btn" target="_blank" rel="noreferrer">
                                💬 Order via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zoom Modal */}
            <AnimatePresence>
                {zoom && (
                    <motion.div className="lightbox-overlay"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setZoom(false)}>
                        <motion.img src={images[activeImg]} alt={product.name}
                            className="lightbox-full-img"
                            initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
                            onClick={e => e.stopPropagation()} />
                        <button className="lightbox-close" onClick={() => setZoom(false)}>✕</button>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {toast && (
                    <motion.div className="toast"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}>
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>

            <WhatsAppButton />
            <ScrollToTop />
        </>
    )
}
