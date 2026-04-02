import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import API from '../api'

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            const { data } = await API.post('/auth/register', form)
            login(data.user, data.token)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed')
        }
        setLoading(false)
    }

    return (
        <div className="auth-page">
            <motion.div className="auth-box" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <img src="/logo.jpeg" alt="Logo" className="auth-logo" />
                <h2>Create your account</h2>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} required />
                    <input type="email" placeholder="Email address" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input type="tel" placeholder="Phone number" value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })} required />
                    <input type="password" placeholder="Password" value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} required />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>
                <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
                <Link to="/" className="auth-back">← Back to Home</Link>
            </motion.div>
        </div>
    )
}
