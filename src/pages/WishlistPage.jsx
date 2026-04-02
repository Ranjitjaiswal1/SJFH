import { motion, AnimatePresence } from 'framer-motion'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function WishlistPage() {
    const { wishlist, toggle } = useWishlist()
    const { addToCart } = useCart()
    const [toast, setToast] = useState('')

    const handleMoveToCart = (item) => {
        addToCart({ ...item, images: [item.img] })
        toggle(item)
        setToast(`✅ ${item.name} moved to cart!`)
        setTimeout(() => setToast(''), 2500)
    }

    if (wishlist.length === 0) return (
        <div className="empty-page">
            <div style={{ fontSize: '4rem' }}>🤍</div>
            <h2>Your wishlist is empty</h2>
            <p style={{ color: '#888' }}>Save items you love and come back to them later</p>
            <Link to="/" className="btn-primary" style={{ marginTop: '16px' }}>Browse Products</Link>
        </div>
    )

    return (
        <div className="wishlist-page">
            <h2>My Wishlist ({wishlist.length} items)</h2>
            <div className="wishlist-grid">
                <AnimatePresence>
                    {wishlist.map((item, i) => (
                        <motion.div key={item._id} className="wishlist-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ delay: i * 0.08 }}>
                            <div className="wishlist-img">
                                <img src={item.img || item.images?.[0]} alt={item.name} />
                                <button className="wl-remove" onClick={() => toggle(item)}>✕</button>
                            </div>
                            <div className="wishlist-info">
                                <h4>{item.name}</h4>
                                <p className="wl-price">₹{item.price?.toLocaleString()}</p>
                                <p className="wl-delivery">🚚 Delivery in {item.delivery || '5-7 days'}</p>
                                <motion.button className="btn-addcart"
                                    onClick={() => handleMoveToCart(item)}
                                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                                    style={{ width: '100%', marginTop: '10px' }}>
                                    🛒 Move to Cart
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {toast && (
                    <motion.div className="toast"
                        initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}>
                        {toast}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
