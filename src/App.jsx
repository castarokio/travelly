import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  Compass,
  CreditCard,
  Facebook,
  Filter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Plane,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const image = (id, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const formatMoney = (amount) =>
  `${new Intl.NumberFormat("fr-DZ", { maximumFractionDigits: 0 }).format(amount)} DZD`;

const demoOffers = [
  {
    id: "paris-weekend",
    name: "Paris Weekend Escape",
    region: "France",
    category: "City break",
    duration: "4 days / 3 nights",
    date: "12-18 May",
    rating: "4.9",
    price: 48000,
    image: image("photo-1502602898657-3e91760cbb34"),
    summary:
      "A polished city package with boutique hotel stay, airport pickup, museum pass, and an evening Seine walk.",
    includes: ["Hotel breakfast", "Airport transfer", "Museum pass", "Local host support"],
    fees: { service: 6500, booking: 3000, taxes: 4200 },
  },
  {
    id: "kyoto-culture",
    name: "Kyoto Culture Trail",
    region: "Japan",
    category: "Culture",
    duration: "6 days / 5 nights",
    date: "18-24 Jun",
    rating: "4.8",
    price: 92000,
    image: image("photo-1493976040374-85c8e12f0c0e"),
    summary:
      "Temple walks, tea ceremony, rail guidance, and quiet ryokan nights for clients who want a refined Japan demo.",
    includes: ["Ryokan stay", "Tea ceremony", "Rail planning", "Guide check-ins"],
    fees: { service: 9500, booking: 4500, taxes: 7800 },
  },
  {
    id: "cairo-heritage",
    name: "Cairo Heritage Route",
    region: "Egypt",
    category: "Heritage",
    duration: "5 days / 4 nights",
    date: "04-10 Sep",
    rating: "4.8",
    price: 36000,
    image: image("photo-1503177119275-0aa32b3a9368"),
    summary:
      "Pyramids, Nile dinner, private transfers, and flexible support for a practical agency-style package.",
    includes: ["Private transfers", "Nile dinner", "Pyramid tour", "Document checklist"],
    fees: { service: 5200, booking: 2500, taxes: 3100 },
  },
  {
    id: "bali-reset",
    name: "Bali Reset Stay",
    region: "Indonesia",
    category: "Beach",
    duration: "7 days / 6 nights",
    date: "14-20 Nov",
    rating: "4.9",
    price: 58000,
    image: image("photo-1537996194471-e657df975ab4"),
    summary:
      "A slow island package with villa nights, beach club day, driver support, and airport meet-and-greet.",
    includes: ["Villa stay", "Driver support", "Beach club day", "Airport meet-and-greet"],
    fees: { service: 7000, booking: 3500, taxes: 5200 },
  },
];

const services = [
  {
    number: "01",
    title: "Flight Finder",
    text: "Compare routes across trusted carriers and find the right departure for your plans.",
    tone: "blue",
  },
  {
    number: "02",
    title: "Hotels Service",
    text: "Stay somewhere memorable with carefully selected hotels, villas, and hideaways.",
    tone: "orange",
  },
  {
    number: "03",
    title: "Visa Processing",
    text: "Get clear document guidance and practical support before your international trip.",
    tone: "green",
  },
];

const blankBooking = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  paymentMethod: "Card",
};

function getTotal(offer, guests = 1) {
  const guestCount = Number(guests) || 1;
  return offer.price * guestCount + offer.fees.service + offer.fees.booking + offer.fees.taxes;
}

