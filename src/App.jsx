import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import steelFlower from "./assets/steel-flower.webp";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Cloud,
  Code2,
  Coffee,
  Database,
  Download,
  Github,
  LoaderCircle,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  ShoppingBag,
  Sun,
  X,
} from "lucide-react";
import {
  siBun,
  siClerk,
  siContentful,
  siDocker,
  siExpo,
  siExpress,
  siFramer,
  siGit,
  siGithub,
  siLinux,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPnpm,
  siPostgresql,
  siPrisma,
  siReact,
  siRedux,
  siSanity,
  siTailwindcss,
  siTypescript,
  siVercel,
  siZod,
} from "simple-icons";
import "./App.css";

const contactEmail =
  import.meta.env.VITE_CONTACT_EMAIL || "ashishrajak5005@gmail.com";
const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_ERROR_MESSAGE =
  "Something went wrong while sending your message. Please try again.";

const isValidEmail = (email) => {
  const input = document.createElement("input");
  input.type = "email";
  input.value = email;
  return input.validity.valid;
};

const navigation = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Ashishrajak1",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ashish-rajak/",
    icon: Linkedin,
  },
  {
    label: "Email",
    href: `mailto:${contactEmail}`,
    icon: Mail,
  },
];

const skills = [
  { name: "ReactJS", icon: siReact },
  { name: "NextJS", icon: siNextdotjs, monochrome: true },
  { name: "TypeScript", icon: siTypescript },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "Motion", icon: siFramer },
  { name: "Sanity", icon: siSanity },
  { name: "Contentful", icon: siContentful },
  { name: "NodeJS", icon: siNodedotjs },
  { name: "ExpressJS", icon: siExpress, monochrome: true },
  { name: "PostgreSQL", icon: siPostgresql },
  { name: "MongoDB", icon: siMongodb },
  { name: "Prisma", icon: siPrisma },
  { name: "Zustand", icon: siRedux },
  { name: "Zod", icon: siZod },
  { name: "pnpm", icon: siPnpm },
  { name: "Bun", icon: siBun, monochrome: true },
  { name: "Git", icon: siGit },
  { name: "GitHub", icon: siGithub, monochrome: true },
  { name: "Vercel", icon: siVercel, monochrome: true },
  { name: "AWS", icon: Cloud, color: "FF9900" },
  { name: "Docker", icon: siDocker },
  { name: "Expo", icon: siExpo, monochrome: true },
  { name: "Clerk", icon: siClerk },
  { name: "Linux", icon: siLinux },
];

const projects = [
  {
    number: "01",
    title: "Elites Capital",
    subtitle: "Investment platform",
    description:
      "A full-stack investment platform with secure, role-based dashboards and workflows for complex financial transactions.",
    icon: Database,
    period: "2025",
    technologies: ["React.js", "Node.js", "Redux", "MySQL"],
    features: [
      "Admin, investor, and user roles",
      "JWT authentication",
      "Investment and payment workflows",
      "Financial transaction data",
    ],
    link: "https://elitescapital.com/",
  },
  {
    number: "02",
    title: "CRM Platform",
    subtitle: "Enterprise CRM",
    description:
      "A centralized CRM with role-based dashboards for contact management, sales pipeline tracking, and reporting.",
    icon: BriefcaseBusiness,
    period: "2025",
    technologies: ["React.js", "PHP", "CodeIgniter 4", "MySQL"],
    features: [
      "Contact management",
      "Sales pipeline tracking",
      "Role-based dashboards",
      "JWT authentication",
    ],
  },
  {
    number: "03",
    title: "Anahee",
    subtitle: "E-commerce clothing application",
    description:
      "A full-stack clothing store with PhonePe payments and Shiprocket shipping, fulfillment, tracking, and notifications.",
    icon: ShoppingBag,
    period: "2023–2025",
    technologies: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "MySQL",
    ],
    features: [
      "PhonePe payment integration",
      "Shiprocket shipping and tracking",
      "Product, inventory, and order admin",
      "Optimized page-load performance",
    ],
    link: "https://anahee.in/",
  },
  {
    number: "04",
    title: "Coffee Station",
    subtitle: "Real-time order management",
    description:
      "A live order-management system keeping customer, staff, and admin experiences in sync.",
    icon: Coffee,
    period: "2023–2025",
    technologies: ["React.js", "Firebase", "Node.js", "Express.js"],
    features: [
      "Customer, staff, and admin roles",
      "Live order tracking",
      "Firebase Realtime Database",
      "Real-time order notifications",
    ],
  },
];

