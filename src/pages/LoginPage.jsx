import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import API from '../api'

export default function LoginPage() {
    const [form, setForm] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true); setError('')
        try {
            const { data } = await API.post('/auth/login', form)
            login(data.user, data.token)
            navigate(data.user.role === 'admin' ? '/admin' : '/')
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed')
        }
        setLoading(false)
    }

    return (
        <div className="auth-page">
            <motion.div className="auth-box" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                <img src="/logo.jpeg" alt="Logo" className="auth-logo" />
                <h2>Login to your account</h2>
                {error && <p className="auth-error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email address" value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} required />
                    <input type="password" placeholder="Password" value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} required />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="auth-switch">Don't have an account? <Link to="/register">Register</Link></p>
                <Link to="/" className="auth-back">← Back to Home</Link>
            </motion.div>
        </div>
    )
}
