import React, { useState, useEffect, useRef } from "react";
import steelFlower from "./assets/steel-flower.webp";
import {
  Moon,
  Sun,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Code,
  Database,
  Server,
  Zap,
  Award,
  Users,
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Star,
  Calendar,
  Download,
  Send,
  ArrowRight,
  Eye,
  Coffee,
  ShoppingCart,
  Film,
  DollarSign,
  Shield,
  Layers,
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  MessageCircle,
  Brain,
} from "lucide-react";

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);

    const interactiveElements = document.querySelectorAll(
      "button, a, .hover-target",
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full pointer-events-none z-[9999] transition-all duration-200 ease-out hidden md:block ${
        isHovering ? "scale-150 opacity-70" : "scale-100 opacity-100"
      }`}
      style={{
        left: `${mousePosition.x - 8}px`,
        top: `${mousePosition.y - 8}px`,
        mixBlendMode: "difference",
      }}
    />
  );
};

// Header Component with Enhanced Mobile Menu
const Header = ({
  isDarkMode,
  toggleTheme,
  activeSection,
  setActiveSection,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: <Home size={18} /> },
    { id: "about", label: "About", icon: <User size={18} /> },
    { id: "services", label: "Services", icon: <Briefcase size={18} /> },
    { id: "projects", label: "Projects", icon: <FolderOpen size={18} /> },
    { id: "experience", label: "Experience", icon: <Award size={18} /> },
    { id: "contact", label: "Contact", icon: <MessageCircle size={18} /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    closeMobileMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
        closeMobileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${
          isDarkMode ? "bg-gray-900/95" : "bg-white/95"
        } border-b ${
          isDarkMode ? "border-gray-800" : "border-gray-200"
        } shadow-lg`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 md:h-16">
            <button
              onClick={() => handleNavClick("home")}
              className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover-target transition-transform duration-300 hover:scale-105">
              Ashish.dev
            </button>

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`hover-target transition-all duration-300 relative px-3 py-2 rounded-lg font-medium ${
                    activeSection === item.id
                      ? "text-blue-500 font-semibold"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}>
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              <button
                onClick={toggleTheme}
                className={`hover-target p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}>
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => handleNavClick("contact")}
                className="hover-target bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 xl:px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm xl:text-base">
                Hire Me
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-yellow-400"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                }`}>
                {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                onClick={toggleMobileMenu}
                className={`mobile-menu-button p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700 text-white"
                    : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                }`}>
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`mobile-menu-container fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}>
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isDarkMode ? "bg-gray-900/95" : "bg-black/50"
          } backdrop-blur-sm ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMobileMenu}
        />

        <div
          className={`absolute top-14 md:top-16 left-0 right-0 mx-3 mt-2 rounded-xl transition-all duration-300 ${
            isDarkMode ? "bg-gray-900" : "bg-white"
          } border ${
            isDarkMode ? "border-gray-800" : "border-gray-200"
          } shadow-2xl ${
            isMobileMenuOpen
              ? "transform translate-y-0 opacity-100"
              : "transform -translate-y-4 opacity-0"
          }`}>
          <div className="p-4 sm:p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full text-left font-medium ${
                    activeSection === item.id
                      ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm"
                      : isDarkMode
                        ? "text-gray-300 hover:text-white hover:bg-gray-800"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}>
                  {item.icon}
                  <span className="text-base">{item.label}</span>
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div
              className={`my-4 h-px ${
                isDarkMode ? "bg-gray-800" : "bg-gray-200"
              }`}
            />

            <button
              onClick={() => handleNavClick("contact")}
              className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center px-6 py-3.5 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-center justify-center gap-2">
                <Send size={18} />
                <span>Get In Touch</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Home Section Component
const HomeSection = ({ isDarkMode, setActiveSection }) => {
  const [typedText, setTypedText] = useState("");
  const roles = [
    "Full Stack Developer",
    "MERN Stack Expert",
    "React.js Specialist",
    "Backend Developer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    let typingInterval;
    let deletingInterval;
    let pauseTimeout;

    const typeWriter = () => {
      const currentRole = roles[roleIndex];
      let i = 0;

      typingInterval = setInterval(() => {
        if (i < currentRole.length) {
          setTypedText(currentRole.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);

          pauseTimeout = setTimeout(() => {
            deletingInterval = setInterval(() => {
              if (i > 0) {
                setTypedText(currentRole.substring(0, i - 1));
                i--;
              } else {
                clearInterval(deletingInterval);
                setRoleIndex((prev) => (prev + 1) % roles.length);
              }
            }, 100);
          }, 2000);
        }
      }, 150);
    };

    typeWriter();

    // ✅ Cleanup on unmount or roleIndex change
    return () => {
      clearInterval(typingInterval);
      clearInterval(deletingInterval);
      clearTimeout(pauseTimeout);
    };
  }, [roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-3 sm:px-4 lg:px-6 pt-16 md:pt-20">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8 lg:gap-12 xl:gap-16">
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1 max-w-2xl lg:max-w-none">
            <div className="mb-6 sm:mb-8">
              <h3
                className={`text-sm sm:text-base md:text-lg mb-2 sm:mb-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                } font-medium animate-fadeInUp`}>
                Hello, I'm
              </h3>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold mb-3 sm:mb-4 animate-fadeInUp delay-200 leading-tight">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Ashish Kumar
                </span>
                <br />
                <span className={isDarkMode ? "text-white" : "text-gray-900"}>
                  Rajak
                </span>
              </h1>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 sm:mb-6 h-6 sm:h-7 md:h-8">
                <span
                  className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                  I'm a{" "}
                </span>
                <span className="text-blue-500 font-semibold">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </div>
              <p
                className={`text-sm sm:text-base md:text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mb-6 sm:mb-8 max-w-xl lg:max-w-2xl animate-fadeInUp delay-400 leading-relaxed mx-auto lg:mx-0`}>
                Passionate Full Stack Developer with 2+ years of experience in
                building scalable web applications using MERN Stack, PHP, and
                modern technologies. Currently leading development at Elites
                Capital.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8 animate-fadeInUp delay-600">
              <button className="hover-target bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <Download size={18} />
                Download CV
              </button>
              <button
                onClick={() => setActiveSection("contact")}
                className="hover-target border-2 border-blue-500 text-blue-500 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <Send size={18} />
                Let's Talk
              </button>
            </div>

            <div className="flex justify-center lg:justify-start gap-3 sm:gap-4 animate-fadeInUp delay-800">
              {[
                {
                  icon: <Github size={18} />,
                  href: "https://github.com/Ashishrajak1",
                  label: "GitHub",
                },
                {
                  icon: <Linkedin size={18} />,
                  href: "https://www.linkedin.com/in/ashish-rajak/",
                  label: "LinkedIn",
                },
                {
                  icon: <Code size={18} />,
                  href: "https://leetcode.com/u/Ashishrajak1/",
                  label: "Leetcode",
                },
                {
                  icon: <Mail size={18} />,
                  href: "mailto:ashishrajak5005@gmail.com",
                  label: "Email",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  title={social.label}
                  target="_blank"
                  className={`hover-target p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                    isDarkMode
                      ? "bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white"
                      : "bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white"
                  }`}>
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white animate-float shadow-2xl">
                AKR
              </div>
              <div
                className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 md:-top-4 md:-right-4 p-2 sm:p-2.5 md:p-3 rounded-full ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg animate-bounce delay-1000`}>
                <Code className="text-blue-500" size={16} />
              </div>
              <div
                className={`absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 md:-bottom-4 md:-left-4 p-2 sm:p-2.5 md:p-3 rounded-full ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg animate-bounce delay-500`}>
                <Database className="text-purple-500" size={16} />
              </div>
              <div
                className={`absolute top-1/2 -left-3 sm:-left-4 md:-left-8 p-2 sm:p-2.5 md:p-3 rounded-full ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                } shadow-lg animate-bounce delay-700`}>
                <Server className="text-green-500" size={16} />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {[
            {
              number: "2+",
              label: "Years Experience",
              icon: <Calendar className="text-blue-500" size={20} />,
            },
            {
              number: "10+",
              label: "Projects Completed",
              icon: <Award className="text-purple-500" size={20} />,
            },
            {
              number: "5+",
              label: "Technologies",
              icon: <Zap className="text-green-500" size={20} />,
            },
            {
              number: "100%",
              label: "Client Satisfaction",
              icon: <Star className="text-yellow-500" size={20} />,
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`text-center p-3 sm:p-4 md:p-6 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 hover-target ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-50"
              } border ${
                isDarkMode ? "border-gray-700" : "border-gray-200"
              } shadow-lg`}>
              <div className="flex justify-center mb-2 sm:mb-3">
                {stat.icon}
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <div
                className={`text-xs sm:text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = ({ isDarkMode }) => {
  return (
    <section
      id="about"
      className="min-h-screen py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            About <span className="text-blue-500">Me</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto px-2`}>
            Passionate about creating innovative solutions and delivering
            exceptional user experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Professional Summary
            </h3>
            <p
              className={`text-sm sm:text-base md:text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-4 sm:mb-6 leading-relaxed`}>
              Full Stack Developer with 2+ years of experience in building
              scalable and efficient web applications using MERN Stack, PHP, and
              CodeIgniter. Skilled in frontend and backend development, CI/CD
              pipelines, Docker deployments, and third-party integrations.
            </p>
            <p
              className={`text-sm sm:text-base md:text-lg ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mb-6 sm:mb-8 leading-relaxed`}>
              Currently working as a Full Stack Developer at Elites Capital,
              leading development of investment and e-commerce platforms with a
              focus on scalable architecture and user experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-blue-500 text-sm sm:text-base">
                  Location
                </h4>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } flex items-center gap-2 text-sm`}>
                  <MapPin size={16} />
                  Indore, M.P., India
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-500 text-sm sm:text-base">
                  Email
                </h4>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } flex items-start gap-2 text-xs sm:text-sm break-all`}>
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  <span className="break-all">ashishrajak5005@gmail.com</span>
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-500 text-sm sm:text-base">
                  Phone
                </h4>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } flex items-center gap-2 text-sm`}>
                  <Phone size={16} />
                  +91-7987057932
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-blue-500 text-sm sm:text-base">
                  Experience
                </h4>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  } text-sm`}>
                  2+ Years
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Technical Skills
            </h3>

            {[
              { skill: "React.js / Redux", level: 90 },
              { skill: "Node.js / Express.js", level: 85 },
              { skill: "PHP / CodeIgniter", level: 88 },
              { skill: "MongoDB / MySQL", level: 82 },
              { skill: "Docker / CI/CD", level: 75 },
              { skill: "REST APIs", level: 92 },
            ].map((item, index) => (
              <div key={index} className="hover-target">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-sm sm:text-base">
                    {item.skill}
                  </span>
                  <span className="text-blue-500 text-sm sm:text-base">
                    {item.level}%
                  </span>
                </div>
                <div
                  className={`w-full h-2 rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}>
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000 ease-out"
                    style={{ width: `${item.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Section Component
const ServicesSection = ({ isDarkMode }) => {
  const services = [
    {
      icon: <Code className="text-blue-500" size={24} />,
      title: "Frontend Development",
      description:
        "Building responsive and interactive user interfaces using React.js, Redux, HTML5, CSS3, and modern JavaScript frameworks.",
      technologies: ["React.js", "Redux", "HTML5", "CSS3", "Bootstrap"],
    },
    {
      icon: <Server className="text-green-500" size={24} />,
      title: "Backend Development",
      description:
        "Developing robust server-side applications with Node.js, Express.js, PHP, and CodeIgniter with secure API architecture.",
      technologies: [
        "Node.js",
        "Express.js",
        "PHP",
        "CodeIgniter",
        "REST APIs",
      ],
    },
    {
      icon: <Database className="text-purple-500" size={24} />,
      title: "Database Design",
      description:
        "Designing and optimizing database structures using MongoDB and MySQL with efficient queries and data modeling.",
      technologies: [
        "MongoDB",
        "MySQL",
        "Database Design",
        "Query Optimization",
      ],
    },
    {
      icon: <Layers className="text-orange-500" size={24} />,
      title: "Full Stack Solutions",
      description:
        "Complete end-to-end web application development from concept to deployment with modern tech stacks.",
      technologies: ["MERN Stack", "Full Stack", "Web Apps", "Deployment"],
    },
    {
      icon: <Shield className="text-red-500" size={24} />,
      title: "DevOps & Deployment",
      description:
        "Setting up CI/CD pipelines, Docker containerization, and cloud deployments for scalable applications.",
      technologies: ["Docker", "CI/CD", "GitHub Actions", "Cloud Deployment"],
    },
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: "Third-party Integrations",
      description:
        "Integrating payment gateways, shipping APIs, and other third-party services to enhance application functionality.",
      technologies: [
        "Payment Gateways",
        "Shipping APIs",
        "Firebase",
        "API Integration",
      ],
    },
  ];

  return (
    <section
      id="services"
      className="min-h-screen py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            My <span className="text-blue-500">Services</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto px-2`}>
            Comprehensive web development services to bring your ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`hover-target p-4 sm:p-6 lg:p-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 border border-gray-700"
                  : "bg-white hover:bg-gray-50 border border-gray-200 shadow-lg hover:shadow-xl"
              }`}>
              <div className="mb-4 sm:mb-6">{service.icon}</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4">
                {service.title}
              </h3>
              <p
                className={`${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                } mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base`}>
                {service.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
                      isDarkMode
                        ? "bg-gray-700 text-blue-400"
                        : "bg-blue-100 text-blue-600"
                    }`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section Component
const ProjectsSection = ({ isDarkMode }) => {
  const projects = [
    {
      title: "Elites Capital - Investment Platform",
      description:
        "Leading development of investment platform with user portfolios, role-based access, and real-time analytics.",
      image: "https://elitescapital.com/assets/images/logo.png",
      link: "https://elitescapital.com/",
      technologies: ["React.js", "Redux Toolkit", "CodeIgniter 4", "MySQL"],
      status: "Live",
      features: [
        "User Investment",
        "Portfolio Tracking",
        "Admin Dashboards",
        "Real-time Analytics",
      ],
    },
    {
      title: "Anahee - E-commerce Platform",
      description:
        "Full-stack e-commerce platform with real-time ordering, shipping integration, and payment gateway.",
      image:
        "https://anahee.in/cdn/shop/files/logo3.png?v=1755881726&width=285",
      link: "https://anahee.in/",
      technologies: ["React.js", "Node.js", "MongoDB", "Docker"],
      status: "Live",
      features: [
        "Real-time Orders",
        "Shiprocket API",
        "PhonePe Integration",
        "Admin Panel",
      ],
    },
    {
      title: "Coffee Station Web App",
      description:
        "Role-based coffee ordering system with real-time notifications and staff management.",
      image: "☕",
      technologies: ["CodeIgniter", "PHP", "Firebase", "MySQL"],
      status: "Live",
      features: [
        "Role-based Access",
        "Real-time Notifications",
        "Order Management",
        "Staff Panel",
      ],
    },
    {
      title: "E-commerce Website",
      description:
        "Modern e-commerce solution with cart functionality, checkout process, and order tracking.",
      image: "🛍️",
      technologies: ["React.js", "Redux", "Firebase"],
      status: "Live",
      features: [
        "Shopping Cart",
        "Checkout Flow",
        "Firebase Auth",
        "Order Tracking",
      ],
    },
  ];

  return (
    <section
      id="projects"
      className="min-h-screen py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto px-2`}>
            Showcase of my recent work and key projects that demonstrate my
            technical expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`hover-target rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
              }`}>
              {/* <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-32 sm:h-40 md:h-48 flex items-center justify-center text-3xl sm:text-4xl md:text-6xl">
                {project.image}
              </div> */}
              <div className="bg-white h-32 sm:h-40 md:h-48 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title || "Project Logo"}
                  className="h-16 sm:h-20 md:h-24 object-contain"
                />
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    {project.title}
                  </h3>
                  <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-600 text-xs rounded-full font-medium">
                    {project.status}
                  </span>
                </div>

                <p
                  className={`${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  } mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base`}>
                  {project.description}
                </p>

                <div className="mb-4 sm:mb-6">
                  <h4 className="font-semibold mb-2 sm:mb-3 text-blue-500 text-sm sm:text-base">
                    Key Features:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span
                          className={`text-xs sm:text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-700"
                          }`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`text-xs px-2 sm:px-3 py-1 rounded-full ${
                        isDarkMode
                          ? "bg-gray-700 text-blue-400"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    className="hover-target flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 sm:py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Eye size={16} />
                    View Live
                  </a>
                  <button className="hover-target px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base">
                    <Github size={16} />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = ({ isDarkMode }) => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Elites Capital",
      period: "Apr 2025 – Present",
      description:
        "Leading development of investment platform with role-based access system and real-time analytics.",
      achievements: [
        "Developed Elites Capital Investment Platform",
        "Implemented role-based access system (Admin, Super Admin, User)",
        "Built real-time data analytics dashboards",
        "Enhanced security and authentication systems",
      ],
      technologies: ["React.js", "Redux Toolkit", "CodeIgniter 4", "MySQL"],
    },
    {
      title: "Full Stack Developer",
      company: "Elderberry Tech",
      period: "Mar 2024 – Mar 2025",
      description:
        "Developed scalable web applications and led project development cycles with CI/CD implementations.",
      achievements: [
        "Delivered Anahee E-commerce Platform with real-time ordering",
        "Integrated Shiprocket API and PhonePe payment gateway",
        "Implemented CI/CD pipelines reducing deployment errors by 90%",
        "Acted as Project Lead managing development cycles",
      ],
      technologies: ["React.js", "Redux", "Node.js", "PHP", "MySQL", "Docker"],
    },
    {
      title: "Backend Developer Intern",
      company: "Alphawizz Private Limited",
      period: "Dec 2023 – Mar 2024",
      description:
        "Built backend modules and enhanced system performance with modular architectures.",
      achievements: [
        "Built backend modules in PHP (CodeIgniter) & MySQL",
        "Created CRUD operations & dashboards",
        "Improved system performance with optimized queries",
        "Enhanced project efficiency with modular backend architectures",
      ],
      technologies: ["PHP", "CodeIgniter", "MySQL"],
    },
  ];

  return (
    <section
      id="experience"
      className="min-h-screen pt-16 sm:pt-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Work <span className="text-blue-500">Experience</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto px-2`}>
            My professional journey and key contributions in the tech industry
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line (always full height) */}
          <div className="absolute top-0 left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-600"></div>

          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row mb-12 md:mb-16`}>
              {/* Timeline dot */}
              <div
                className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 
  w-6 h-6 flex items-center justify-center 
  bg-gradient-to-r from-blue-500 to-purple-600 
  rounded-full border-4 border-gray-900 
  z-10 text-white font-semibold text-xs">
                {index + 1}
              </div>

              {/* Card wrapper (alternate left/right) */}
              <div
                className={`mt-8 md:mt-0 md:w-1/2 ${
                  index % 2 === 0
                    ? "md:pl-12 md:ml-auto"
                    : "md:pr-12 md:mr-auto"
                }`}>
                <div
                  className={`group relative p-6 lg:p-8 rounded-xl md:rounded-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer overflow-hidden
                    ${
                      isDarkMode
                        ? "bg-gray-800 border border-gray-700 hover:bg-gray-700"
                        : "bg-white border border-gray-200 shadow-lg hover:shadow-xl"
                    }`}>
                  {/* Always visible */}
                  <div>
                    <span className="text-blue-500 text-xs sm:text-sm font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold mt-1">
                      {exp.title}
                    </h3>
                    <h4
                      className={`text-sm sm:text-base ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } font-medium`}>
                      {exp.company}
                    </h4>
                  </div>

                  {/* Expand on hover */}
                  <div className="max-h-0 opacity-0 group-hover:max-h-screen group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden">
                    <p
                      className={`${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      } mb-4 mt-3 leading-relaxed text-sm sm:text-base`}>
                      {exp.description}
                    </p>

                    <h5 className="font-semibold mb-2 text-blue-500 text-sm sm:text-base">
                      Key Achievements:
                    </h5>
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li key={achIndex} className="flex items-start gap-3">
                          <ChevronRight
                            size={16}
                            className="text-blue-500 mt-1 flex-shrink-0"
                          />
                          <span
                            className={`${
                              isDarkMode ? "text-gray-300" : "text-gray-700"
                            } text-sm sm:text-base`}>
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`text-xs px-3 py-1 rounded-full ${
                            isDarkMode
                              ? "bg-gray-700 text-blue-400"
                              : "bg-blue-100 text-blue-600"
                          }`}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills section component
const skills = [
  { name: "ReactJS", icon: "https://cdn.simpleicons.org/react" },
  { name: "NextJS", icon: "https://cdn.simpleicons.org/nextdotjs/white" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript" },
  { name: "Tailwind CSS", icon: "https://cdn.simpleicons.org/tailwindcss" },
  { name: "Motion", icon: "https://cdn.simpleicons.org/framer" },
  { name: "Sanity", icon: "https://cdn.simpleicons.org/sanity" },
  { name: "Contentful", icon: "https://cdn.simpleicons.org/contentful" },
  { name: "NodeJS", icon: "https://cdn.simpleicons.org/nodedotjs/darkgreen" },
  { name: "ExpressJS", icon: "https://cdn.simpleicons.org/express/white" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/sky" },
  { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/darkgreen" },
  { name: "Prisma", icon: "https://cdn.simpleicons.org/prisma/blue" },
  { name: "Zustand", icon: "https://cdn.simpleicons.org/redux/pink" },
  { name: "Zod", icon: "https://cdn.simpleicons.org/zod" },
  { name: "pnpm", icon: "https://cdn.simpleicons.org/pnpm" },
  { name: "Bun", icon: "https://cdn.simpleicons.org/bun/white" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/white" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/white" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/gray" },
  { name: "Docker", icon: "https://cdn.simpleicons.org/docker" },
  { name: "Expo", icon: "https://cdn.simpleicons.org/expo/gray" },
  { name: "Clerk", icon: "https://cdn.simpleicons.org/clerk" },
  { name: "Linux", icon: "https://cdn.simpleicons.org/linux" },
];

const SkillsSection = ({ isDarkMode }) => {
  const [rotation, setRotation] = useState(70.1823); // initial rotation
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY.current;

      if (delta > 0) {
        // scrolling down -> rotate anticlockwise
        setRotation((prev) => prev - 1);
      } else if (delta < 0) {
        // scrolling up -> rotate clockwise
        setRotation((prev) => prev + 1);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative mx-auto mt-0 flex h-full flex-col rounded-3xl py-0 md:px-10"
      id="skills">
      <div className="relative mx-auto size-fit overflow-hidden">
        <div className="[mask-image:linear-gradient(to_top,transparent,black_50%,black_90%,transparent)] [masak-image:linear-gradient(to_top,transparent,#000_100%)]">
          <div
            className="relative mx-auto size-[300px] translate-y-36 md:size-[380px] md:translate-y-40 transition-transform duration-150"
            style={{ transform: `rotate(${rotation}deg)` }}>
            <img
              src={steelFlower}
              draggable="false"
              alt="skills cover rotating image"
              className="z-10 w-full opacity-65 select-none"
            />
          </div>
        </div>
      </div>

      <h2
        style={{
          textShadow:
            "0px 4px 8px rgba(255,255,255,.05),0px 8px 30px rgba(255,255,255,.25)",
        }}
        className="relative text-5xl font-medium tracking-tight sm:text-5xl md:text-6xl text-balance text-center z-30 mb-0 md:mb-0 size-full -translate-y-6 md:-translate-y-10">
        <p className="mb-3 text-xs font-normal tracking-widest text-black/80 dark:text-white/70 uppercase md:text-sm">
          My Skills
        </p>
        <span>
          <span className="font-instrument-serif">The Secret</span>{" "}
          <span className="animate-gradient-x bg-[linear-gradient(288deg,#ff8000,#f0c_53.2394%,#04f)] bg-clip-text text-transparent font-serif tracking-tight italic">
            Sauce
          </span>
        </span>
      </h2>

      <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-2 lg:gap-3">
        {skills.map((skill) => (
          <span
            key={skill.name}
            data-slot="badge"
            className="inline-flex items-center justify-center rounded-lg border px-3 py-1 text-sm w-fit whitespace-nowrap shrink-0 gap-2
            [&>svg]:pointer-events-none
            focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]
            aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive
            transition-[color,box-shadow] overflow-hidden text-black dark:text-white
            border-white-3 dark:bg-neutral-900 dark:border-white/[0.14] bg-white-2
            [a&]:hover:bg-primary/90 md:px-4 md:py-1.5"
            aria-label={skill.name}>
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-4"
              width={18}
              height={18}
            />
            <span>{skill.name}</span>
          </span>
        ))}
      </div>
    </section>
  );
};

// current learning comonent

const LearningCard = ({ isDarkMode }) => {
  return (
    <section className="py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col md:flex-row items-center rounded-2xl p-6 transition-all duration-300 transform hover:scale-101 hover:-translate-y-2
            ${
              isDarkMode
                ? " border border-white/10 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                : " border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
            }
          `}>
          {/* Icon */}
          <div
            className={`hover-target p-4 sm:p-6 lg:p-8 flex items-center justify-center
              ${
                isDarkMode
                  ? "bg-gradient-to-br from-white to-white/70 text-black border border-white/20 shadow-[0_4px_20px_rgba(255,255,255,0.1)]"
                  : "bg-gradient-to-br from-black/90 to-black/70 text-white border border-gray-300 shadow-[0_4px_20px_rgba(0,0,0,0.1)]"
              }
            `}>
            <Brain className="w-7 h-7" />
          </div>

          {/* Content */}
          <div className="flex-1 mt-6 md:mt-0 md:ml-6">
            <div
              className={`mb-2 font-medium ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}>
              Currently focusing on deepening my expertise in
            </div>
            <div
              className={`font-medium text-xl mb-3 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}>
              Software Architecture, Artificial Intelligence & Machine Learning
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                { label: "System Design", color: "bg-green-400" },
                { label: "Cloud Architecture", color: "bg-blue-400" },
                { label: "Neural Networks", color: "bg-purple-400" },
                { label: "Deep Learning", color: "bg-yellow-400" },
                { label: "MLOps", color: "bg-red-400" },
                { label: "AI Ethics", color: "bg-pink-400" },
              ].map((tag, index) => (
                <span
                  key={index}
                  className={`text-xs rounded-full px-3 py-1 flex items-center border transition-all duration-300 hover:scale-105
                    ${
                      isDarkMode
                        ? "bg-white/10 border-white/20 text-white/90"
                        : "bg-black/5 border-gray-200 text-gray-800"
                    }
                  `}>
                  <span className={`w-2 h-2 ${tag.color} rounded-full mr-2`} />
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = ({ isDarkMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const contactInfo = [
    {
      icon: <MapPin className="text-blue-500" size={20} />,
      title: "Location",
      info: "Indrapuri Colony, Bhawarkua, Indore (M.P.)",
    },
    {
      icon: <Phone className="text-green-500" size={20} />,
      title: "Phone",
      info: "+91-7987057932",
    },
    {
      icon: <Mail className="text-purple-500" size={20} />,
      title: "Email",
      info: "ashishrajak5005@gmail.com",
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen py-16 sm:py-20 px-3 sm:px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Get In <span className="text-blue-500">Touch</span>
          </h2>
          <p
            className={`text-sm sm:text-base md:text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } max-w-2xl mx-auto px-2`}>
            Let's discuss your project and bring your ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">
              Let's Talk About Your Project
            </h3>
            <p
              className={`text-sm sm:text-base md:text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              } mb-6 sm:mb-8 leading-relaxed`}>
              I'm always interested in new opportunities and exciting projects.
              Whether you have a question about my work or just want to say
              hello, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`p-2.5 sm:p-3 rounded-full ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    } flex-shrink-0`}>
                    {contact.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-blue-500 text-sm sm:text-base">
                      {contact.title}
                    </h4>
                    <p
                      className={`${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      } text-sm sm:text-base break-words`}>
                      {contact.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8">
              <h4 className="font-semibold mb-3 sm:mb-4 text-blue-500 text-sm sm:text-base">
                Follow Me
              </h4>
              <div className="flex gap-3 sm:gap-4">
                {[
                  {
                    icon: <Github size={18} />,
                    href: "https://github.com/Ashishrajak1",
                    label: "GitHub",
                  },
                  {
                    icon: <Linkedin size={18} />,
                    href: "https://www.linkedin.com/in/ashish-rajak/",
                    label: "LinkedIn",
                  },
                  {
                    icon: <Code size={18} />,
                    href: "https://leetcode.com/u/Ashishrajak1/",
                    label: "Leetcode",
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    className={`hover-target p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-blue-500 text-gray-300 hover:text-white"
                        : "bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white"
                    }`}
                    title={social.label}>
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`order-1 lg:order-2 p-4 sm:p-6 md:p-8 rounded-xl md:rounded-2xl ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200 shadow-lg"
            }`}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`hover-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`hover-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`hover-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className={`hover-target w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button
                type="submit"
                className="hover-target w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const Footer = ({ isDarkMode }) => {
  return (
    <footer
      className={`${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } border-t`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8">
        <div className="text-center">
          <div className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-3 sm:mb-4">
            Ashish.dev
          </div>
          <p
            className={`${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            } mb-4 sm:mb-6 text-sm sm:text-base px-2`}>
            Full Stack Developer | MERN Stack Expert | Building Digital
            Solutions
          </p>
          <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {[
              {
                icon: <Github size={18} />,
                href: "https://github.com/Ashishrajak1",
                label: "GitHub",
              },
              {
                icon: <Linkedin size={18} />,
                href: "https://www.linkedin.com/in/ashish-rajak/",
                label: "LinkedIn",
              },
              {
                icon: <Code size={18} />,
                href: "https://leetcode.com/u/Ashishrajak1/",
                label: "Leetcode",
              },
              {
                icon: <Mail size={18} />,
                href: "mailto:ashishrajak5005@gmail.com",
                label: "Email",
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className={`hover-target p-2.5 sm:p-3 rounded-full transition-all duration-300 transform hover:scale-110 ${
                  isDarkMode
                    ? "bg-gray-700 hover:bg-blue-500 text-gray-300 hover:text-white"
                    : "bg-gray-100 hover:bg-blue-500 text-gray-700 hover:text-white"
                }`}>
                {social.icon}
              </a>
            ))}
          </div>
          <div
            className={`pt-4 sm:pt-6 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}>
            <p
              className={`text-xs sm:text-sm ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              } px-2`}>
              © 2024 Ashish Kumar Rajak. Made with ❤️ in India. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Portfolio Component
const Portfolio = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-20px);
        }
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .delay-200 {
        animation-delay: 0.2s;
      }
      
      .delay-400 {
        animation-delay: 0.4s;
      }
      
      .delay-500 {
        animation-delay: 0.5s;
      }
      
      .delay-600 {
        animation-delay: 0.6s;
      }
      
      .delay-700 {
        animation-delay: 0.7s;
      }
      
      .delay-800 {
        animation-delay: 0.8s;
      }
      
      .delay-1000 {
        animation-delay: 1s;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      @media (max-width: 768px) {
        .hover-target {
          transition: all 0.2s ease;
        }
        
        .hover-target:active {
          transform: scale(0.95);
        }
      }
      
      body {
        overflow-x: hidden;
      }
      
      .hover-target:focus {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "home",
        "about",
        "services",
        "projects",
        "experience",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          return scrollPosition >= offsetTop && scrollPosition < offsetBottom;
        }
        return false;
      });

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}>
      <CustomCursor />

      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <HomeSection
        isDarkMode={isDarkMode}
        setActiveSection={setActiveSection}
      />
      <AboutSection isDarkMode={isDarkMode} />
      <ServicesSection isDarkMode={isDarkMode} />
      <ProjectsSection isDarkMode={isDarkMode} />
      <ExperienceSection isDarkMode={isDarkMode} />
      <SkillsSection isDarkMode={isDarkMode} />
      <LearningCard isDarkMode={isDarkMode} />
      <ContactSection isDarkMode={isDarkMode} />

      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default Portfolio;
