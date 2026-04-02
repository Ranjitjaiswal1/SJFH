import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import API from '../api'

const statusColor = { placed: '#f5c842', confirmed: '#2196f3', shipped: '#ff9800', delivered: '#4caf50', cancelled: '#f44336' }

export default function AdminPage() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [tab, setTab] = useState('dashboard')
    const [stats, setStats] = useState({})
    const [orders, setOrders] = useState([])
    const [products, setProducts] = useState([])
    const [form, setForm] = useState({ name: '', description: '', price: '', originalPrice: '', category: 'Bed', stock: 10 })
    const [images, setImages] = useState([])

    useEffect(() => {
        if (!user || user.role !== 'admin') { navigate('/'); return }
        API.get('/admin/stats').then(({ data }) => setStats(data))
        API.get('/orders').then(({ data }) => setOrders(data))
        API.get('/products').then(({ data }) => setProducts(data))
    }, [user])

    const addProduct = async (e) => {
        e.preventDefault()
        const fd = new FormData()
        Object.entries(form).forEach(([k, v]) => fd.append(k, v))
        images.forEach(img => fd.append('images', img))
        await API.post('/products', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
        alert('Product added!')
        API.get('/products').then(({ data }) => setProducts(data))
        setForm({ name: '', description: '', price: '', originalPrice: '', category: 'Bed', stock: 10 })
        setImages([])
    }

    const updateOrderStatus = async (id, status) => {
        await API.put(`/orders/${id}`, { orderStatus: status })
        setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus: status } : o))
    }

    const deleteProduct = async (id) => {
        if (!window.confirm('Remove this product?')) return
        await API.delete(`/products/${id}`)
        setProducts(prev => prev.filter(p => p._id !== id))
    }

    return (
        <div className="admin-page">
            <div className="admin-sidebar">
                <img src="/logo.jpeg" alt="Logo" className="admin-logo" />
                <h3>Admin Panel</h3>
                {['dashboard', 'orders', 'products', 'add-product'].map(t => (
                    <button key={t} className={`admin-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                        {t === 'dashboard' ? '📊 Dashboard' : t === 'orders' ? '📦 Orders' : t === 'products' ? '🪑 Products' : '➕ Add Product'}
                    </button>
                ))}
            </div>

            <div className="admin-content">
                {tab === 'dashboard' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2>Dashboard</h2>
                        <div className="stats-grid">
                            {[
                                { label: 'Total Orders', value: stats.totalOrders, icon: '📦' },
                                { label: 'Total Users', value: stats.totalUsers, icon: '👥' },
                                { label: 'Products', value: stats.totalProducts, icon: '🪑' },
                                { label: 'Revenue', value: `₹${(stats.revenue || 0).toLocaleString()}`, icon: '💰' },
                            ].map((s, i) => (
                                <motion.div key={i} className="stat-card"
                                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}>
                                    <span className="stat-icon">{s.icon}</span>
                                    <h3>{s.value}</h3>
                                    <p>{s.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {tab === 'orders' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2>All Orders ({orders.length})</h2>
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr><th>Order ID</th><th>Customer</th><th>Amount</th><th>Payment</th><th>Status</th><th>Action</th></tr>
                                </thead>
                                <tbody>
                                    {orders.map(o => (
                                        <tr key={o._id}>
                                            <td>#{o._id.slice(-8).toUpperCase()}</td>
                                            <td>{o.user?.name}<br /><small>{o.user?.phone}</small></td>
                                            <td>₹{o.totalAmount.toLocaleString()}</td>
                                            <td><span className={`pay-status ${o.paymentStatus}`}>{o.paymentStatus}</span></td>
                                            <td><span className="order-status" style={{ background: statusColor[o.orderStatus] }}>{o.orderStatus}</span></td>
                                            <td>
                                                <select value={o.orderStatus} onChange={e => updateOrderStatus(o._id, e.target.value)}>
                                                    {['placed', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s}>{s}</option>)}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

                {tab === 'products' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2>Products ({products.length})</h2>
                        <div className="admin-products-grid">
                            {products.map(p => (
                                <div key={p._id} className="admin-product-card">
                                    <img src={p.images?.[0]} alt={p.name} />
                                    <div className="admin-product-info">
                                        <h4>{p.name}</h4>
                                        <p>₹{p.price.toLocaleString()}</p>
                                        <p>Stock: {p.stock}</p>
                                        <button className="delete-btn" onClick={() => deleteProduct(p._id)}>🗑 Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {tab === 'add-product' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h2>Add New Product</h2>
                        <form className="admin-form" onSubmit={addProduct}>
                            {[
                                { key: 'name', label: 'Product Name', type: 'text' },
                                { key: 'price', label: 'Price (₹)', type: 'number' },
                                { key: 'originalPrice', label: 'Original Price (₹)', type: 'number' },
                                { key: 'stock', label: 'Stock Quantity', type: 'number' },
                            ].map(f => (
                                <div key={f.key} className="form-group">
                                    <label>{f.label}</label>
                                    <input type={f.type} value={form[f.key]}
                                        onChange={e => setForm({ ...form, [f.key]: e.target.value })} required />
                                </div>
                            ))}
                            <div className="form-group">
                                <label>Category</label>
                                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                                    {['Bed', 'Sofa', 'Almirah', 'Table', 'Other'].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea rows="3" value={form.description}
                                    onChange={e => setForm({ ...form, description: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Product Images</label>
                                <input type="file" multiple accept="image/*"
                                    onChange={e => setImages(Array.from(e.target.files))} />
                            </div>
                            <button type="submit" className="btn-primary">Add Product</button>
                        </form>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
