import { motion } from "framer-motion"

const cards = [
    { icon: "📞", title: "Call Us", content: <a href="tel:+919102163272">+91 9102163272</a> },
    { icon: "📧", title: "Email Us", content: <a href="mailto:sunil9102163@gmail.com">sunil9102163@gmail.com</a> },
    { icon: "📍", title: "Visit Us", content: <>Raj Mandir Gali, Near Chanakya Coaching<br />Ghorasahan, East Champaran, Bihar</> },
    { icon: "🕐", title: "Working Hours", content: <>Mon – Sat: 9AM – 8PM<br />Sunday: 10AM – 6PM</> },
]

export default function Contact() {
    return (
        <section id="contact" className="contact">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Get In Touch</h2>
                <p>We're here to help you find the perfect furniture</p>
                <div className="underline"></div>
            </motion.div>

            <div className="contact-cards">
                {cards.map((c, i) => (
                    <motion.div
                        key={i}
                        className="contact-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.12 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.05, background: "rgba(255,255,255,0.15)" }}
                    >
                        <motion.div
                            className="icon"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                        >
                            {c.icon}
                        </motion.div>
                        <h4>{c.title}</h4>
                        <p>{c.content}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                className="contact-cta"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
            >
                <motion.a
                    href="https://wa.me/919102163272?text=Hi, I need help with furniture"
                    className="btn-primary"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                >
                    💬 Chat with Us on WhatsApp
                </motion.a>
            </motion.div>
        </section>
    )
}
