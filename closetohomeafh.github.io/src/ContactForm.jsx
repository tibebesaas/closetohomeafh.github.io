import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./App.css";

function ContactForm() {
  // Initialize formData from localStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("contactForm");
    return saved
      ? JSON.parse(saved)
      : { subject: "", name: "", email: "", phone: "", message: "" };
  });

  const [status, setStatus] = useState("");

  // Update localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("contactForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    // Auto-reply (example)
    emailjs
      .send(
        "service_iege6vw",
        "template_u3y31lp",
        formData,
        "uxxCPWDt4GOfE5R2P"
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ Message sent successfully!");
          setFormData({ subject: "", name: "", email: "", phone: "", message: "" });
          localStorage.removeItem("contactForm"); // clear saved data on success
        },
        (error) => {
          console.log(error.text);
          setStatus("❌ Failed to send message. Please try again.");
        }
      );
  };

  // Fade-out effect for status messages
  useEffect(() => {
    if (status) {
      const fadeTimer = setTimeout(() => {
        const el = document.querySelector(".status-message");
        if (el) el.classList.add("fade-out");
      }, 4000); // start fading at 4s

      const clearTimer = setTimeout(() => {
        setStatus("");
      }, 5000); // remove completely at 5s

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [status]);

  return (
    <div className="contact-form">
      <form onSubmit={sendEmail}>
        <label>
          Your Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Your Message:
          <textarea
            name="message"
            rows="5"
            maxLength="1000"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>
        <button type="submit">Send</button>
      </form>

      {status && (
        <p className={`status-message ${status.startsWith("✅") ? "success" : "error"}`}>
          {status}
        </p>
      )}
    </div>
  );
}

export default ContactForm;
