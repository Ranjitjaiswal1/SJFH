import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import API from '../api'
import { Link } from 'react-router-dom'

const statusColor = { placed: '#f5c842', confirmed: '#2196f3', shipped: '#ff9800', delivered: '#4caf50', cancelled: '#f44336' }

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        API.get('/orders/my').then(({ data }) => { setOrders(data); setLoading(false) })
    }, [])

    if (loading) return <div className="empty-page"><p>Loading orders...</p></div>
    if (!orders.length) return (
        <div className="empty-page">
            <h2>No orders yet</h2>
            <Link to="/" className="btn-primary">Start Shopping</Link>
        </div>
    )

    return (
        <div className="orders-page">
            <h2>My Orders</h2>
            {orders.map((order, i) => (
                <motion.div key={order._id} className="order-card"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}>
                    <div className="order-header">
                        <div>
                            <p className="order-id">Order #{order._id.slice(-8).toUpperCase()}</p>
                            <p className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <span className="order-status" style={{ background: statusColor[order.orderStatus] }}>
                            {order.orderStatus.toUpperCase()}
                        </span>
                    </div>
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
                        <span className={`pay-status ${order.paymentStatus}`}>{order.paymentStatus.toUpperCase()}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
