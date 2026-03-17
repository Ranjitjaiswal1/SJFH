import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function Enquiry() {
    const [form, setForm] = useState({ name: "", phone: "", message: "" })
    const [sent, setSent] = useState(false)

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        const text = `Hi, I'm ${form.name}. Phone: ${form.phone}. Message: ${form.message}`
        window.open(`https://wa.me/919102163272?text=${encodeURIComponent(text)}`, "_blank")
        setSent(true)
        setTimeout(() => setSent(false), 4000)
        setForm({ name: "", phone: "", message: "" })
    }

    return (
        <section id="enquiry" className="enquiry-section">
            <motion.div
                className="section-title"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h2>Quick Enquiry</h2>
                <p>Fill in your details and we'll get back to you instantly on WhatsApp</p>
                <div className="underline"></div>
            </motion.div>

            <motion.form
                className="enquiry-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
            >
                <div className="form-row">
                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>
                    <motion.div
                        className="form-group"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter your phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                        />
                    </motion.div>
                </div>

                <motion.div
                    className="form-group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    viewport={{ once: true }}
                >
                    <label>What are you looking for?</label>
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="E.g. I need a double bed with wardrobe..."
                        value={form.message}
                        onChange={handleChange}
                        required
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    className="btn-primary"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ border: "none", cursor: "pointer", fontSize: "1rem" }}
                >
                    💬 Send Enquiry on WhatsApp
                </motion.button>

                <AnimatePresence>
                    {sent && (
                        <motion.p
                            className="form-success"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            ✅ Redirecting to WhatsApp...
                        </motion.p>
                    )}
                </AnimatePresence>
            </motion.form>
        </section>
    )
}
