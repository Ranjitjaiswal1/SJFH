import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

const COUPONS = {
    'SAVE10': { type: 'percent', value: 10, min: 10000, desc: '10% off on orders above ₹10,000' },
    'FLAT2000': { type: 'flat', value: 2000, min: 20000, desc: '₹2,000 off on orders above ₹20,000' },
    'NEWUSER': { type: 'percent', value: 15, min: 5000, desc: '15% off for new customers' },
}

export default function CartPage() {
    const { cart, removeFromCart, updateQty, total, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [coupon, setCoupon] = useState('')
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [couponError, setCouponError] = useState('')

    const discount = appliedCoupon
        ? appliedCoupon.type === 'percent'
            ? Math.round(total * appliedCoupon.value / 100)
            : appliedCoupon.value
        : 0

    const finalTotal = total - discount

    const applyCoupon = () => {
        const c = COUPONS[coupon.toUpperCase()]
        if (!c) { setCouponError('Invalid coupon code'); setAppliedCoupon(null); return }
        if (total < c.min) { setCouponError(`Min order ₹${c.min.toLocaleString()} required`); setAppliedCoupon(null); return }
        setAppliedCoupon(c)
        setCouponError('')
    }

    if (cart.length === 0) return (
        <>
            <Navbar />
            <div className="empty-page">
                <div style={{ fontSize: '4rem' }}>🛒</div>
                <h2>Your cart is empty</h2>
                <p style={{ color: '#888' }}>Add items to get started</p>
                <Link to="/" className="btn-primary" style={{ marginTop: '16px' }}>Continue Shopping</Link>
            </div>
        </>
    )

    return (
        <>
            <Navbar />
            <div className="cart-page">
                <h2>My Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h2>
                <div className="cart-inner">
                    <div className="cart-items">
                        {cart.map((item, i) => (
                            <motion.div key={item._id} className="cart-item"
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}>
                                <img src={item.images?.[0] || item.img} alt={item.name} />
                                <div className="cart-item-info">
                                    <h4>{item.name}</h4>
                                    <p className="cart-price">₹{item.price.toLocaleString()}</p>
                                    <p className="delivery-info">🚚 Free delivery</p>
                                    <div className="qty-control">
                                        <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                                        <span>{item.qty}</span>
                                        <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                                    </div>
                                </div>
                                <div className="cart-item-right">
                                    <p className="cart-subtotal">₹{(item.price * item.qty).toLocaleString()}</p>
                                    <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✕ Remove</button>
                                    <Link to="/" className="save-later-btn">Save for later</Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Price Details</h3>
                        <div className="summary-row"><span>Price ({cart.length} items)</span><span>₹{total.toLocaleString()}</span></div>
                        <div className="summary-row"><span>Delivery</span><span className="free">FREE</span></div>

                        {/* Coupon */}
                        <div className="coupon-section">
                            <h4>🏷️ Apply Coupon</h4>
                            <div className="coupon-row">
                                <input type="text" placeholder="Enter coupon code"
                                    value={coupon} onChange={e => setCoupon(e.target.value.toUpperCase())} />
                                <button onClick={applyCoupon}>Apply</button>
                            </div>
                            {couponError && <p className="coupon-error">{couponError}</p>}
                            {appliedCoupon && (
                                <motion.p className="coupon-success"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    ✅ {appliedCoupon.desc}
                                    <button onClick={() => { setAppliedCoupon(null); setCoupon('') }}>Remove</button>
                                </motion.p>
                            )}
                            <div className="available-coupons">
                                <p>Available: <span onClick={() => setCoupon('SAVE10')}>SAVE10</span> · <span onClick={() => setCoupon('FLAT2000')}>FLAT2000</span> · <span onClick={() => setCoupon('NEWUSER')}>NEWUSER</span></p>
                            </div>
                        </div>

                        {discount > 0 && (
                            <div className="summary-row discount-row">
                                <span>Coupon Discount</span>
                                <span className="discount-val">− ₹{discount.toLocaleString()}</span>
                            </div>
                        )}

                        <div className="summary-row total">
                            <span>Total Amount</span>
                            <span>₹{finalTotal.toLocaleString()}</span>
                        </div>

                        {discount > 0 && (
                            <p className="savings-msg">🎉 You save ₹{discount.toLocaleString()} on this order!</p>
                        )}

                        <button className="btn-primary checkout-btn"
                            onClick={() => user ? navigate('/checkout', { state: { discount, couponCode: coupon } }) : navigate('/login')}>
                            {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                        </button>
                        <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                    </div>
                </div>
            </div>
            <ScrollToTop />
        </>
    )
}
