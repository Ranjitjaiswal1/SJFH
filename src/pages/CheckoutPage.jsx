import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import API from '../api'

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [address, setAddress] = useState({ name: user?.name || '', phone: '', address: '', city: '', state: 'Bihar', pincode: '' })
    const [loading, setLoading] = useState(false)

    const handlePayment = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            // Create order in DB
            const orderData = {
                items: cart.map(i => ({ product: i._id, name: i.name, image: i.images?.[0] || '', price: i.price, qty: i.qty })),
                shippingAddress: address,
                totalAmount: total,
            }
            const { data: order } = await API.post('/orders', orderData)

            // Create Razorpay order
            const { data: rzpOrder } = await API.post('/payment/create-order', { amount: total })

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY,
                amount: rzpOrder.amount,
                currency: 'INR',
                name: 'Shree Jaiswal Furniture House',
                description: 'Furniture Order',
                image: '/logo.jpeg',
                order_id: rzpOrder.id,
                handler: async (response) => {
                    await API.post('/payment/verify', { ...response, orderId: order._id })
                    clearCart()
                    navigate('/orders')
                },
                prefill: { name: address.name, contact: address.phone },
                theme: { color: '#f5c842' }
            }

            const rzp = new window.Razorpay(options)
            rzp.open()
        } catch (err) {
            alert('Something went wrong. Please try again.')
        }
        setLoading(false)
    }

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <div className="checkout-inner">
                <motion.form className="checkout-form" onSubmit={handlePayment}
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                    <h3>Delivery Address</h3>
                    {[
                        { key: 'name', label: 'Full Name', type: 'text' },
                        { key: 'phone', label: 'Phone Number', type: 'tel' },
                        { key: 'address', label: 'Street Address', type: 'text' },
                        { key: 'city', label: 'City', type: 'text' },
                        { key: 'pincode', label: 'Pincode', type: 'text' },
                    ].map(f => (
                        <div key={f.key} className="form-group">
                            <label>{f.label}</label>
                            <input type={f.type} value={address[f.key]}
                                onChange={e => setAddress({ ...address, [f.key]: e.target.value })} required />
                        </div>
                    ))}
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
                    </button>
                </motion.form>

                <motion.div className="checkout-summary"
                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}>
                    <h3>Order Items ({cart.length})</h3>
                    {cart.map(item => (
                        <div key={item._id} className="checkout-item">
                            <img src={item.images?.[0] || item.img} alt={item.name} />
                            <div>
                                <p>{item.name}</p>
                                <p>Qty: {item.qty} × ₹{item.price.toLocaleString()}</p>
                            </div>
                            <span>₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="summary-row total" style={{ marginTop: '16px' }}>
                        <span>Total</span><span>₹{total.toLocaleString()}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
