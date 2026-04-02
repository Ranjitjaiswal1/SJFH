import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const discount = location.state?.discount || 0
    const finalTotal = total - discount

    const [address, setAddress] = useState({
        name: user?.name || '', phone: '', address: '', city: '', state: 'Bihar', pincode: ''
    })
    const [paymentMethod, setPaymentMethod] = useState('razorpay')
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(1) // 1=address, 2=payment, 3=confirm

    const handleCOD = async () => {
        setLoading(true)
        setTimeout(() => {
            clearCart()
            navigate('/orders', { state: { success: true, method: 'cod' } })
        }, 1500)
    }

    const handleRazorpay = async () => {
        setLoading(true)
        try {
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY || 'rzp_test_demo',
                amount: finalTotal * 100,
                currency: 'INR',
                name: 'Shree Jaiswal Furniture House',
                description: 'Furniture Order',
                image: '/logo.jpeg',
                handler: () => {
                    clearCart()
                    navigate('/orders', { state: { success: true, method: 'online' } })
                },
                prefill: { name: address.name, contact: address.phone },
                theme: { color: '#f5c842' }
            }
            if (window.Razorpay) {
                const rzp = new window.Razorpay(options)
                rzp.open()
            } else {
                alert('Razorpay not loaded. Please try COD or contact us on WhatsApp.')
            }
        } catch {
            alert('Payment failed. Please try again.')
        }
        setLoading(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (step === 1) { setStep(2); return }
        if (paymentMethod === 'cod') handleCOD()
        else handleRazorpay()
    }

    return (
        <>
            <Navbar />
            <div className="checkout-page">
                <h2>Checkout</h2>

                {/* Steps */}
                <div className="checkout-steps">
                    {['Delivery Address', 'Payment', 'Confirm'].map((s, i) => (
                        <div key={i} className={`checkout-step ${step > i ? 'done' : ''} ${step === i + 1 ? 'active' : ''}`}>
                            <span className="step-num">{step > i + 1 ? '✓' : i + 1}</span>
                            <span>{s}</span>
                        </div>
                    ))}
                </div>

                <div className="checkout-inner">
                    <form className="checkout-form" onSubmit={handleSubmit}>
                        <AnimatePresence mode="wait">
                            {step === 1 && (
                                <motion.div key="address"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}>
                                    <h3>Delivery Address</h3>
                                    {[
                                        { key: 'name', label: 'Full Name', type: 'text' },
                                        { key: 'phone', label: 'Phone Number', type: 'tel' },
                                        { key: 'address', label: 'Street Address', type: 'text' },
                                        { key: 'city', label: 'City / Town', type: 'text' },
                                        { key: 'pincode', label: 'Pincode', type: 'text' },
                                    ].map(f => (
                                        <div key={f.key} className="form-group">
                                            <label>{f.label}</label>
                                            <input type={f.type} value={address[f.key]}
                                                onChange={e => setAddress({ ...address, [f.key]: e.target.value })} required />
                                        </div>
                                    ))}
                                    <div className="form-group">
                                        <label>State</label>
                                        <select value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })}>
                                            {['Bihar', 'Uttar Pradesh', 'Jharkhand', 'West Bengal', 'Delhi', 'Other'].map(s => <option key={s}>{s}</option>)}
                                        </select>
                                    </div>
                                    <button type="submit" className="btn-primary" style={{ border: 'none', cursor: 'pointer', width: '100%', padding: '14px', fontSize: '1rem', marginTop: '8px' }}>
                                        Continue to Payment →
                                    </button>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div key="payment"
                                    initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}>
                                    <h3>Choose Payment Method</h3>

                                    <div className="payment-methods">
                                        {[
                                            { id: 'razorpay', icon: '💳', label: 'Online Payment', sub: 'UPI, Cards, Net Banking via Razorpay' },
                                            { id: 'cod', icon: '💵', label: 'Cash on Delivery', sub: 'Pay when your furniture arrives' },
                                            { id: 'whatsapp', icon: '💬', label: 'Order via WhatsApp', sub: 'Confirm order directly with us' },
                                        ].map(m => (
                                            <motion.label key={m.id}
                                                className={`payment-option ${paymentMethod === m.id ? 'selected' : ''}`}
                                                whileHover={{ scale: 1.01 }}>
                                                <input type="radio" name="payment" value={m.id}
                                                    checked={paymentMethod === m.id}
                                                    onChange={() => setPaymentMethod(m.id)} />
                                                <span className="pm-icon">{m.icon}</span>
                                                <div>
                                                    <strong>{m.label}</strong>
                                                    <p>{m.sub}</p>
                                                </div>
                                            </motion.label>
                                        ))}
                                    </div>

                                    <div className="checkout-btn-row">
                                        <button type="button" className="back-btn" onClick={() => setStep(1)}>← Back</button>
                                        <button type="submit" className="btn-primary"
                                            style={{ border: 'none', cursor: 'pointer', padding: '13px 32px', fontSize: '1rem' }}
                                            disabled={loading}>
                                            {loading ? 'Processing...' : paymentMethod === 'whatsapp'
                                                ? '💬 Order via WhatsApp'
                                                : paymentMethod === 'cod'
                                                    ? '✅ Place Order (COD)'
                                                    : `💳 Pay ₹${finalTotal.toLocaleString()}`}
                                        </button>
                                    </div>

                                    {paymentMethod === 'whatsapp' && (
                                        <a href={`https://wa.me/919102163272?text=Hi, I want to place an order. Items: ${cart.map(i => `${i.name} x${i.qty}`).join(', ')}. Total: ₹${finalTotal.toLocaleString()}. Address: ${address.address}, ${address.city}, ${address.pincode}`}
                                            className="btn-whatsapp" target="_blank" rel="noreferrer"
                                            style={{ display: 'block', textAlign: 'center', marginTop: '12px' }}>
                                            Open WhatsApp to Confirm Order
                                        </a>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </form>

                    {/* Order Summary */}
                    <motion.div className="checkout-summary"
                        initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                        <h3>Order Summary ({cart.length} items)</h3>
                        {cart.map(item => (
                            <div key={item._id} className="checkout-item">
                                <img src={item.images?.[0] || item.img} alt={item.name} />
                                <div>
                                    <p>{item.name}</p>
                                    <p style={{ color: '#888', fontSize: '0.8rem' }}>Qty: {item.qty}</p>
                                </div>
                                <span>₹{(item.price * item.qty).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="summary-row" style={{ marginTop: '14px' }}><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                        <div className="summary-row"><span>Delivery</span><span className="free">FREE</span></div>
                        {discount > 0 && <div className="summary-row discount-row"><span>Discount</span><span className="discount-val">−₹{discount.toLocaleString()}</span></div>}
                        <div className="summary-row total"><span>Total</span><span>₹{finalTotal.toLocaleString()}</span></div>
                        {discount > 0 && <p className="savings-msg">🎉 You save ₹{discount.toLocaleString()}!</p>}
                    </motion.div>
                </div>
            </div>
            <ScrollToTop />
        </>
    )
}