const experience = [
  {
    role: "Full-Stack Developer",
    company: "Anaxee Digital Runners Private Limited",
    period: "Mar 2026 — Present",
    summary:
      "Architecting and developing full-stack features, translating business requirements into maintainable workflows.",
    highlights: [
      "Integrating message brokers and queue-based processing for asynchronous, high-volume workloads.",
      "Building scalable applications through efficient architecture and performance tuning.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Elites Capital",
    period: "Jun 2025 — Mar 2026",
    summary:
      "Delivered an investment platform and enterprise CRM with secure access control and role-specific experiences.",
    highlights: [
      "Built investment and payment workflows with JWT authentication and role-based dashboards.",
      "Developed CRM contact management, sales-pipeline tracking, and reporting.",
      "Reduced CRM operational complexity by 40% through centralized administration.",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Atzean Technologies LLP",
    period: "Jun 2023 — Jun 2025",
    summary:
      "Built e-commerce and real-time order-management products with payment, shipping, and live data integrations.",
    highlights: [
      "Integrated PhonePe payments and Shiprocket shipping for the Anahee clothing platform.",
      "Built Coffee Station order management with Firebase Realtime Database.",
      "Optimized queries for a 35% improvement in page-load times.",
    ],
  },
];

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function ThemeToggle({ isDark, onToggle, className = "" }) {
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      className={`icon-button ${className}`}
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}>
      <Icon size={18} strokeWidth={1.8} />
    </button>
  );
}

