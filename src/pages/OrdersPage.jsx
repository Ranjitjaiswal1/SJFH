import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ScrollToTop from '../components/ScrollToTop'

// Mock orders for demo (replace with API call when backend is connected)
const mockOrders = [
    {
        _id: 'ORD001ABC',
        createdAt: new Date('2026-03-20'),
        items: [{ name: 'Modern MDF Bed', qty: 1, price: 25000 }, { name: 'MDF Almirah', qty: 1, price: 20000 }],
        totalAmount: 45000,
        paymentStatus: 'paid',
        orderStatus: 'shipped',
        shippingAddress: { name: 'Rahul Singh', city: 'Motihari', pincode: '845401' }
    },
    {
        _id: 'ORD002XYZ',
        createdAt: new Date('2026-03-25'),
        items: [{ name: 'Luxury Sofa Set', qty: 1, price: 30000 }],
        totalAmount: 30000,
        paymentStatus: 'paid',
        orderStatus: 'delivered',
        shippingAddress: { name: 'Priya Sharma', city: 'Patna', pincode: '800001' }
    }
]

const STEPS = ['placed', 'confirmed', 'shipped', 'delivered']
const STEP_LABELS = { placed: '📋 Order Placed', confirmed: '✅ Confirmed', shipped: '🚚 Shipped', delivered: '🏠 Delivered' }
const statusColor = { placed: '#f5c842', confirmed: '#2196f3', shipped: '#ff9800', delivered: '#4caf50', cancelled: '#f44336' }

function TrackingBar({ status }) {
    const currentStep = STEPS.indexOf(status)
    return (
        <div className="tracking-bar">
            {STEPS.map((step, i) => (
                <div key={step} className={`tracking-step ${i <= currentStep ? 'done' : ''}`}>
                    <motion.div className="tracking-dot"
                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                        transition={{ delay: i * 0.15, type: 'spring' }} />
                    <span>{STEP_LABELS[step]}</span>
                    {i < STEPS.length - 1 && (
                        <div className={`tracking-line ${i < currentStep ? 'done' : ''}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

export default function OrdersPage() {
    const [orders] = useState(mockOrders)
    const [expanded, setExpanded] = useState(null)

    return (
        <>
            <Navbar />
            <div className="orders-page">
                <h2>My Orders</h2>

                {orders.length === 0 ? (
                    <div className="empty-page">
                        <div style={{ fontSize: '4rem' }}>📦</div>
                        <h2>No orders yet</h2>
                        <Link to="/" className="btn-primary">Start Shopping</Link>
                    </div>
                ) : (
                    orders.map((order, i) => (
                        <motion.div key={order._id} className="order-card"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}>
                            <div className="order-header">
                                <div>
                                    <p className="order-id">Order #{order._id}</p>
                                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                    <p style={{ fontSize: '0.82rem', color: '#888', marginTop: '2px' }}>
                                        Deliver to: {order.shippingAddress.name}, {order.shippingAddress.city}
                                    </p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <span className="order-status" style={{ background: statusColor[order.orderStatus] }}>
                                        {order.orderStatus.toUpperCase()}
                                    </span>
                                    <p style={{ fontSize: '0.82rem', marginTop: '6px' }}>
                                        <span className={`pay-status ${order.paymentStatus}`}>{order.paymentStatus.toUpperCase()}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Tracking */}
                            {order.orderStatus !== 'cancelled' && <TrackingBar status={order.orderStatus} />}

                            {/* Items */}
                            <div className="order-items">
                                {order.items.map((item, j) => (
                                    <div key={j} className="order-item-row">
                                        <span>{item.name}</span>
                                        <span>Qty: {item.qty}</span>
                                        <span>₹{(item.price * item.qty).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <span>Total: <strong>₹{order.totalAmount.toLocaleString()}</strong></span>
                                <button className="order-details-btn"
                                    onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                                    {expanded === order._id ? 'Hide Details ▲' : 'View Details ▼'}
                                </button>
                            </div>

                            <AnimatePresence>
                                {expanded === order._id && (
                                    <motion.div className="order-expanded"
                                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}>
                                        <p><strong>Delivery Address:</strong> {order.shippingAddress.name}, {order.shippingAddress.city} - {order.shippingAddress.pincode}</p>
                                        <a href={`https://wa.me/919102163272?text=Hi, I want to track my order #${order._id}`}
                                            className="btn-whatsapp" target="_blank" rel="noreferrer"
                                            style={{ display: 'inline-block', marginTop: '12px' }}>
                                            💬 Track via WhatsApp
                                        </a>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))
                )}
            </div>
            <ScrollToTop />
        </>
    )
}
