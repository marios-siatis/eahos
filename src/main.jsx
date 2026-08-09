import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {
    name: "Summon Earth",
    tagline: "Discover your Parallel Living Person",
    description:
      "A platform for personal growth and self-discovery. Set goals, track your journey and connect with people on similar paths.",
    icon: "◉",
    accent: "green",
    href: "https://summonearth.com"
  },
  {
    name: "EAHOS Music",
    tagline: "Organize your Playlists. Enjoy Music.",
    description:
      "AI-powered playlist management that discovers, organizes and delivers the perfect soundtrack for every moment.",
    icon: "♫",
    accent: "purple",
    href: "#"
  },
  {
    name: "Leckse",
    tagline: "Highlight the Web. Increase Productivity.",
    description:
      "Capture and save the most important ideas from anywhere on the web. Your highlights, all in one place.",
    icon: "▱",
    accent: "violet",
    href: "#"
  }
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="EAHOS home">
      <span className="logo-mark" aria-hidden="true">E</span>
      <span>EAHOS</span>
    </a>
  );
}

function App() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const update = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  async function submit(event) {
    event.preventDefault();
    setStatus({ type: "", text: "" });
    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to send message.");
      }

      setForm({ name: "", email: "", message: "" });
      setStatus({
        type: "success",
        text: "Thanks — your message has been sent to EAHOS."
      });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.message || "Something went wrong. Please try again."
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div id="top">
      <header className="nav">
        <Logo />
        <nav>
          <a href="#products">Products</a>
          <a href="#technology">Technology</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="button button-small" href="#contact">Contact Us <span>→</span></a>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">WE BUILD DIGITAL EXPERIENCES</p>
            <h1>Ideas into <em>experiences.</em></h1>
            <p className="hero-text">
              EAHOS is a software company focused on building innovative
              products that help people create, connect and live better lives.
            </p>
            <div className="hero-actions">
              <a className="button" href="#products">Explore Our Products <span>→</span></a>
              <a className="button button-outline" href="#about">About EAHOS</a>
            </div>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="orb"></div>
            <div className="e-shape"><i></i><i></i><i></i></div>
            <div className="grid-floor"></div>
          </div>
        </section>

        <section className="products section" id="products">
          <div className="section-heading">
            <div>
              <p className="eyebrow">OUR PRODUCTS</p>
              <h2>Products that solve real problems.</h2>
            </div>
            <span className="view-link">Our product portfolio →</span>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className={`product-icon ${product.accent}`}>{product.icon}</div>

                <div className="mock-window">
                  <div className="window-bar"><span></span><span></span><span></span></div>
                  <div className={`mock-content ${product.accent}`}>
                    {product.name === "Leckse" ? (
                      <>
                        <div className="mock-lines"></div>
                        <div className="highlight-line"></div>
                        <div className="mock-lines short"></div>
                        <div className="highlight-line small"></div>
                      </>
                    ) : product.name === "Summon Earth" ? (
                      <>
                        <div className="mock-stat"><b>24</b><small>Goals</small></div>
                        <div className="mock-stat"><b>128</b><small>Connections</small></div>
                        <div className="mock-stat"><b>78%</b><small>Progress</small></div>
                      </>
                    ) : (
                      <>
                        <div className="album"></div>
                        <div className="album"></div>
                        <div className="album"></div>
                      </>
                    )}
                  </div>
                </div>

                <h3>{product.name}</h3>
                <p className={`tagline ${product.accent}`}>{product.tagline}</p>
                <p className="description">{product.description}</p>

                <div className="chips">
                  <span>
                    {product.name === "Leckse"
                      ? "Chrome Extension"
                      : product.name === "Summon Earth"
                        ? "Community"
                        : "AI"}
                  </span>
                  <span>
                    {product.name === "Leckse"
                      ? "Knowledge"
                      : product.name === "Summon Earth"
                        ? "Goals"
                        : "Music"}
                  </span>
                  <span>{product.name === "Leckse" ? "Productivity" : "Cloud"}</span>
                </div>

                <a className="learn" href={product.href}>Learn more →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="pillars section" id="about">
          <p className="eyebrow">BUILT FOR TODAY. READY FOR TOMORROW.</p>
          <div className="pillar-grid">
            <div><b>✦</b><h3>Innovative Products</h3><p>We build solutions that solve real problems and make a lasting impact.</p></div>
            <div><b>♙</b><h3>Built for People</h3><p>Thoughtful design and meaningful experiences at every step.</p></div>
            <div><b>⌁</b><h3>Cloud Native</h3><p>Scalable, secure and reliable solutions built for modern infrastructure.</p></div>
            <div><b>◇</b><h3>Built to Last</h3><p>Quality code, strong architecture and a vision for the future.</p></div>
          </div>
        </section>

        <section className="technology section" id="technology">
          <p className="eyebrow">POWERED BY MODERN TECHNOLOGIES</p>
          <div className="tech-list">
            <span>.NET</span><span>React</span><span>AWS</span><span>PostgreSQL</span>
            <span>Docker</span><span>Lambda</span><span>CloudFront</span>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Have an idea?<br /><em>Let's build it.</em></h2>
            <p>Tell us what you're working on, what you're trying to solve, or just say hello.</p>
            <a href="mailto:contact@eahos.com">contact@eahos.com</a>
          </div>

          <form className="contact-form" onSubmit={submit}>
            <label>
              Name
              <input required name="name" value={form.name} onChange={update} placeholder="Your name" />
            </label>
            <label>
              Email
              <input required type="email" name="email" value={form.email} onChange={update} placeholder="contact@eahos.com" />
            </label>
            <label>
              Message
              <textarea required name="message" value={form.message} onChange={update} placeholder="Tell us about your idea..." rows="6" />
            </label>
            <button className="button" disabled={sending}>
              {sending ? "Sending..." : "Send Message →"}
            </button>
            {status.text && <p className={`form-status ${status.type}`}>{status.text}</p>}
          </form>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <Logo />
          <p>Building innovative products that turn ideas into experiences.</p>
          <a href="mailto:contact@eahos.com">contact@eahos.com</a>
        </div>
        <div>
          <h4>Company</h4>
          <a href="#about">About Us</a>
          <a href="#about">Our Mission</a>
          <a href="#contact">Contact</a>
        </div>
        <div>
          <h4>Products</h4>
          <a href="#products">Summon Earth</a>
          <a href="#products">EAHOS</a>
          <a href="#products">Leckse</a>
        </div>
        {/* <div>
          <h4>Resources</h4>
          <a href="#">Blog</a>
          <a href="#">Documentation</a>
          <a href="#">Privacy Policy</a>
        </div> */}
        <div className="copyright">© 2026 EAHOS. All rights reserved.</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
