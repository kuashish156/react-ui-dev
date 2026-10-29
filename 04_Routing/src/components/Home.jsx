import { Link } from "react-router-dom";

const features = [
  {
    icon: "⚡",
    title: "Fast Performance",
    description:
      "Built with modern tools like React and Vite for a smooth, fast experience.",
    color: "blue",
  },
  {
    icon: "🛡️",
    title: "Secure & Reliable",
    description:
      "Create dependable applications with security and reliability in mind.",
    color: "green",
  },
  {
    icon: "▣",
    title: "Responsive Design",
    description:
      "Enjoy a consistent experience on mobile, tablet, laptop, and desktop.",
    color: "cyan",
  },
  {
    icon: "♡",
    title: "Developer Friendly",
    description:
      "Clean interfaces and simple navigation help you build and explore faster.",
    color: "pink",
  },
];

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">✨ Build Better Web Experiences</span>

          <h1>
            Welcome to
            <span className="gradient-text"> Routemate</span>
          </h1>

          <p className="hero-description">
            Your one-stop destination for modern web experiences. Explore our
            products, get in touch, and build something amazing with us.
          </p>

          <div className="hero-actions">
            <Link to="/Product" className="btn btn-primary">
              Explore Products <span>→</span>
            </Link>

            <Link to="/Contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>

          <div className="hero-trust">
            <span className="trust-dot"></span>
            Simple. Modern. Developer friendly.
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-glow"></div>

          <div className="visual-card">
            <div className="visual-topbar">
              <div className="window-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span>routemate.dev</span>
            </div>

            <div className="visual-body">
              <div className="visual-brand">
                <span className="brand-symbol">R</span>
                <span>Routemate</span>
              </div>

              <span className="visual-label">YOUR NEXT PROJECT</span>

              <h2>Ideas into reality.</h2>

              <p>Build, explore, and create better digital experiences.</p>

              <div className="visual-progress">
                <span></span>
              </div>

              <div className="visual-footer">
                <span>Project status</span>
                <strong>Ready to launch ✓</strong>
              </div>
            </div>
          </div>

          <div className="floating-card floating-card-top">
            <span>✦</span> Creative ideas
          </div>

          <div className="floating-card floating-card-bottom">
            <span>✓</span> Built for everyone
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-heading">
          <span className="section-eyebrow">WHY ROUTEMATE?</span>
          <h2>Everything you need to get started</h2>
          <p>
            A simple, thoughtful experience designed for modern developers and
            users.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <article className="feature-card" key={feature.title}>
              <div className={`feature-icon ${feature.color}`}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-arrow">↗</span>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div>
          <span className="cta-eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h2>Ready to get started?</h2>
          <p>
            Explore our products and discover what you can build with Routemate.
          </p>
        </div>

        <Link to="/Product" className="btn cta-button">
          Get Started <span>→</span>
        </Link>
      </section>
    </div>
  );
}

export default Home;
