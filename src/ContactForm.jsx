import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./App.css";

export default function Contact() {
  // Load saved form data from localStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem("contactForm");
    return saved
      ? JSON.parse(saved)
      : { subject: "", name: "", email: "", phone: "", message: "" };
  });

  const [status, setStatus] = useState("");

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("contactForm", JSON.stringify(formData));
  }, [formData]);

  // Handle input change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Send email with emailjs
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_iege6vw", // your EmailJS service ID
        "template_u3y31lp", // your EmailJS template ID
        formData,
        "uxxCPWDt4GOfE5R2P" // your public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("✅ Message sent successfully!");
          setFormData({ subject: "", name: "", email: "", phone: "", message: "" });
          localStorage.removeItem("contactForm"); // clear after success
        },
        (error) => {
          console.log(error.text);
          setStatus("❌ Failed to send message. Please try again.");
        }
      );
  };

  // Fade-out success/error message
  useEffect(() => {
    if (status) {
      const fadeTimer = setTimeout(() => {
        const el = document.querySelector(".status-message");
        if (el) el.classList.add("fade-out");
      }, 4000);

      const clearTimer = setTimeout(() => {
        setStatus("");
      }, 5000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [status]);

  // Scroll into view when this section mounts
  useEffect(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section id="contact" className="section-card">
      <form onSubmit={sendEmail} className="contact-form">
        <label>
          <i className="fas fa-user"></i> Your Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <i className="fas fa-envelope"></i> Your Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <i className="fas fa-phone"></i> Your Phone:
          <input
            type="tel"
            name="phone"
            pattern="[0-9+\-\s()]*"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          <i className="fas fa-tag"></i> Subject:
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          <i className="fas fa-comment-dots"></i> Your Message:
          <textarea
            name="message"
            rows="5"
            maxLength="1000"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </label>

        <button type="submit">
          <i className="fas fa-paper-plane"></i> Send
        </button>
      </form>

      {status && (
        <p
          className={`status-message ${
            status.startsWith("✅") ? "success" : "error"
          }`}
        >
          {status}
        </p>
      )}
    </section>
  );
}