function Header({ isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href="#home"
          className="brand"
          aria-label="Ashish Kumar Rajak, home"
          onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">AR</span>
          <span className="brand-copy">
            <span>Ashish Rajak</span>
            <span>Full-Stack Developer</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <a className="header-contact" href="#contact">
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="icon-button mobile-menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            ref={menuToggleRef}
            onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Mobile navigation"
        hidden={!menuOpen}>
        {navigation.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}>
            {item.label}
            <ArrowUpRight size={16} />
          </a>
        ))}
        <a
          href="/Ashish_Kumar_Rajak_Resume.pdf"
          download="Ashish_Kumar_Rajak_Resume.pdf"
          onClick={() => setMenuOpen(false)}>
          Download resume
          <Download size={16} />
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">
            <span className="availability-dot" />
            Full-Stack Developer <span className="eyebrow-divider">/</span>{" "}
            Indore, India
          </p>
          <h1>
            Ashish
            <br />
            <span>Kumar Rajak.</span>
          </h1>
          <p className="hero-role">Building thoughtful digital products.</p>
          <p className="hero-intro">
            I design, develop, and deploy scalable web applications with
            React.js, Node.js, and PHP — turning real business needs into
            reliable software.
          </p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">
              Explore my work <ArrowRight size={17} />
            </a>
            <a
              className="button button-secondary"
              href="/Ashish_Kumar_Rajak_Resume.pdf"
              download="Ashish_Kumar_Rajak_Resume.pdf">
              <Download size={16} /> Resume
            </a>
          </div>

          <div className="hero-socials" aria-label="Social links">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                title={social.label}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noreferrer" : undefined}>
                <social.icon size={18} strokeWidth={1.7} />
              </a>
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <div className="portrait-frame">
            <div className="monogram-panel">
              <div className="monogram-heading">
                <span>PERSONAL PORTFOLIO</span>
                <span>01 — 04</span>
              </div>
              <div className="monogram-letters" aria-hidden="true">
                <span>A</span>
                <span>R</span>
              </div>
              <div className="monogram-caption">
                <span className="portrait-caption-mark">
                  <Code2 size={17} />
                </span>
                <span>
                  <strong>Ashish Kumar Rajak</strong>
                  <span>Full-Stack Developer · Indore, India</span>
                </span>
                <ArrowUpRight size={18} className="portrait-caption-arrow" />
              </div>
              <span className="monogram-watermark" aria-hidden="true">
                A K R
              </span>
            </div>
          </div>
          <span className="portrait-index">01 — 04</span>
        </div>

        <a href="#about" className="scroll-cue">
          <span>Scroll to explore</span>
          <ArrowDown size={15} />
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="content-section">
      <div className="container">
        <SectionHeading
          eyebrow="A little about me"
          title="Good software starts with understanding the problem."
        />
        <div className="about-grid">
          <div className="about-lead">
            <span className="about-mark">01</span>
            <p>
              I&apos;m a full-stack developer with nearly 3 years of
              professional experience designing, developing, and deploying
              scalable, high-performance web applications.
            </p>
          </div>
          <div className="about-details">
            <p>
              My work spans React.js, Node.js, and PHP — from REST APIs and
              database design to secure authentication, multi-role dashboards,
              and third-party integrations.
            </p>
            <p>
              I like to understand how a feature should behave before building
              it, then turn business requirements into dependable, maintainable
              workflows. I&apos;ve also worked with message brokers and
              queue-based processing for asynchronous, high-throughput systems.
            </p>
            <a className="text-link" href={`mailto:${contactEmail}`}>
              More about working together <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
        <div className="about-meta">
          <div>
            <span className="meta-label">Based in</span>
            <span className="meta-value">
              <MapPin size={15} /> Indore, India
            </span>
          </div>
          <div>
            <span className="meta-label">Currently</span>
            <span className="meta-value">Anaxee Digital Runners</span>
          </div>
          <div>
            <span className="meta-label">Focus</span>
            <span className="meta-value">Full-stack product development</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const flowerRef = useRef(null);
  const rotation = useRef(70.1823);
  const animationFrame = useRef(0);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta !== 0) rotation.current += delta > 0 ? -1 : 1;

      lastScrollY.current = currentScrollY;

      if (!animationFrame.current) {
        animationFrame.current = window.requestAnimationFrame(() => {
          if (flowerRef.current) {
            flowerRef.current.style.transform = `rotate(${rotation.current}deg)`;
          }
          animationFrame.current = 0;
        });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame.current) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="content-section section-alt skills-section">
      <div className="container">
        <p className="eyebrow skills-eyebrow">My skills</p>
        <div className="skills-art" aria-hidden="true">
          <div className="skills-flower-frame">
            <img
              ref={flowerRef}
              className="skills-flower"
              src={steelFlower}
              alt=""
              draggable="false"
              style={{ transform: "rotate(70.1823deg)" }}
            />
          </div>
        </div>
        <div className="section-heading skills-title">
          <h2>
            <span>The Secret</span>{" "}
            <span className="secret-sauce-accent">Sauce</span>
          </h2>
        </div>
        <div className="skills-cloud" aria-label="Technology skills">
          {skills.map((skill) => (
            <span className="skill-tag" key={skill.name} aria-label={skill.name}>
              <span
                className={`skill-tag-icon ${
                  skill.monochrome ? "skill-icon-monochrome" : ""
                }`}
                style={{
                  "--brand-color": `#${skill.color || skill.icon.hex || "FFFFFF"}`,
                }}
                aria-hidden="true">
                {skill.icon.path ? (
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="currentColor">
                    <path d={skill.icon.path} />
                  </svg>
                ) : (
                  <skill.icon
                    size={18}
                    strokeWidth={1.8}
                    style={{ color: `#${skill.color}` }}
                  />
                )}
              </span>
              <span>{skill.name}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const Icon = project.icon;

  return (
    <article className="project-card">
      <div className="project-preview">
        <div className="preview-toolbar" aria-hidden="true">
          <span />
          <span />
          <span />
          <span className="preview-toolbar-label">
            PROJECT / {project.number}
          </span>
        </div>
        <div className="preview-content">
          <span className="preview-icon">
            <Icon size={30} strokeWidth={1.4} />
          </span>
          <div className="preview-wordmark">
            <span>{project.subtitle}</span>
            <strong>{project.title}</strong>
          </div>
          <span className="preview-number">{project.number}</span>
        </div>
        <span className="preview-period">{project.period}</span>
      </div>

      <div className="project-body">
        <div className="project-title-row">
          <div>
            <p className="project-kicker">{project.subtitle}</p>
            <h3>{project.title}</h3>
          </div>
          {project.link && (
            <a
              className="project-open"
              href={project.link}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visit ${project.title} website`}
              title={`Visit ${project.title} website`}>
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
        <p className="project-description">{project.description}</p>
        <ul className="project-features">
          {project.features.map((feature) => (
            <li key={feature}>
              <Check size={14} />
              {feature}
            </li>
          ))}
        </ul>
        <div className="project-footer">
          <div className="project-tech" aria-label="Technologies used">
            {project.technologies.map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>
          {project.link && (
            <a
              className="project-live-link"
              href={project.link}
              target="_blank"
              rel="noreferrer">
              Visit live site <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <section id="projects" className="content-section">
      <div className="container">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects built around real needs."
          description="A few products and platforms I’ve helped bring to life."
        />
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.number} project={project} />
          ))}
        </div>
        <div className="projects-note">
          <span>Want to see more?</span>
          <a
            className="text-link"
            href="https://github.com/Ashishrajak1"
            target="_blank"
            rel="noreferrer">
            Find me on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="content-section section-alt">
      <div className="container">
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve made an impact."
          description="A timeline of the teams and products I’ve worked with."
        />
        <div className="experience-list">
          {experience.map((item, index) => (
            <article className="experience-item" key={item.company}>
              <div className="experience-index">
                <span>0{index + 1}</span>
                {index < experience.length - 1 && (
                  <span className="experience-rule" />
                )}
              </div>
              <div className="experience-content">
                <div className="experience-heading">
                  <div>
                    <p className="experience-company">{item.company}</p>
                    <h3>{item.role}</h3>
                  </div>
                  <span className="experience-period">{item.period}</span>
                </div>
                <p className="experience-summary">{item.summary}</p>
                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
    setStatus(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (isSubmitting) return;

    const formDataToSend = new FormData(form);
    const name = String(formDataToSend.get("name") || "").trim();
    const email = String(formDataToSend.get("email") || "").trim();
    const subject = String(formDataToSend.get("subject") || "").trim();
    const message = String(formDataToSend.get("message") || "").trim();
    const invalidField = !name
      ? "name"
      : !email || !isValidEmail(email)
        ? "email"
        : !message
          ? "message"
          : null;

    if (invalidField) {
      form.elements.namedItem(invalidField).focus();
      setStatus({
        type: "error",
        message:
          invalidField === "name"
            ? "Please enter your name."
            : invalidField === "email"
              ? "Please enter a valid email address."
              : "Please write a message.",
      });
      return;
    }

    if (formDataToSend.get("_honey")) {
      setStatus({ type: "error", message: CONTACT_ERROR_MESSAGE });
      return;
    }

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      console.error("EmailJS contact form configuration is incomplete.");
      setStatus({ type: "error", message: CONTACT_ERROR_MESSAGE });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const response = await emailjs.send(
        emailJsServiceId,
        emailJsTemplateId,
        {
          to_email: contactEmail,
          user_name: name,
          user_email: email,
          subject: subject || "New portfolio contact message",
          message,
          reply_to: email,
        },
        { publicKey: emailJsPublicKey },
      );

      if (response.status !== 200) {
        throw new Error(`EmailJS returned status ${response.status}`);
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      form.reset();
      setStatus({
        type: "success",
        message:
          "Thank you for reaching out! Your message has been sent successfully. I'll get back to you soon.",
      });
    } catch (error) {
      console.error("Contact form email could not be sent:", error);
      setStatus({
        type: "error",
        message: CONTACT_ERROR_MESSAGE,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="content-section contact-section">
      <div className="container">
        <div className="contact-panel">
          <div className="contact-copy">
            <p className="eyebrow">Have a project in mind?</p>
            <h2>
              Let&apos;s make
              <br />
              something <span>meaningful.</span>
            </h2>
            <p className="contact-intro">
              Have a role, an idea, or a challenge to solve? I&apos;d be glad to
              hear about it.
            </p>
            <a className="contact-email" href={`mailto:${contactEmail}`}>
              {contactEmail} <ArrowUpRight size={17} />
            </a>
          </div>

          <form
            className="contact-form"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={isSubmitting}>
            <div className="contact-form-honeypot" aria-hidden="true">
              <input
                type="text"
                name="_honey"
                tabIndex="-1"
                autoComplete="off"
              />
            </div>
            <div className="form-row">
              <label>
                <span>Your name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={updateField}
                  placeholder="Name"
                  autoComplete="name"
                  maxLength={120}
                  disabled={isSubmitting}
                  required
                />
              </label>
              <label>
                <span>Email address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  placeholder="you@example.com"
                  autoComplete="email"
                  maxLength={254}
                  disabled={isSubmitting}
                  required
                />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={updateField}
                placeholder="What would you like to discuss?"
                maxLength={160}
                disabled={isSubmitting}
              />
            </label>
            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={updateField}
                rows="4"
                placeholder="A little about what you have in mind..."
                maxLength={5000}
                disabled={isSubmitting}
                required
              />
            </label>
            <div className="form-submit-row">
              <button
                className="button button-primary"
                type="submit"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Sending... <LoaderCircle className="form-spinner" size={15} />
                  </>
                ) : (
                  <>
                    Send message <Send size={15} />
                  </>
                )}
              </button>
              {status && (
                <p
                  className={`form-status form-status-${status.type}`}
                  role={status.type === "error" ? "alert" : "status"}
                  aria-live={status.type === "error" ? "assertive" : "polite"}>
                  {status.type === "loading" && (
                    <LoaderCircle className="form-status-spinner" size={14} />
                  )}
                  {status.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="footer-brand" href="#home">
          <span className="brand-mark">AR</span>
          <span>Ashish Kumar Rajak</span>
        </a>
        <p>Building reliable software, one thoughtful detail at a time.</p>
        <div className="footer-socials" aria-label="Social links">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              aria-label={social.label}
              title={social.label}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noreferrer" : undefined}>
              <social.icon size={17} strokeWidth={1.7} />
            </a>
          ))}
        </div>
        <span className="copyright">
          © {new Date().getFullYear()} Ashish Kumar Rajak
        </span>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(() => {
    try {
      return window.localStorage.getItem("portfolio-theme") !== "light";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const theme = isDark ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;

    try {
      window.localStorage.setItem("portfolio-theme", theme);
    } catch {
      // The selected theme still applies when storage is unavailable.
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((current) => !current);

  return (
    <div className="portfolio" data-theme={isDark ? "dark" : "light"}>
      <Header isDark={isDark} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
