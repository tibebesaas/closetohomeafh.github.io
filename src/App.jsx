import { useState, useEffect } from "react";
import "./App.css";
import ContactForm from "./ContactForm"; // ContactForm with Subject field

function App() {
  // Initialize activeTab from localStorage or default to "about Us"
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "about Us";
  });

  const [slideIndex, setSlideIndex] = useState(0);
  const [contactMenuOpen, setContactMenuOpen] = useState(false);

  const slides = [
    "/images/closetohome1.jpg",
    "/images/closetohome2.jpg",
    "/images/closetohome3.jpg",
    "/images/closetohome3.1.jpg",
    "/images/closetohome4.jpg",
    "/images/closetohome5.jpg",
    "/images/closetohome6.jpg",
  ];

  // Save activeTab in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  // Slideshow interval
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleContactMenu = () => setContactMenuOpen(!contactMenuOpen);

  const contactSection = (
    <section
      className="contact-section"
      style={{
        marginTop: "3rem",
        paddingTop: "2rem",
        borderTop: "2px solid #4e6f2d",
      }}
    >
      <div className="contact-info">
        <p style={{ display: "flex", alignItems: "center" }}>
          <strong style={{ flexShrink: 0, marginRight: "0.5rem" }}>Phone:</strong>
          <span className="ellipsis" style={{ maxWidth: "300px", display: "inline-block" }}>
            <a href="tel:+12532059208">(253) 205-9208</a>
          </span>
        </p>

        <p style={{ display: "flex", alignItems: "center" }}>
          <strong style={{ flexShrink: 0, marginRight: "0.5rem" }}>Email:</strong>
          <span className="ellipsis" style={{ maxWidth: "300px", display: "inline-block" }}>
            <a href="mailto:closetohomeafh@outlook.com">closetohomeafh@outlook.com</a>
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
      <header>
        <div className="header-text">
          <h1>Close to Home Adult Family Home</h1>
          <h4><i>Where Comfort Meets Compassion.</i></h4>
        </div>
      </header>

      <div className="tab-wrapper">
        <div className="tabs">
          {["about Us", "services", "contact Us", "gallery"].map((tab) => (
            <button
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.replace(/^\w/, (c) => c.toUpperCase())}
            </button>
          ))}
        </div>

        <div className="tab-container">
          {activeTab === "about Us" && (
            <div className="tab-content active">
              <h2>About Us</h2>
              <p>
                <strong>Close to Home Adult Family Home</strong> is owned and operated by a nurse with 7 years of experience in the health care field.
              </p>
              <p>
                We are compassionate and provide quality care in our home. By delivering professional and exceptional care to our residents, we stand out with an above-and-beyond experienced team.
              </p>
              <p>
                Our mission is to create <em>a safe, supportive, and enriching environment where every resident feels valued and respected</em>. We focus on individualized care plans, engaging activities, and emotional support to ensure the highest quality of life for those in our care.
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
                <li>🧠 Dementia Care</li>
                <li>⏳ Respite Care</li>
                <li>🏠 Assisted Living</li>
                <li>⚰️ Hospice Care</li>
                <li>🩺 Diabetes and Stroke Care</li>
                <li>📝 Nurse Assessment & Nurse Delegation</li>
              </ul>
            </div>
          )}

          {activeTab === "contact Us" && (
            <div className="tab-content active">
              <h2>Contact Us</h2>
              <ContactForm /> {/* Subject field included */}
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="tab-content active">
              <h2>Gallery</h2>
              <div
                className="slideshow-container"
                style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}
              >
                {slides.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Slide ${i + 1}`}
                    className={`slide ${i === slideIndex ? "active" : ""}`}
                    style={{
                      display: i === slideIndex ? "block" : "none",
                      width: "100%",
                      borderRadius: "8px",
                    }}
                  />
                ))}

                {/* Previous button */}
                <button
                  onClick={() =>
                    setSlideIndex((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "5px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "0.4rem 0.8rem",
                    cursor: "pointer",
                    zIndex: 10,
                    fontSize: "1.2rem",
                  }}
                >
                  &#10094;
                </button>

                {/* Next button */}
                <button
                  onClick={() => setSlideIndex((prev) => (prev + 1) % slides.length)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "5px",
                    transform: "translateY(-50%)",
                    background: "rgba(0,0,0,0.5)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    padding: "0.4rem 0.8rem",
                    cursor: "pointer",
                    zIndex: 10,
                    fontSize: "1.2rem",
                  }}
                >
                  &#10095;
                </button>
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
          <a href="tel:+12532059208">📞 Call Us</a>
          <a href="mailto:closetohomeafh@outlook.com">✉️ Email Us</a>
          <button onClick={() => setActiveTab("contact Us")}>📝 Contact Form</button>
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
