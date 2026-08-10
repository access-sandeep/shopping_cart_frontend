import { Link } from 'react-router-dom'
import './PageTheme.css'

function Home() {
  return (
    <section className="page-card home-page">
      <div className="home-hero">
        <div>
          <p className="eyebrow">Shop the latest trends</p>
          <h2 className="home-headline">Find great deals on the top brands you love.</h2>
          <p className="home-copy">
            Discover smartphones, fashion, smart TVs, and everyday essentials with fast delivery,
            curated offers, and easy checkout.
          </p>
        </div>
        <div className="hero-highlights">
          <Link to="/products" className="highlight-card highlight-link">
            <strong>50k+</strong>
            <p>Products in one place</p>
          </Link>
          <Link to="/products" className="highlight-card highlight-link">
            <strong>Express delivery</strong>
            <p>Across all major cities</p>
          </Link>
          <Link to="/cart" className="highlight-card highlight-link">
            <strong>Easy returns</strong>
            <p>Hassle-free exchange policy</p>
          </Link>
        </div>
      </div>

      <section className="home-section">
        <div className="section-header">
          <h3>Shop by category</h3>
          <p>Popular collections updated daily for style, tech, and home essentials.</p>
        </div>
        <div className="category-grid">
          <article className="category-card">
            <h4>iOS Mobiles</h4>
            <p>Sleek design. Powerful performance. Explore the latest iPhones and elevate your everyday.</p>
          </article>
          <article className="category-card">
            <h4>Android Mobiles</h4>
            <p>Endless choices, smart features, and ultimate flexibility across top Android brands.</p>
          </article>
          <article className="category-card">
            <h4>Smart TV</h4>
            <p>Big screen entertainment with apps, voice control, and cinema-quality displays.</p>
          </article>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h3>Why shop with us?</h3>
          <p>Trusted experiences modeled on the best online shopping destinations.</p>
        </div>
        <div className="benefit-grid">
          <article className="benefit-card">
            <h4>Daily deals</h4>
            <p>Fresh offers and discounts across electronics, fashion, and home essentials.</p>
          </article>
          <article className="benefit-card">
            <h4>Secure checkout</h4>
            <p>Multiple payment methods, secure billing, and easy order tracking.</p>
          </article>
          <article className="benefit-card">
            <h4>Top-rated service</h4>
            <p>Responsive support and reliable delivery for every order.</p>
          </article>
        </div>
      </section>
    </section>
  )
}

export default Home
