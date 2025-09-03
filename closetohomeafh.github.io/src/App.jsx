import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("about");
  const [slideIndex, setSlideIndex] = useState(0);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  const slides = [
    "/images/closetohome1.jpg",
    "/images/closetohome2.jpg",
    "/images/closetohome3.jpg",
    "/images/closetohome4.jpg",
    "/images/closetohome5.jpg",
    "/images/closetohome6.jpg",
  ];

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleContactMenu = () => setContactMenuOpen(!contactMenuOpen);

  const contactSection = (
    <section className="contact-section" style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "2px solid #4e6f2d" }}>
      <div className="contact-info">
        <p style={{ display: "flex", alignItems: "center" }}>
          <strong style={{ flexShrink: 0, marginRight: "0.5rem" }}>Phone:</strong>
          <span className="ellipsis" style={{ maxWidth: "300px", display: "inline-block" }}>
            <a href="tel:+14252988051">(425) ###-####</a>
          </span>
        </p>

        <p style={{ display: "flex", alignItems: "center" }}>
          <strong style={{ flexShrink: 0, marginRight: "0.5rem" }}>Email:</strong>
          <span className="ellipsis" style={{ maxWidth: "300px", display: "inline-block" }}>
            <a href="mailto:closetohomeafh@gmail.com">closetohomeafh@gmail.com</a>
          </span>
        </p>

        <p style={{ display: "flex", alignItems: "center" }}>
          <strong style={{ flexShrink: 0, marginRight: "0.5rem" }}>Address:</strong>
          <span className="ellipsis" style={{ maxWidth: "350px", display: "inline-block" }}>
            <a
              href="http://maps.google.com/?q=31904 42nd Ave SW, Federal Way, WA 98023"
              title="31904 42nd Ave SW, Federal Way, WA 98023"
            >
              31904 42nd Ave SW, Federal Way, WA 98023
            </a>
          </span>
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2676.123456789012!2d-122.3456789012345!3d47.309876543210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54903abcdef12345%3A0xabcdef1234567890!2s31904%2042nd%20Ave%20SW%2C%20Federal%20Way%2C%20WA%2098023!5e0!3m2!1sen!2sus!4v1751583490611!5m2!1sen!2sus"
          width="100%"
          height="300"
          style={{ border: 0, marginTop: "1rem", borderRadius: "8px" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );

  return (
    <div className="App">
      {/* Header */}
      <header>
        <div className="header-text">
          <h1>Close to Home Adult Family Home</h1>
          <h4><i>Where Comfort Meets Compassion.</i></h4>
        </div>
      </header>

      {/* Tabs */}
      <div className="tab-wrapper">
        <div className="tabs">
          {["about", "services", "contact", "gallery"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/^\w/, (c) => c.toUpperCase())} Us
            </button>
          ))}
        </div>

        {/* Tab Contents */}
        <div className="tab-container">
          {activeTab === "about" && (
            <div className="tab-content active">
              <h2>About Us</h2>
              <p>
                Close to Home Adult Family Home is owned and operated by a nurse with 7 years of experience in the health care field.
              </p>
              <p>
                We are compassionate and provide quality care in our home. By delivering professional and exceptional care to our residents, we stand out with an above-and-beyond experienced team.
              </p>
            </div>
          )}

          {activeTab === "services" && (
            <div className="tab-content active">
              <h2>Our Services</h2>
              <ul>
                <li>✅ 24/7 Supervision & Care</li>
                <li>💊 Medication Management</li>
                <li>🍽️ Daily Meals & Housekeeping</li>
                <li>🎨 Activities & Companionship</li>
                <li>🛏️ Private & Shared Rooms</li>
              </ul>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="tab-content active">
              <h2>Contact Us</h2>
              <form
                id="contact-form"
                action="https://formspree.io/f/mblybwgz"
                method="POST"
              >
                <label>
                  Your Name:
                  <input type="text" name="name" required />
                </label>
                <label>
                  Your Email:
                  <input type="email" name="email" required />
                </label>
                <label>
                  Your Message:
                  <textarea name="message" rows="5" required></textarea>
                </label>
                <label>
                  Your Phone:
                  <input type="tel" name="phone" />
                </label>
                <button type="submit">Send</button>
              </form>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="tab-content active">
              <h2>Gallery</h2>
              <div className="slideshow-container">
                <div className="slideshow">
                  {slides.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Slide ${i + 1}`}
                      className={`slide ${i === slideIndex ? "active" : ""}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Contact Button */}
      <div id="contact-float">
        <button id="contact-toggle" onClick={toggleContactMenu}>
          {contactMenuOpen ? "✖" : "💬"}
        </button>
        <div id="contact-menu" className={contactMenuOpen ? "show" : ""}>
          <a href="tel:+14252988051">📞 Call Us</a>
          <a href="mailto:closetohomeafh@gmail.com">✉️ Email Us</a>
          <button onClick={() => setActiveTab("contact")}>📝 Contact Form</button>
        </div>
      </div>

      {/* Footer with Contact Section */}
      <footer>
        {contactSection}
        <p style={{ marginTop: "2rem" }}>© 2025 Close to Home Adult Family Home | All rights reserved</p>
      </footer>
    </div>
  );
}

export default App;
