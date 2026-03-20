import { motion } from "framer-motion"

const highlights = [
    { icon: "🏠", label: "Est. 2015", desc: "Serving Bihar for 10+ years" },
    { icon: "🪵", label: "MDF Experts", desc: "Premium grade materials only" },
    { icon: "📐", label: "Custom Made", desc: "Any size, any design" },
    { icon: "🤝", label: "Trusted", desc: "500+ satisfied families" },
]

export default function About() {
    return (
        <section id="about" className="about-section">
            <div className="about-inner">
                {/* Left - Image */}
                <motion.div
                    className="about-img-wrap"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <img src="/bannner.jpeg" alt="Shree Jaiswal Furniture" />
                    <div className="about-img-badge">
                        <span className="badge-num">10+</span>
                        <span className="badge-text">Years of<br />Excellence</span>
                    </div>
                </motion.div>

                {/* Right - Content */}
                <motion.div
                    className="about-content"
                    initial={{ opacity: 0, x: 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 }}
                    viewport={{ once: true }}
                >
                    <motion.p
                        className="about-tag"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        About Us
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        Crafting Beautiful Furniture <span>Since 2015</span>
                    </motion.h2>

                    <motion.p
                        className="about-desc"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                    >
                        Shree Jaiswal Furniture House is a family-run business based in Ghorasahan,
                        East Champaran, Bihar. Founded by Sunil Jaiswal, we have been crafting
                        high-quality MDF furniture for over a decade — delivering comfort, style,
                        and durability to hundreds of homes across Bihar.
                    </motion.p>

                    <motion.p
                        className="about-desc"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        We specialize in beds, sofas, wardrobes, and fully custom furniture —
                        built to your exact size and design. Every piece is made with care,
                        using premium MDF boards that are strong, smooth, and long-lasting.
                    </motion.p>

                    <div className="about-highlights">
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                className="about-highlight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4 }}
                            >
                                <span className="hl-icon">{h.icon}</span>
                                <div>
                                    <strong>{h.label}</strong>
                                    <p>{h.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.a
                        href="https://wa.me/919102163272?text=Hi, I want to know more about your furniture"
                        className="btn-primary"
                        target="_blank"
                        rel="noreferrer"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ marginTop: "28px", display: "inline-block" }}
                    >
                        💬 Talk to Us
                    </motion.a>
                </motion.div>
            </div>
        </section>
    )
}