function SplitHeading({ text, className = "" }) {
  return (
    <h2 className={`split-heading-text ${className}`.trim()} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="split-word-mask" aria-hidden="true" key={`${word}-${index}`}>
          <span className="split-word" style={{ "--word-index": index }}>
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
}

function Logo({ onNavigate }) {
  return (
    <button className="logo logo-button" type="button" onClick={() => onNavigate("home")} aria-label="Travelly home">
      <span className="logo-mark">
        <Compass size={16} aria-hidden="true" />
      </span>
      Travelly
    </button>
  );
}

function Header({ currentPage, onNavigate }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["home", "Home"],
    ["offers", "Offers"],
    ["booking", "Booking"],
  ];

  function navigate(page) {
    setOpen(false);
    onNavigate(page);
  }

  return (
    <header className="site-header">
      <Logo onNavigate={onNavigate} />
      <button className="app-pill" type="button" onClick={() => onNavigate("checkout")}>
        Demo checkout
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([page, label]) => (
          <button
            type="button"
            className={currentPage === page ? "active" : ""}
            key={page}
            onClick={() => onNavigate(page)}
          >
            {label}
          </button>
        ))}
      </nav>
      <button className="button button-coral desktop-signup" type="button" onClick={() => onNavigate("checkout")}>
        Book demo <ArrowRight size={15} aria-hidden="true" />
      </button>
      <button
        className="icon-button menu-button"
        type="button"
        aria-label="Open navigation"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <Menu size={21} />
      </button>
      {open && (
        <div className="mobile-nav-backdrop" onMouseDown={() => setOpen(false)}>
          <nav
            id="mobile-navigation"
            className="mobile-nav"
            aria-label="Mobile navigation"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mobile-nav-top">
              <Logo onNavigate={navigate} />
              <button className="icon-button" type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {navItems.map(([page, label]) => (
              <button type="button" className="mobile-nav-link" key={page} onClick={() => navigate(page)}>
                {label}
              </button>
            ))}
            <button className="button button-primary mobile-signup" type="button" onClick={() => navigate("checkout")}>
              Book demo <ArrowRight size={16} />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function BookingSearch({ initialData, onSearch }) {
  const [tab, setTab] = useState("Flight");
  const [status, setStatus] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = Object.fromEntries(new FormData(form));

    if (!form.checkValidity()) {
      setStatus("Please complete each booking field.");
      form.reportValidity();
      return;
    }

    if (formData.checkOut <= formData.checkIn) {
      setStatus("Check out must be after check in.");
      return;
    }

    setStatus("Great. Choose an offer and continue to checkout.");
    onSearch(formData);
  }

  return (
    <div className="booking-shell">
      <div className="booking-tabs" role="tablist" aria-label="Booking type">
        {["Flight", "Hotel", "Trip"].map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={tab === item}
            className={tab === item ? "active" : ""}
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label className="booking-field">
          <span>
            <MapPin size={15} /> Location
          </span>
          <input
            name="location"
            type="text"
            placeholder="Where are you going?"
            minLength="2"
            maxLength="80"
            autoComplete="off"
            defaultValue={initialData.location}
            required
          />
        </label>
        <label className="booking-field">
          <span>
            <CalendarDays size={15} /> Check in
          </span>
          <input name="checkIn" type="date" min={today} defaultValue={initialData.checkIn} required />
        </label>
        <label className="booking-field">
          <span>
            <CalendarDays size={15} /> Check out
          </span>
          <input name="checkOut" type="date" min={today} defaultValue={initialData.checkOut} required />
        </label>
        <label className="booking-field">
          <span>
            <Users size={15} /> Who
          </span>
          <select name="guests" defaultValue={initialData.guests} required>
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4+ guests</option>
          </select>
        </label>
        <button className="button button-primary search-button" type="submit">
          <Search size={16} /> Search
        </button>
      </form>
      <p className="form-status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}

function Hero({ bookingData, onSearch }) {
  const labelWords = ["It’s", "time", "to", "go"];
  const trustedWords = ["Trusted", "by", "travelers", "worldwide"];

  return (
    <section className="hero" id="top">
      <div className="hero-sky">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-orbit hero-orbit-one" />
        <div className="hero-orbit hero-orbit-two" />
        <p className="hero-note" aria-label="It’s time to go">
          {labelWords.map((word, index) => (
            <span className="hero-note-word" aria-hidden="true" style={{ "--word-index": index }} key={word}>
              {word}
            </span>
          ))}
          <Plane className="hero-note-plane" size={14} aria-hidden="true" />
        </p>
        <div className="traveler-proof">
          <div className="avatar-stack" aria-hidden="true">
            {["photo-1494790108377-be9c29b29330", "photo-1500648767791-00dcc994a43e", "photo-1531123897727-8f129e1688ce"].map((id) => (
              <img key={id} src={image(id, 80)} alt="" />
            ))}
          </div>
          <span className="trusted-copy" aria-label="Trusted by travelers worldwide">
            {trustedWords.map((word, index) => (
              <span className="trusted-word" aria-hidden="true" style={{ "--word-index": index }} key={word}>
                {word}
              </span>
            ))}
          </span>
        </div>
        <h1 aria-label="Don’t just imagine it, make it happen. Travel.">
          <span className="hero-line-mask" aria-hidden="true">
            <span className="hero-title-line">Don’t just imagine it,</span>
          </span>
          <span className="hero-line-mask" aria-hidden="true">
            <span className="hero-title-line">make it happen. Travel.</span>
          </span>
        </h1>
      </div>
      <BookingSearch initialData={bookingData} onSearch={onSearch} />
    </section>
  );
}

function Services({ onNavigate }) {
  return (
    <section className="section services-section" id="services">
      <div className="section-heading centered">
        <SplitHeading text="What services we provide to our customers." />
        <p>Plan every part of a remarkable journey in one thoughtful place.</p>
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.number}>
            <span className={`number-badge ${service.tone}`}>{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
            <button className={service.number === "01" ? "button button-primary" : "button button-soft"} type="button" onClick={() => onNavigate("offers")}>
              Learn more
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function OfferCard({ offer, onDetails, onBook }) {
  return (
    <article className="destination-card offer-card">
      <div className="destination-image-wrap">
        <img src={offer.image} alt={`View of ${offer.name}`} />
      </div>
      <div className="destination-title">
        <div>
          <h3>{offer.name}</h3>
          <p>{offer.region} · {offer.duration}</p>
        </div>
        <span>
          <Star size={12} fill="currentColor" /> {offer.rating}
        </span>
      </div>
      <p className="offer-summary">{offer.summary}</p>
      <div className="destination-meta">
        <span>{offer.date}</span>
        <strong>
          {formatMoney(offer.price)}
          <small>/guest</small>
        </strong>
      </div>
      <div className="offer-actions">
        <button className="button button-soft" type="button" onClick={() => onDetails(offer)}>
          Details
        </button>
        <button className="button button-primary" type="button" onClick={() => onBook(offer)}>
          Book now
        </button>
      </div>
    </article>
  );
}

function Destinations({ onDetails, onBook }) {
  const [active, setActive] = useState("All");
  const filters = ["All", "City break", "Culture", "Heritage", "Beach"];
  const visibleOffers = active === "All" ? demoOffers : demoOffers.filter((offer) => offer.category === active);

  return (
    <section className="section destinations-section" id="destinations">
      <div className="section-heading split-heading">
        <h2 className="destinations-heading">Explore offers with real demo fees and checkout flow</h2>
        <p>
          These packages are sample offers for customer demos. The checkout shows realistic pricing without charging money.
        </p>
      </div>
      <div className="filter-row" aria-label="Destination categories">
        <div className="filter-list">
          {filters.map((filter) => (
            <button type="button" key={filter} className={active === filter ? "active" : ""} onClick={() => setActive(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <button className="filter-button" type="button" aria-label="Demo filter">
          Filter <Filter size={14} />
        </button>
      </div>
      <div className="destination-grid">
        {visibleOffers.map((offer) => (
          <OfferCard offer={offer} onDetails={onDetails} onBook={onBook} key={offer.id} />
        ))}
      </div>
    </section>
  );
}

function DemoBookingDesk({ onNavigate }) {
  return (
    <section className="section booking-demo-section" id="booking-demo">
      <div className="demo-panel">
        <div>
          <p className="eyebrow">Demo system</p>
          <h2>Show customers the full booking path, not just the landing page.</h2>
          <p>
            The demo now includes offer browsing, customer details, phone and email capture, checkout fees, payment method preview, and a confirmation screen.
          </p>
        </div>
        <div className="demo-steps" aria-label="Booking demo steps">
          {["Choose offer", "Add customer info", "Review fees", "Confirm booking"].map((step, index) => (
            <span key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              {step}
            </span>
          ))}
        </div>
        <button className="button button-primary" type="button" onClick={() => onNavigate("offers")}>
          Open offers <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section story-section" id="story">
      <div className="story-card-column">
        <div className="mini-tags">
          <span>Travel</span>
          <span>Tourism</span>
          <span>Best place</span>
        </div>
        <article className="story-card">
          <img src={image("photo-1527631746610-bca00a040d60")} alt="Travelers resting beside a mountain lake" />
          <div>
            <h3>We provide tailored itineraries and exclusive services, whether you’re traveling solo or with a group.</h3>
            <p>Every route is shaped around how you want to feel, not a generic checklist.</p>
          </div>
        </article>
      </div>
      <div className="story-editorial">
        <h2>Discover excellence in travel, where every place feels better.</h2>
        <div className="editorial-row">
          <img src={image("photo-1464278533981-50106e6176b1", 700)} alt="Tent beneath dramatic mountain peaks" />
          <div>
            <Sparkles size={22} />
            <p>Your time away should feel personal. We pair expert local knowledge with quiet details that make the whole journey easier.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section reviews-section" id="reviews">
      <div className="review-copy">
        <p className="eyebrow">Client review</p>
        <blockquote>
          “This team genuinely transformed our vacation into a dream come true. Their warm planning and seamless service made every moment feel considered.”
        </blockquote>
        <cite>- Emma Johnson</cite>
        <div className="stars" aria-label="5 out of 5 stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={15} fill="currentColor" />
          ))}
        </div>
      </div>
      <div className="portrait-stack" aria-label="Featured traveler portrait">
        <span className="portrait-back portrait-back-one" />
        <span className="portrait-back portrait-back-two" />
        <img src={image("photo-1529139574466-a303027c1d8b", 800)} alt="Traveler wearing a sun hat" />
      </div>
    </section>
  );
}

function CTA({ onNavigate }) {
  return (
    <section className="section cta-section" id="cta">
      <p className="eyebrow">Ready when you are</p>
      <h2>Start exploring now and turn your trip into an unforgettable journey!</h2>
      <p>Looking for a city escape, coastal reset, or a faraway adventure? Let’s make it happen.</p>
      <button className="button button-primary" type="button" onClick={() => onNavigate("checkout")}>
        Book your seat <ArrowRight size={15} />
      </button>
    </section>
  );
}

function OfferDetailsPage({ offer, onBack, onBook }) {
  return (
    <section className="page-section offer-detail-page">
      <button className="back-button" type="button" onClick={onBack}>
        <ArrowLeft size={16} /> Back to offers
      </button>
      <div className="offer-detail-hero">
        <img src={offer.image} alt={`View of ${offer.name}`} />
        <div className="offer-detail-copy">
          <p className="eyebrow">{offer.category}</p>
          <h1>{offer.name}</h1>
          <p>{offer.summary}</p>
          <div className="offer-detail-stats">
            <span>{offer.duration}</span>
            <span>{offer.date}</span>
            <span>{offer.rating} rating</span>
          </div>
          <button className="button button-primary" type="button" onClick={() => onBook(offer)}>
            Continue to booking <ArrowRight size={15} />
          </button>
        </div>
      </div>
      <div className="offer-detail-grid">
        <div>
          <h2>What is included</h2>
          <ul className="included-list">
            {offer.includes.map((item) => (
              <li key={item}>
                <Check size={15} /> {item}
              </li>
            ))}
          </ul>
        </div>
        <PriceSummary offer={offer} guests="2" />
      </div>
    </section>
  );
}

function PriceSummary({ offer, guests }) {
  const guestCount = Number(guests) || 1;

  return (
    <aside className="price-summary" aria-label="Price summary">
      <h3>Demo fee summary</h3>
      <dl>
        <div>
          <dt>Package fee ({guestCount} guest{guestCount > 1 ? "s" : ""})</dt>
          <dd>{formatMoney(offer.price * guestCount)}</dd>
        </div>
        <div>
          <dt>Travelly service fee</dt>
          <dd>{formatMoney(offer.fees.service)}</dd>
        </div>
        <div>
          <dt>Booking handling</dt>
          <dd>{formatMoney(offer.fees.booking)}</dd>
        </div>
        <div>
          <dt>Estimated taxes</dt>
          <dd>{formatMoney(offer.fees.taxes)}</dd>
        </div>
        <div className="total-row">
          <dt>Total demo amount</dt>
          <dd>{formatMoney(getTotal(offer, guests))}</dd>
        </div>
      </dl>
      <p>This is a demo checkout. No payment is processed.</p>
    </aside>
  );
}

function CheckoutPage({ selectedOffer, bookingData, onUpdateBooking, onConfirmed, onChooseOffer }) {
  const [message, setMessage] = useState("");
  const offer = selectedOffer || demoOffers[0];
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (!form.checkValidity()) {
      setMessage("Please complete the highlighted customer and trip fields.");
      form.reportValidity();
      return;
    }

    if (data.checkOut <= data.checkIn) {
      setMessage("Check out must be after check in.");
      return;
    }

    const reference = `TVL-${Math.floor(100000 + Math.random() * 900000)}`;
    onUpdateBooking(data);
    onConfirmed({ offer, booking: data, reference, total: getTotal(offer, data.guests) });
  }

  return (
    <section className="page-section checkout-page">
      <div className="checkout-heading">
        <div>
          <p className="eyebrow">Checkout demo</p>
          <h1>Customer booking form</h1>
          <p>Add the customer’s name, phone number, email, travel dates, and payment choice to show how the agency flow works.</p>
        </div>
        <button className="button button-soft" type="button" onClick={onChooseOffer}>
          Change offer
        </button>
      </div>
      <div className="checkout-layout">
        <form className="customer-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Customer information</legend>
            <label>
              Full name
              <input name="fullName" type="text" minLength="3" maxLength="80" autoComplete="name" defaultValue={bookingData.fullName} required />
            </label>
            <label>
              Phone number
              <input name="phone" type="tel" minLength="7" maxLength="24" autoComplete="tel" placeholder="+1 202 555 0147" defaultValue={bookingData.phone} required />
            </label>
            <label>
              Email address
              <input name="email" type="email" maxLength="254" autoComplete="email" placeholder="customer@example.com" defaultValue={bookingData.email} required />
            </label>
          </fieldset>
          <fieldset>
            <legend>Trip details</legend>
            <label>
              Destination
              <input name="location" type="text" minLength="2" maxLength="80" defaultValue={bookingData.location || offer.region} required />
            </label>
            <div className="form-pair">
              <label>
                Check in
                <input name="checkIn" type="date" min={today} defaultValue={bookingData.checkIn} required />
              </label>
              <label>
                Check out
                <input name="checkOut" type="date" min={today} defaultValue={bookingData.checkOut} required />
              </label>
            </div>
            <div className="form-pair">
              <label>
                Guests
                <select name="guests" defaultValue={bookingData.guests} required>
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
              </label>
              <label>
                Payment method
                <select name="paymentMethod" defaultValue={bookingData.paymentMethod} required>
                  <option value="Card">Card demo</option>
                  <option value="Bank transfer">Bank transfer</option>
                  <option value="Office payment">Office payment</option>
                </select>
              </label>
            </div>
          </fieldset>
          <div className="payment-preview">
            <CreditCard size={18} />
            <span>Demo payment only. This screen shows fees and booking confirmation without charging the customer.</span>
          </div>
          <p className="checkout-message" aria-live="polite">{message}</p>
          <button className="button button-primary submit-booking" type="submit">
            Confirm demo booking <ArrowRight size={16} />
          </button>
        </form>
        <div className="checkout-side">
          <OfferCard offer={offer} onDetails={() => {}} onBook={() => {}} />
          <PriceSummary offer={offer} guests={bookingData.guests} />
        </div>
      </div>
    </section>
  );
}

function ConfirmationPage({ confirmation, onStartOver }) {
  return (
    <section className="page-section confirmation-page">
      <div className="confirmation-card">
        <span className="confirmation-icon">
          <Check size={28} />
        </span>
        <p className="eyebrow">Demo confirmed</p>
        <h1>Booking request received</h1>
        <p>
          Reference {confirmation.reference} for {confirmation.booking.fullName}. A real system would now send confirmation by email and notify the agency team.
        </p>
        <div className="confirmation-grid">
          <span>
            <strong>Offer</strong>
            {confirmation.offer.name}
          </span>
          <span>
            <strong>Customer</strong>
            {confirmation.booking.phone}
          </span>
          <span>
            <strong>Email</strong>
            {confirmation.booking.email}
          </span>
          <span>
            <strong>Total</strong>
            {formatMoney(confirmation.total)}
          </span>
        </div>
        <button className="button button-primary" type="button" onClick={onStartOver}>
          Start another booking
        </button>
      </div>
    </section>
  );
}

function HomePage({ bookingData, onSearch, onNavigate, onDetails, onBook }) {
  return (
    <>
      <Hero bookingData={bookingData} onSearch={onSearch} />
      <Services onNavigate={onNavigate} />
      <Destinations onDetails={onDetails} onBook={onBook} />
      <DemoBookingDesk onNavigate={onNavigate} />
      <Story />
      <Reviews />
      <CTA onNavigate={onNavigate} />
    </>
  );
}

function OffersPage({ onDetails, onBook }) {
  return (
    <section className="page-section offers-page">
      <div className="checkout-heading">
        <div>
          <p className="eyebrow">Offers page</p>
          <h1>Bookable demo packages</h1>
          <p>Use this page to show customers how package browsing, prices, fees, and checkout connect.</p>
        </div>
      </div>
      <div className="destination-grid offers-grid">
        {demoOffers.map((offer) => (
          <OfferCard offer={offer} onDetails={onDetails} onBook={onBook} key={offer.id} />
        ))}
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  const [message, setMessage] = useState("");

  function subscribe(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setMessage("Enter a valid email address.");
      form.reportValidity();
      return;
    }
    setMessage("You’re on the list. Welcome aboard.");
    form.reset();
  }

  return (
    <footer className="site-footer" id="newsletter">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo onNavigate={onNavigate} />
          <p>Thoughtful travel planning for people who want more feeling and less friction from every journey.</p>
          <button className="button button-primary" type="button" onClick={() => onNavigate("checkout")}>
            Join now <ArrowRight size={14} />
          </button>
        </div>
        <div>
          <h3>Links</h3>
          <button type="button" onClick={() => onNavigate("home")}>Home</button>
          <button type="button" onClick={() => onNavigate("offers")}>Offers</button>
          <button type="button" onClick={() => onNavigate("checkout")}>Booking</button>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@travelly.example">hello@travelly.example</a>
          <a href="tel:+12025550147">+1 202 555 0147</a>
          <span>Every day, 9:00-18:00</span>
        </div>
        <div>
          <h3>Newsletter</h3>
          <p>Monthly places, practical tips, and no inbox clutter.</p>
          <form className="newsletter-form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">Email address</label>
            <input id="newsletter-email" name="email" type="email" inputMode="email" autoComplete="email" maxLength="254" placeholder="Enter your email" required />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={16} />
            </button>
          </form>
          <p className="newsletter-status" aria-live="polite">{message}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2026 Travelly. All rights reserved.</span>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={15} /></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook size={15} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Linkedin size={15} /></a>
          <a href="mailto:hello@travelly.example" aria-label="Email Travelly"><Mail size={15} /></a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const appRef = useRef(null);
  const [page, setPage] = useState("home");
  const [bookingData, setBookingData] = useState(blankBooking);
  const [selectedOffer, setSelectedOffer] = useState(demoOffers[0]);
  const [confirmation, setConfirmation] = useState(null);

  function navigate(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openOffer(offer) {
    setSelectedOffer(offer);
    navigate("offer");
  }

  function bookOffer(offer) {
    setSelectedOffer(offer);
    setBookingData((current) => ({
      ...current,
      location: current.location || offer.region,
    }));
    navigate("checkout");
  }

  function searchOffers(data) {
    setBookingData((current) => ({ ...current, ...data }));
    navigate("offers");
  }

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          mobile: "(max-width: 700px)",
          desktop: "(min-width: 901px) and (hover: hover) and (pointer: fine)",
        },
        ({ conditions }) => {
          const { reduceMotion, mobile, desktop } = conditions;

          if (reduceMotion) return;

          const ease = "power3.out";
          const heroTimeline = gsap.timeline({ defaults: { ease } });

          heroTimeline
            .fromTo(".page-shell", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65 })
            .from(".site-header > *", { autoAlpha: 0, y: -16, duration: 0.6, stagger: 0.05 }, 0.12)
            .from(".hero-media", { scale: 1.04, duration: 1.8 }, 0.24)
            .from(".hero-note-word, .trusted-word", { autoAlpha: 0, y: 10, duration: 0.5, stagger: 0.035 }, 0.52)
            .from(".hero-title-line", { autoAlpha: 0, yPercent: 115, filter: "blur(8px)", duration: 1.05, stagger: 0.12 }, 0.98)
            .from(".booking-shell", { autoAlpha: 0, y: mobile ? 18 : 28, filter: "blur(8px)", duration: 0.75 }, 1.6);

          gsap.utils.toArray(".section, .page-section").forEach((section) => {
            gsap.from(section, {
              scrollTrigger: { trigger: section, start: "top 86%", once: true },
              autoAlpha: 0,
              y: mobile ? 28 : 42,
              duration: 0.75,
              ease,
            });
          });

          if (!desktop) return;

          gsap.to(".hero-orbit-one", { rotate: 8, scale: 1.035, duration: 12, repeat: -1, yoyo: true, ease: "sine.inOut" });
          gsap.to(".hero-orbit-two", { rotate: -6, scale: 1.025, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });

          const hero = appRef.current?.querySelector(".hero-sky");
          const heroMediaX = gsap.quickTo(".hero-media", "x", { duration: 0.8, ease });
          const heroTitleX = gsap.quickTo(".hero h1", "x", { duration: 0.75, ease });

          const moveHero = (event) => {
            if (!hero) return;
            const bounds = hero.getBoundingClientRect();
            const progress = (event.clientX - bounds.left) / bounds.width - 0.5;
            heroMediaX(progress * 14);
            heroTitleX(progress * -12);
          };

          const resetHero = () => {
            heroMediaX(0);
            heroTitleX(0);
          };

          hero?.addEventListener("pointermove", moveHero);
          hero?.addEventListener("pointerleave", resetHero);

          return () => {
            hero?.removeEventListener("pointermove", moveHero);
            hero?.removeEventListener("pointerleave", resetHero);
          };
        },
      );

      return () => media.revert();
    },
    { scope: appRef },
  );

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [page]);

  return (
    <div className="page-shell" ref={appRef}>
      <Header currentPage={page} onNavigate={navigate} />
      <main>
        {page === "home" && (
          <HomePage
            bookingData={bookingData}
            onSearch={searchOffers}
            onNavigate={navigate}
            onDetails={openOffer}
            onBook={bookOffer}
          />
        )}
        {page === "offers" && <OffersPage onDetails={openOffer} onBook={bookOffer} />}
        {page === "offer" && <OfferDetailsPage offer={selectedOffer} onBack={() => navigate("offers")} onBook={bookOffer} />}
        {page === "checkout" && (
          <CheckoutPage
            selectedOffer={selectedOffer}
            bookingData={bookingData}
            onUpdateBooking={(data) => setBookingData((current) => ({ ...current, ...data }))}
            onConfirmed={(nextConfirmation) => {
              setConfirmation(nextConfirmation);
              navigate("confirmation");
            }}
            onChooseOffer={() => navigate("offers")}
          />
        )}
        {page === "confirmation" && confirmation && (
          <ConfirmationPage
            confirmation={confirmation}
            onStartOver={() => {
              setConfirmation(null);
              setBookingData(blankBooking);
              navigate("home");
            }}
          />
        )}
      </main>
      <Footer onNavigate={navigate} />
      <div className="security-note" title="Forms validate locally and no personal data is transmitted.">
        <ShieldCheck size={14} /> Demo only
      </div>
    </div>
  );
}
