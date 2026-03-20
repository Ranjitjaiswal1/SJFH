import { motion } from "framer-motion"
import { news, newArrivals } from "../data/updates"

const tagColors = {
    "New Arrival": { bg: "#fff8e1", color: "#b8860b" },
    "Update": { bg: "#e8f5e9", color: "#2e7d32" },
    "Offer": { bg: "#fce4ec", color: "#c62828" },
}

export default function Updates() {
    return (
        <section id="updates" className="updates-section">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Latest Updates</h2>
                <p>New arrivals, offers & news from our shop</p>
                <div className="underline"></div>
            </motion.div>

            <div className="updates-inner">
                {/* New Arrivals */}
                <div className="updates-left">
                    <motion.h3
                        className="updates-sub-title"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        🆕 New Arrivals
                    </motion.h3>
                    <div className="arrivals-grid">
                        {newArrivals.map((item, i) => (
                            <motion.div
                                key={i}
                                className="arrival-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.45, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(0,0,0,0.12)" }}
                            >
                                <div className="arrival-img">
                                    <img src={item.img} alt={item.title} />
                                    <span className="arrival-date">{item.date}</span>
                                </div>
                                <div className="arrival-info">
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* News */}
                <div className="updates-right">
                    <motion.h3
                        className="updates-sub-title"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        📢 Shop News
                    </motion.h3>
                    <div className="news-list">
                        {news.map((item, i) => (
                            <motion.div
                                key={i}
                                className="news-card"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.45, delay: i * 0.12 }}
                                viewport={{ once: true }}
                                whileHover={{ x: 4 }}
                            >
                                <div className="news-top">
                                    <span
                                        className="news-tag"
                                        style={tagColors[item.tag] || { bg: "#eee", color: "#333" }}
                                    >
                                        {item.tag}
                                    </span>
                                    <span className="news-date">{item.date}</span>
                                </div>
                                <h4>{item.title}</h4>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
