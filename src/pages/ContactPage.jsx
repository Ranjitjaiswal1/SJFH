import { motion } from 'framer-motion'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsappButton'
import ScrollToTop from '../components/ScrollToTop'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', phone: '', message: '' })

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = `Hi, I'm ${form.name}. Phone: ${form.phone}. Message: ${form.message}`
        window.open(`https://wa.me/919102163272?text=${encodeURIComponent(text)}`, '_blank')
        setForm({ name: '', phone: '', message: '' })
    }

    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                {/* Hero */}
                <motion.div className="page-hero"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.65),rgba(0,0,0,0.65)), url('/sofa.jpeg')" }}>
                    <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        Contact Us
                    </motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        We're here to help — reach out anytime
                    </motion.p>
                </motion.div>

                <section className="contact-page-section">
                    <div className="contact-page-inner">
                        {/* Info Cards */}
                        <motion.div className="contact-info-col"
                            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }} viewport={{ once: true }}>
                            <h2>Get In Touch</h2>
                            <p className="contact-intro">Visit our showroom or reach out via WhatsApp, call, or email. We respond within minutes.</p>

                            {[
                                { icon: "📞", title: "Call / WhatsApp", value: "+91 9102163272", link: "tel:+919102163272" },
                                { icon: "📧", title: "Email", value: "sunil9102163@gmail.com", link: "mailto:sunil9102163@gmail.com" },
                                { icon: "🕐", title: "Working Hours", value: "Mon–Sat: 9AM–8PM | Sun: 10AM–6PM" },
                            ].map((c, i) => (
                                <motion.div key={i} className="contact-info-card"
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                                    <span className="ci-icon">{c.icon}</span>
                                    <div>
                                        <strong>{c.title}</strong>
                                        {c.link ? <a href={c.link}>{c.value}</a> : <p>{c.value}</p>}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Quick action buttons */}
                            <div className="contact-quick-btns">
                                <a href="https://wa.me/919102163272" className="btn-primary" target="_blank" rel="noreferrer">
                                    💬 WhatsApp Now
                                </a>
                                <a href="tel:+919102163272" className="btn-outline-dark">
                                    📞 Call Now
                                </a>
                            </div>
                        </motion.div>

                        {/* Form */}
                        <motion.form className="contact-form-box" onSubmit={handleSubmit}
                            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }} viewport={{ once: true }}>
                            <h3>Send a Message</h3>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="Enter your name" value={form.name}
                                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input type="tel" placeholder="Enter your phone" value={form.phone}
                                    onChange={e => setForm({ ...form, phone: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea rows="4" placeholder="What are you looking for?" value={form.message}
                                    onChange={e => setForm({ ...form, message: e.target.value })} required />
                            </div>
                            <motion.button type="submit" className="btn-primary"
                                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                                style={{ border: 'none', cursor: 'pointer', width: '100%', padding: '14px', fontSize: '1rem' }}>
                                💬 Send via WhatsApp
                            </motion.button>
                        </motion.form>
                    </div>

                    {/* Google Maps */}
                    <motion.div className="map-section"
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }} viewport={{ once: true }}>
                        <div className="map-header">
                            <h3>📍 Find Our Showroom</h3>
                            <p>Raj Mandir Gali, Beside Bigu Meat House, Ghorasahan, East Champaran, Bihar — 845303</p>
                            <a
                                href="https://maps.google.com/?q=Ghorasahan,East+Champaran,Bihar"
                                target="_blank" rel="noreferrer"
                                className="open-maps-btn">
                                🗺️ Open in Google Maps
                            </a>
                        </div>
                        <div className="map-embed">
                            <iframe
                                title="Shop Location"
                                src="https://maps.google.com/maps?q=Ghorasahan,East+Champaran,Bihar&output=embed&z=14"
                                width="100%" height="380"
                                style={{ border: 0, borderRadius: '16px' }}
                                allowFullScreen loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </motion.div>
                </section>
            </div>
            <WhatsAppButton />
            <ScrollToTop />
        </>
    )
}
