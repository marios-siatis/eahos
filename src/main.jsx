import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const products = [
  {
    name: "Leckse",
    tagline: "Highlight the web. Remember more.",
    description:
      "A Chrome extension that lets you highlight any website and save it to your personal library. Discover the most important insights from thousands of users around the world.",
    icon: "▱",
    accent: "violet",
    tags: ["Chrome Extension", "Productivity", "Knowledge"],
    href: "#"
  },
  {
    name: "Summon Earth",
    tagline: "Live Your Parallel Life",
    description:
      "Connect with a people who share similar life paths.",
    icon: "◉",
    accent: "green",
    tags: ["Goals", "Community", "Progress", "Mindset"],
    href: "https://summonearth.com"
  },
  {
    name: "EAHOS Music",
    tagline: "Smarter Playlists. Better Music.",
    description:
      "AI-powered playlist management that helps you discover, organize and enjoy music that matches your mood and moment.",
    icon: "♫",
    accent: "orange",
    tags: ["AI Recommendations", "Music", "Playlists"],
    href: "#"
  }
];

const technologies = [
  { name: ".NET", logo: "https://cdn.simpleicons.org/dotnet/512BD4" },
  { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
  { name: "Lambda", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "CloudFront", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" }
];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="EAHOS home">
      <span className="logo-mark" aria-hidden="true">E</span>
      <span>EAHOS</span>
    </a>
  );
}

function ProductIcon({ product }) {
  if (product.name === "Leckse") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M14 9.5h20v29L24 31l-10 7.5v-29Z" />
        <path d="M18 14h12" />
      </svg>
    );
  }

  if (product.name === "Summon Earth") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="15" />
        <path d="M9 24h30M24 9c5 4 7 9 7 15s-2 11-7 15c-5-4-7-9-7-15s2-11 7-15ZM12 17h24M12 31h24" />
      </svg>
    );
  }

  return product.icon;
}

function PillarIcon({ type }) {
  const common = { viewBox: "0 0 48 48", "aria-hidden": true };

  if (type === "people") {
    return <svg {...common}><circle cx="24" cy="15" r="5" /><circle cx="11" cy="20" r="4" /><circle cx="37" cy="20" r="4" /><path d="M16 35v-3c0-5 3.5-8 8-8s8 3 8 8v3M3 37v-2c0-4 3-7 7-7s7 3 7 7M28 35v-2c0-4 3-7 7-7s7 3 7 7" /></svg>;
  }
  if (type === "privacy") {
    return <svg {...common}><path d="M24 5 38 11v10c0 10-6 17-14 21-8-4-14-11-14-21V11l14-6Z" /><path d="m18 24 4 4 8-9" /></svg>;
  }
  if (type === "improving") {
    return <svg {...common}><path d="m29 4-18 24h12l-4 16 18-25H25l4-15Z" /></svg>;
  }
  return <svg {...common}><circle cx="24" cy="24" r="18" /><path d="M6 24h36M24 6c6 5 9 11 9 18s-3 13-9 18c-6-5-9-11-9-18S18 11 24 6ZM9 15h30M9 33h30" /></svg>;
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
        text: "Thanks! Your message has been sent to EAHOS."
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
            {/* <span className="view-link">Our product portfolio →</span> */}
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-heading">
                  <div className={`product-icon ${product.accent}`}><ProductIcon product={product} /></div>
                  <div>
                    <h3>{product.name}</h3>
                    <p className={`tagline ${product.accent}`}>{product.tagline}</p>
                  </div>
                </div>

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
                        <div className="summon-banner"><span>Good morning, Alex</span></div>
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

                <p className="description">{product.description}</p>

                <div className="chips">
                  {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>

                <a className="learn" href={product.href}>Learn more →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="pillars section" id="about">
          <p className="eyebrow">BUILT FOR MODERN NEEDS</p>
          <div className="pillar-grid">
            <div className="pillar"><PillarIcon type="people" /><div><h3>Built for People</h3><p>Meaningful experiences<br />that make a difference.</p></div></div>
            <div className="pillar"><PillarIcon type="privacy" /><div><h3>Privacy First</h3><p>Your data. Your control.</p></div></div>
            <div className="pillar"><PillarIcon type="improving" /><div><h3>Always Improving</h3><p>Built with modern<br />technologies.</p></div></div>
            <div className="pillar"><PillarIcon type="scale" /><div><h3>Made to Scale</h3><p>Ready for today.<br />Built for tomorrow.</p></div></div>
          </div>
        </section>

        <section className="technology section" id="technology">
          <p className="eyebrow">POWERED BY MODERN TECHNOLOGIES</p>
          <div className="tech-list">
            {technologies.map((technology) => (
              <div className="tech-item" key={technology.name}>
                <img
                  className="tech-logo"
                  src={technology.logo}
                  alt=""
                  loading="lazy"
                  onError={(event) => { event.currentTarget.hidden = true; }}
                />
                <span>{technology.name}</span>
              </div>
            ))}
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
              <input required type="email" name="email" value={form.email} onChange={update} placeholder="you@example.com" />
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
