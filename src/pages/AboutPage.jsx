import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import WhatsAppButton from '../components/WhatsappButton'
import ScrollToTop from '../components/ScrollToTop'

const team = [
    { name: "Sunil Jaiswal", role: "Founder & Master Craftsman", img: "/logo.jpeg" },
]

const milestones = [
    { year: "2015", title: "Founded", desc: "Started as a small workshop in Ghorasahan" },
    { year: "2018", title: "Expanded", desc: "Moved to a larger showroom with 20+ designs" },
    { year: "2021", title: "500+ Customers", desc: "Served over 500 happy families across Bihar" },
    { year: "2026", title: "Online Store", desc: "Launched online ordering and delivery" },
]

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="page-wrapper">
                {/* Hero */}
                <motion.div className="page-hero"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}
                    style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)), url('/bannner.jpeg')" }}>
                    <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                        About Us
                    </motion.h1>
                    <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
                        A decade of crafting beautiful furniture for Bihar
                    </motion.p>
                </motion.div>

                {/* Story */}
                <section className="about-page-section">
                    <div className="about-page-inner">
                        <motion.div className="about-page-img"
                            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }} viewport={{ once: true }}>
                            <img src="/bannner.jpeg" alt="Our Shop" />
                        </motion.div>
                        <motion.div className="about-page-text"
                            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7 }} viewport={{ once: true }}>
                            <span className="about-tag">Our Story</span>
                            <h2>Crafting Furniture <span>With Heart</span></h2>
                            <p>Shree Jaiswal Furniture House was founded in 2015 by Sunil Jaiswal in Ghorasahan, East Champaran, Bihar. What started as a small workshop has grown into one of the most trusted furniture shops in the region.</p>
                            <p>We specialize in premium MDF furniture — beds, sofas, almirahs, and custom pieces — all built with care, precision, and the finest materials. Every piece we make is designed to last a lifetime.</p>
                            <p>Our mission is simple: give every family access to beautiful, durable furniture at honest prices.</p>
                            <a href="https://wa.me/919102163272" className="btn-primary" target="_blank" rel="noreferrer" style={{ marginTop: '20px', display: 'inline-block' }}>
                                💬 Talk to Us
                            </a>
                        </motion.div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="timeline-section">
                    <div className="section-title">
                        <h2>Our Journey</h2>
                        <p>From a small workshop to Bihar's trusted furniture brand</p>
                        <div className="underline"></div>
                    </div>
                    <div className="timeline">
                        {milestones.map((m, i) => (
                            <motion.div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-card">
                                    <span className="timeline-year">{m.year}</span>
                                    <h4>{m.title}</h4>
                                    <p>{m.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Values */}
                <section className="values-section">
                    <div className="section-title">
                        <h2>Our Values</h2>
                        <div className="underline"></div>
                    </div>
                    <div className="values-grid">
                        {[
                            { icon: "🪵", title: "Quality First", desc: "Only premium MDF boards, no shortcuts" },
                            { icon: "💰", title: "Fair Pricing", desc: "Factory-direct prices, no middlemen" },
                            { icon: "🤝", title: "Trust", desc: "500+ families trust us across Bihar" },
                            { icon: "📐", title: "Custom Made", desc: "Any size, any design, your vision" },
                        ].map((v, i) => (
                            <motion.div key={i} className="value-card"
                                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                                whileHover={{ y: -5 }}>
                                <div className="value-icon">{v.icon}</div>
                                <h4>{v.title}</h4>
                                <p>{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
            <WhatsAppButton />
            <ScrollToTop />
        </>
    )
}
