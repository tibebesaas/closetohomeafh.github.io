import { useState, useRef, useEffect } from "react";

export default function ContactFloat() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div id="contact-float">
      <button
        ref={buttonRef}
        id="contact-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Contact Options"
      >
        <span className="icon">{open ? "✖" : "💬"}</span>
      </button>

      {open && (
        <div
          id="contact-menu"
          ref={menuRef}
          style={{ display: "block" }}
        >
          <a href="tel:+14252384326">📞 Call Us</a>
          <a href="mailto:bloominglifeafh@gmail.com">✉️ Email Us</a>
          <a href="#contact">📝 Contact Form</a>
        </div>
      )}
    </div>
  );
}
