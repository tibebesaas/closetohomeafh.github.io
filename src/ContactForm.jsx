import { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import "./App.css";

export default function Contact() {
  // Load saved form data from sessionStorage if available
  const [formData, setFormData] = useState(() => {
    const saved = sessionStorage.getItem("contactForm");
    return saved
      ? JSON.parse(saved)
      : { subject: "", name: "", email: "", phone: "", message: "" };
  });

  const [errors, setErrors] = useState({ email: "", phone: "" });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false); // new state for sending status

  // Save to sessionStorage whenever formData changes
  useEffect(() => {
    sessionStorage.setItem("contactForm", JSON.stringify(formData));
  }, [formData]);

  // Validation function
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) error = "Please enter a valid email address.";
    }

    if (name === "phone") {
      const phoneRegex = /^(\+?1\s?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]?\d{4}$/;
      if (!phoneRegex.test(value)) {
        error =
          "Enter a valid US/Canada phone number (e.g., (253) 205-9208 or +1 (253) 205-9208).";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Format US/Canada phone numbers with +1 auto-prepend
  const formatPhoneNumber = (value) => {
    let digits = value.replace(/\D/g, "");
    let prefix = "";

    if (digits.startsWith("1") && digits.length === 11) {
      prefix = "+1 ";
      digits = digits.slice(1);
    } else if (value.startsWith("+1")) {
      prefix = "+1 ";
      digits = digits.slice(1);
    }

    if (!digits) return "";

    if (digits.length <= 3) return `${prefix}${digits}`;
    if (digits.length <= 6) return `${prefix}(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `${prefix}(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = formatPhoneNumber(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    validateField(name, newValue);
  };

  // Send email with EmailJS
  const sendEmail = (e) => {
    e.preventDefault();

    if (errors.email || errors.phone) {
      setStatus("❌ Please fix the errors before sending.");
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        "service_iege6vw", // your EmailJS service ID
        "template_u3y31lp", // your EmailJS template ID
        formData,
        "uxxCPWDt4GOfE5R2P" // your public key
      )
      .then(() => {
        setStatus(
          "✅ Message sent successfully! Please check your spam folder if you don’t see the reply."
        );
        setFormData({ subject: "", name: "", email: "", phone: "", message: "" });
        sessionStorage.removeItem("contactForm");
      })
      .catch(() => setStatus("❌ Failed to send message. Please try again."))
      .finally(() => setIsSending(false));
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
        {errors.email && <p className="error-text">{errors.email}</p>}

        <label>
          <i className="fas fa-phone"></i> Your Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            placeholder="(253) 205-9208"
          />
        </label>
        {errors.phone && <p className="error-text">{errors.phone}</p>}

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

        <button type="submit" disabled={isSending}>
          <i className="fas fa-paper-plane"></i> {isSending ? "Sending..." : "Send"}
        </button>
      </form>

      {status && (
        <p
          className={`status-message ${status.startsWith("✅") ? "success" : "error"}`}
        >
          {status}
        </p>
      )}

      <style jsx>{`
        .error-text {
          color: red;
          font-size: 0.9rem;
          margin: 0.25rem 0 1rem 1.5rem;
        }
        button[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
}
