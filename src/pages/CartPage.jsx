import { motion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

export default function CartPage() {
    const { cart, removeFromCart, updateQty, total, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()

    if (cart.length === 0) return (
        <div className="empty-page">
            <h2>🛒 Your cart is empty</h2>
            <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
    )

    return (
        <div className="cart-page">
            <h2>Your Cart ({cart.length} items)</h2>
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
                                <div className="qty-control">
                                    <button onClick={() => updateQty(item._id, item.qty - 1)}>−</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item._id, item.qty + 1)}>+</button>
                                </div>
                            </div>
                            <div className="cart-item-right">
                                <p className="cart-subtotal">₹{(item.price * item.qty).toLocaleString()}</p>
                                <button className="remove-btn" onClick={() => removeFromCart(item._id)}>✕ Remove</button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                    <div className="summary-row"><span>Delivery</span><span className="free">FREE</span></div>
                    <div className="summary-row total"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
                    <button className="btn-primary checkout-btn"
                        onClick={() => user ? navigate('/checkout') : navigate('/login')}>
                        {user ? 'Proceed to Checkout' : 'Login to Checkout'}
                    </button>
                    <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}
