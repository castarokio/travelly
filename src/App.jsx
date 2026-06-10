import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  ArrowRight,
  CalendarDays,
  CircleUserRound,
  Compass,
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

function SplitHeading({ text, className = "" }) {
  return (
    <h2
      className={`split-heading-text ${className}`.trim()}
      aria-label={text}
    >
      {text.split(" ").map((word, index) => (
        <span
          className="split-word-mask"
          aria-hidden="true"
          key={`${word}-${index}`}
        >
          <span
            className="split-word"
            style={{ "--word-index": index }}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
}

const destinations = [
  {
    name: "Paris, France",
    region: "France",
    rating: "4.9",
    date: "12–18 May",
    price: "$180",
    image: image("photo-1502602898657-3e91760cbb34"),
  },
  {
    name: "Kyoto, Japan",
    region: "Japan",
    rating: "4.8",
    date: "18–24 Jun",
    price: "$260",
    image: image("photo-1493976040374-85c8e12f0c0e"),
  },
  {
    name: "Cairo, Egypt",
    region: "Egypt",
    rating: "4.8",
    date: "04–10 Sep",
    price: "$120",
    image: image("photo-1503177119275-0aa32b3a9368"),
  },
  {
    name: "Bali, Indonesia",
    region: "Indonesia",
    rating: "4.9",
    date: "14–20 Nov",
    price: "$140",
    image: image("photo-1537996194471-e657df975ab4"),
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

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Travelly home">
      <span className="logo-mark">
        <Compass size={16} aria-hidden="true" />
      </span>
      Travelly
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <Logo />
      <a className="app-pill" href="#newsletter">
        Get the app
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#top">Home</a>
        <a href="#story">About</a>
        <a href="#destinations">Packages</a>
        <a href="#reviews">Community</a>
      </nav>
      <a className="button button-coral desktop-signup" href="#newsletter">
        Sign up <ArrowRight size={15} aria-hidden="true" />
      </a>
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
              <Logo />
              <button
                className="icon-button"
                type="button"
                aria-label="Close navigation"
                onClick={() => setOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {["Home", "About", "Packages", "Community"].map((label) => (
              <a
                key={label}
                href={
                  label === "Home"
                    ? "#top"
                    : label === "About"
                      ? "#story"
                      : label === "Packages"
                        ? "#destinations"
                        : "#reviews"
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
            <a className="button button-primary mobile-signup" href="#newsletter">
              Sign up <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function BookingForm() {
  const [tab, setTab] = useState("Flight");
  const [status, setStatus] = useState("");
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      setStatus("Please complete each booking field.");
      form.reportValidity();
      return;
    }
    setStatus("Your options are ready to explore.");
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
            required
          />
        </label>
        <label className="booking-field">
          <span>
            <CalendarDays size={15} /> Check in
          </span>
          <input name="checkIn" type="date" min={today} required />
        </label>
        <label className="booking-field">
          <span>
            <CalendarDays size={15} /> Check out
          </span>
          <input name="checkOut" type="date" min={today} required />
        </label>
        <label className="booking-field">
          <span>
            <Users size={15} /> Who
          </span>
          <select name="guests" defaultValue="2" required>
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

function Hero() {
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
            <span
              className="hero-note-word"
              aria-hidden="true"
              style={{ "--word-index": index }}
              key={word}
            >
              {word}
            </span>
          ))}
          <Plane className="hero-note-plane" size={14} aria-hidden="true" />
        </p>
        <div className="traveler-proof">
          <div className="avatar-stack" aria-hidden="true">
            {[
              "photo-1494790108377-be9c29b29330",
              "photo-1500648767791-00dcc994a43e",
              "photo-1531123897727-8f129e1688ce",
            ].map((id) => (
              <img key={id} src={image(id, 80)} alt="" />
            ))}
          </div>
          <span className="trusted-copy" aria-label="Trusted by travelers worldwide">
            {trustedWords.map((word, index) => (
              <span
                className="trusted-word"
                aria-hidden="true"
                style={{ "--word-index": index }}
                key={word}
              >
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
      <BookingForm />
    </section>
  );
}

function Services() {
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
            <a
              className={service.number === "01" ? "button button-primary" : "button button-soft"}
              href="#destinations"
            >
              Learn more
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function Destinations() {
  const [active, setActive] = useState("Popular nearby");
  const filters = ["Popular nearby", "Islands", "Surfing", "National parks", "Lakes", "Beach", "Camp"];

  return (
    <section className="section destinations-section" id="destinations">
      <div className="section-heading split-heading">
        <h2 className="destinations-heading">
          Explore and unwind at the world’s top relaxing spots
        </h2>
        <p>
          Find a place that fits your pace, from quiet mountain mornings to
          color-soaked city evenings.
        </p>
      </div>
      <div className="filter-row" aria-label="Destination categories">
        <div className="filter-list">
          {filters.map((filter) => (
            <button
              type="button"
              key={filter}
              className={active === filter ? "active" : ""}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <button className="filter-button" type="button">
          Filter <Filter size={14} />
        </button>
      </div>
      <div className="destination-grid">
        {destinations.map((destination) => (
          <article className="destination-card" key={destination.name}>
            <div className="destination-image-wrap">
              <img src={destination.image} alt={`View of ${destination.name}`} />
            </div>
            <div className="destination-title">
              <div>
                <h3>{destination.name}</h3>
                <p>{destination.region}</p>
              </div>
              <span>
                <Star size={12} fill="currentColor" /> {destination.rating}
              </span>
            </div>
            <div className="destination-meta">
              <span>{destination.date}</span>
              <strong>
                {destination.price}
                <small>/night</small>
              </strong>
            </div>
          </article>
        ))}
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
          <img
            src={image("photo-1527631746610-bca00a040d60")}
            alt="Travelers resting beside a mountain lake"
          />
          <div>
            <h3>
              We provide tailored itineraries and exclusive services, whether
              you’re traveling solo or with a group.
            </h3>
            <p>
              Every route is shaped around how you want to feel, not a generic
              checklist.
            </p>
            <a className="button button-primary" href="#cta">
              Discover <ArrowRight size={14} />
            </a>
          </div>
        </article>
      </div>
      <div className="story-editorial">
        <h2>Discover excellence in travel, where every place feels better.</h2>
        <div className="editorial-row">
          <img
            src={image("photo-1464278533981-50106e6176b1", 700)}
            alt="Tent beneath dramatic mountain peaks"
          />
          <div>
            <Sparkles size={22} />
            <p>
              Your time away should feel personal. We pair expert local
              knowledge with quiet details that make the whole journey easier.
            </p>
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
          “This team genuinely transformed our vacation into a dream come true.
          Their warm planning and seamless service made every moment feel
          considered.”
        </blockquote>
        <cite>— Emma Johnson</cite>
        <div className="stars" aria-label="5 out of 5 stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} size={15} fill="currentColor" />
          ))}
        </div>
        <div className="review-avatars">
          {[
            "photo-1534528741775-53994a69daeb",
            "photo-1506794778202-cad84cf45f1d",
            "photo-1527980965255-d3b416303d12",
          ].map((id, index) => (
            <button key={id} type="button" aria-label={`Show traveler review ${index + 1}`}>
              <img src={image(id, 100)} alt="" />
            </button>
          ))}
        </div>
      </div>
      <div className="portrait-stack" aria-label="Featured traveler portrait">
        <span className="portrait-back portrait-back-one" />
        <span className="portrait-back portrait-back-two" />
        <img
          src={image("photo-1529139574466-a303027c1d8b", 800)}
          alt="Traveler wearing a sun hat"
        />
      </div>
    </section>
  );
}

function CTA() {
  const galleryRef = useRef(null);
  const gallery = [
    "photo-1507525428034-b723cf961d3e",
    "photo-1470770841072-f978cf4d019e",
    "photo-1500530855697-b586d89ba3ee",
    "photo-1500534314209-a25ddb2bd429",
    "photo-1483347756197-71ef80e95f73",
    "photo-1530789253388-582c481c54b0",
  ];

  useEffect(() => {
    const galleryElement = galleryRef.current;
    if (!galleryElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          galleryElement.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(galleryElement);
    return () => observer.disconnect();
  }, []);

  function tiltCard(event) {
    if (event.pointerType === "touch") return;

    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const rotateX = -(
      (event.clientY - bounds.top - bounds.height / 2) /
      10
    );
    const rotateY =
      (event.clientX - bounds.left - bounds.width / 2) / 10;

    card.style.transitionDelay = "0ms";
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.07)`;
    card.style.zIndex = "10";
  }

  function resetTilt(event) {
    event.currentTarget.style.transitionDelay = "0ms";
    event.currentTarget.style.transform = "";
    event.currentTarget.style.zIndex = "";
  }

  return (
    <section className="section cta-section" id="cta">
      <p className="eyebrow">Ready when you are</p>
      <h2>Start exploring now and turn your trip into an unforgettable journey!</h2>
      <p>
        Looking for a city escape, coastal reset, or a faraway adventure? Let’s
        make it happen.
      </p>
      <a className="button button-primary" href="#top">
        Book your seat <ArrowRight size={15} />
      </a>
      <div
        className="gallery-row"
        aria-label="Travel inspiration gallery"
        ref={galleryRef}
      >
        {gallery.map((id, index) => (
          <div
            key={id}
            className={`gallery-card gallery-${index + 1}`}
            onPointerMove={tiltCard}
            onPointerLeave={resetTilt}
          >
            <div className="gallery-float">
              <img
                src={image(id, 500)}
                alt=""
                loading="lazy"
                draggable="false"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
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
          <Logo />
          <p>
            Thoughtful travel planning for people who want more feeling and
            less friction from every journey.
          </p>
          <a className="button button-primary" href="#top">
            Join now <ArrowRight size={14} />
          </a>
        </div>
        <div>
          <h3>Links</h3>
          <a href="#top">Home</a>
          <a href="#story">About</a>
          <a href="#services">Services</a>
          <a href="#destinations">Packages</a>
        </div>
        <div>
          <h3>Contact</h3>
          <a href="mailto:hello@travelly.example">hello@travelly.example</a>
          <a href="tel:+12025550147">+1 202 555 0147</a>
          <span>Every day, 9:00–18:00</span>
        </div>
        <div>
          <h3>Newsletter</h3>
          <p>Monthly places, practical tips, and no inbox clutter.</p>
          <form className="newsletter-form" onSubmit={subscribe}>
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength="254"
              placeholder="Enter your email"
              required
            />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={16} />
            </button>
          </form>
          <p className="newsletter-status" aria-live="polite">
            {message}
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright © 2026 Travelly. All rights reserved.</span>
        <div className="social-links">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={15} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={15} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={15} />
          </a>
          <a href="mailto:hello@travelly.example" aria-label="Email Travelly">
            <Mail size={15} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const appRef = useRef(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          mobile: "(max-width: 700px)",
        },
        ({ conditions }) => {
          const { reduceMotion, mobile } = conditions;

          if (reduceMotion) {
            gsap.set(
              [
                ".hero-media",
                ".hero-note-word",
                ".hero-note-plane",
                ".avatar-stack img",
                ".trusted-word",
                ".hero-title-line",
                ".booking-shell",
                ".split-word",
              ],
              { clearProps: "all" },
            );
            return;
          }

          const ease = "power3.out";
          const heroTimeline = gsap.timeline({ defaults: { ease } });

          heroTimeline
            .fromTo(".page-shell", { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.65 })
            .from(
              ".site-header > .logo, .site-header > .app-pill, .desktop-nav, .desktop-signup",
              { autoAlpha: 0, y: -16, duration: 0.6, stagger: 0.06 },
              0.12,
            )
            .from(".hero-media", { scale: 1.04, duration: 1.8 }, 0.24)
            .from(
              ".hero-note-word",
              { autoAlpha: 0, y: 12, filter: "blur(4px)", duration: 0.58, stagger: 0.04 },
              0.52,
            )
            .from(
              ".hero-note-plane",
              { autoAlpha: 0, y: 8, rotate: -8, duration: 0.55 },
              0.7,
            )
            .from(
              ".avatar-stack img",
              { autoAlpha: 0, scale: 0.9, duration: 0.55, stagger: 0.08 },
              0.78,
            )
            .from(
              ".trusted-word",
              { autoAlpha: 0, y: 8, duration: 0.52, stagger: 0.045 },
              0.94,
            )
            .from(
              ".hero-title-line",
              {
                autoAlpha: 0,
                yPercent: 115,
                filter: "blur(8px)",
                duration: 1.05,
                stagger: 0.12,
              },
              1.05,
            )
            .from(
              ".booking-shell",
              { autoAlpha: 0, y: mobile ? 18 : 28, filter: "blur(8px)", duration: 0.75 },
              1.76,
            );

          gsap.from(".services-section .split-word", {
            scrollTrigger: {
              trigger: ".services-section",
              start: "top 78%",
              once: true,
            },
            autoAlpha: 0,
            yPercent: 105,
            filter: "blur(6px)",
            duration: 0.82,
            stagger: 0.055,
            ease,
          });

          gsap.from(".service-card", {
            scrollTrigger: {
              trigger: ".service-grid",
              start: "top 82%",
              once: true,
            },
            autoAlpha: 0,
            y: mobile ? 36 : 58,
            rotateX: mobile ? 0 : -8,
            transformOrigin: "center bottom",
            duration: 0.78,
            stagger: 0.13,
            ease,
          });

          gsap.from(".destinations-heading", {
            scrollTrigger: {
              trigger: ".destinations-section",
              start: "top 78%",
              once: true,
            },
            autoAlpha: 0,
            x: mobile ? -24 : -56,
            duration: 0.9,
            ease,
          });

          gsap.from(".destinations-section .section-heading > p", {
            scrollTrigger: {
              trigger: ".destinations-section",
              start: "top 78%",
              once: true,
            },
            autoAlpha: 0,
            x: mobile ? 20 : 46,
            duration: 0.82,
            delay: 0.12,
            ease,
          });

          gsap.from(".filter-row", {
            scrollTrigger: {
              trigger: ".filter-row",
              start: "top 88%",
              once: true,
            },
            autoAlpha: 0,
            scale: 0.97,
            duration: 0.65,
            ease,
          });

          gsap.from(".destination-card", {
            scrollTrigger: {
              trigger: ".destination-grid",
              start: "top 84%",
              once: true,
            },
            autoAlpha: 0,
            y: 42,
            duration: 0.75,
            stagger: 0.11,
            ease,
          });

          gsap.from(".destination-image-wrap img", {
            scrollTrigger: {
              trigger: ".destination-grid",
              start: "top 84%",
              once: true,
            },
            scale: 1.12,
            duration: 1.15,
            stagger: 0.11,
            ease: "power2.out",
          });

          gsap.from(".story-card-column", {
            scrollTrigger: {
              trigger: ".story-section",
              start: "top 76%",
              once: true,
            },
            autoAlpha: 0,
            x: mobile ? -28 : -78,
            duration: 0.95,
            ease,
          });

          gsap.from(".story-editorial", {
            scrollTrigger: {
              trigger: ".story-section",
              start: "top 76%",
              once: true,
            },
            autoAlpha: 0,
            x: mobile ? 28 : 78,
            duration: 0.95,
            delay: 0.12,
            ease,
          });

          gsap.from(".editorial-row img", {
            scrollTrigger: {
              trigger: ".editorial-row",
              start: "top 84%",
              once: true,
            },
            clipPath: "inset(0 0 100% 0 round 18px)",
            scale: 1.08,
            duration: 1.05,
            ease,
          });

          gsap.from(".editorial-row svg", {
            scrollTrigger: {
              trigger: ".editorial-row",
              start: "top 84%",
              once: true,
            },
            autoAlpha: 0,
            rotate: -35,
            scale: 0.6,
            duration: 0.7,
            delay: 0.45,
            ease: "back.out(1.7)",
          });

          gsap.from(".review-copy > *", {
            scrollTrigger: {
              trigger: ".reviews-section",
              start: "top 78%",
              once: true,
            },
            autoAlpha: 0,
            x: -28,
            duration: 0.68,
            stagger: 0.1,
            ease,
          });

          gsap.from(".portrait-stack img", {
            scrollTrigger: {
              trigger: ".reviews-section",
              start: "top 78%",
              once: true,
            },
            autoAlpha: 0,
            scale: 0.88,
            rotate: mobile ? 0 : -3,
            duration: 1,
            ease,
          });

          gsap.from(".portrait-back", {
            scrollTrigger: {
              trigger: ".reviews-section",
              start: "top 78%",
              once: true,
            },
            autoAlpha: 0,
            x: 48,
            duration: 0.9,
            stagger: 0.12,
            ease,
          });

          gsap.from(".cta-section > .eyebrow, .cta-section > h2, .cta-section > p, .cta-section > .button", {
            scrollTrigger: {
              trigger: ".cta-section",
              start: "top 76%",
              once: true,
            },
            autoAlpha: 0,
            y: 34,
            duration: 0.75,
            stagger: 0.1,
            ease,
          });

          gsap.from(".footer-grid > div", {
            scrollTrigger: {
              trigger: ".site-footer",
              start: "top 90%",
              once: true,
            },
            autoAlpha: 0,
            y: 28,
            duration: 0.7,
            stagger: 0.08,
            ease,
          });
        },
      );

      return () => media.revert();
    },
    { scope: appRef },
  );

  return (
    <div className="page-shell" ref={appRef}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Destinations />
        <Story />
        <Reviews />
        <CTA />
      </main>
      <Footer />
      <div className="security-note" title="Forms validate locally and no personal data is transmitted.">
        <ShieldCheck size={14} /> Secure by design
      </div>
    </div>
  );
}
