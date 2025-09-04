import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Code,
  Laptop,
  Mail,
  Linkedin,
  Github,
  Twitter,
  ExternalLink,
  Menu,
  X,
  Database,
  Globe,
  Palette,
  Server,
  Smartphone,
  Terminal,
  ArrowRight,
  Clock,
  BriefcaseBusiness,
} from "lucide-react";

// --- Custom Tailwind CSS ---
const CustomStyles = () => (
  <style>
    {`
    .glass-effect {
      background-color: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease-in-out;
    }
    .text-gradient {
      background: linear-gradient(90deg, #60a5fa, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .bg-gradient-background {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
    }
    `}
  </style>
);

const Button = ({ children, variant, size, className, onClick, asChild, ...props }) => {
  const base = "font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition";
  const variants = {
    hero: "bg-gradient-background text-white shadow-lg hover:scale-105",
    glass: "glass-effect text-white hover:text-blue-400",
    ghost: "text-white hover:text-blue-400 hover:bg-gray-800",
    icon: "p-2",
  };
  const sizes = {
    xl: "px-8 py-4 text-lg",
    sm: "px-4 py-2 text-sm",
    icon: "p-3",
  };
  const Component = asChild ? "a" : "button";

  return (
    <Component
      onClick={onClick}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "about", "skills", "projects", "timeline", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  // --- Replace these with your real projects ---
  const projects = [
    {
      title: "AI Chatbot Platform",
      description: "Conversational AI app with real-time NLP integration.",
      github: "https://github.com/yourusername/ai-chatbot",
      demo: "https://ai-chatbot-demo.vercel.app",
      tags: ["Next.js", "OpenAI API", "TailwindCSS"],
    },
    {
      title: "Crypto Dashboard",
      description: "Live cryptocurrency tracker with charts and price alerts.",
      github: "https://github.com/yourusername/crypto-dashboard",
      demo: "https://crypto-dashboard-demo.vercel.app",
      tags: ["React", "TypeScript", "Chart.js"],
    },
    {
      title: "E-Learning Platform",
      description: "Full-stack LMS with authentication, quizzes, and video content.",
      github: "https://github.com/yourusername/elearning",
      demo: "https://elearning-demo.vercel.app",
      tags: ["Node.js", "MongoDB", "React"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-background text-gray-100 font-sans">
      <CustomStyles />

      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass-effect border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="text-xl font-bold text-gradient">Your Name.</div>

          <nav className="hidden md:flex space-x-8">
            {["home", "services", "about", "skills", "projects", "timeline", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollToSection(s)}
                className={`capitalize transition hover:text-blue-400 ${activeSection === s ? "text-blue-400" : "text-gray-300"}`}
              >
                {s}
              </button>
            ))}
          </nav>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700/50">
            <nav className="flex flex-col space-y-4">
              {["home", "services", "about", "skills", "projects", "timeline", "contact"].map((s) => (
                <button
                  key={s}
                  onClick={() => scrollToSection(s)}
                  className={`capitalize text-left transition hover:text-blue-400 ${activeSection === s ? "text-blue-400" : "text-gray-300"}`}
                >
                  {s}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.img
              src="https://placehold.co/160x160/292F42/A0AEC0?text=Your+Photo"
              alt="profile"
              className="w-40 h-40 rounded-full mx-auto border-4 border-blue-400/20"
              whileHover={{ scale: 1.05 }}
            />

            <h1 className="text-6xl font-extrabold mt-6 text-gradient">
              I'm Your Name.
            </h1>

            <p className="text-xl text-gray-400 mt-4">
              A passionate <span className="text-white">Software Engineer</span> building animated digital experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button variant="hero" size="xl" onClick={() => scrollToSection("projects")}>
                View My Work <ArrowRight className="ml-2" size={20} />
              </Button>

              <Button variant="glass" size="xl" onClick={() => scrollToSection("contact")}>
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
              Featured Projects
            </h2>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={fadeUp}
                  whileHover={{ scale: 1.05 }}
                  className="glass-effect p-6 rounded-2xl hover:shadow-xl"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-100">{p.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{p.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-blue-400/10 text-blue-400 text-xs rounded-full border border-blue-400/20">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button variant="ghost" size="sm" asChild>
                      <a href={p.github} target="_blank" rel="noreferrer">
                        <Github size={16} /> Code
                      </a>
                    </Button>

                    <Button variant="ghost" size="sm" asChild>
                      <a href={p.demo} target="_blank" rel="noreferrer">
                        <ExternalLink size={16} /> Demo
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold mb-8 text-gradient">Let's Connect</h2>
            <p className="text-lg text-gray-300 mb-12">
              Open to new opportunities, collaborations & chats. Reach out!
            </p>

            <Button variant="hero" size="xl" asChild>
              <a href="mailto:youremail@example.com">
                <Mail className="mr-2" size={20} /> Contact Me
              </a>
            </Button>

            <div className="flex justify-center gap-6 mt-8">
              <Button variant="glass" size="icon" asChild>
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">
                  <Linkedin size={24} />
                </a>
              </Button>

              <Button variant="glass" size="icon" asChild>
                <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">
                  <Github size={24} />
                </a>
              </Button>

              <Button variant="glass" size="icon" asChild>
                <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer">
                  <Twitter size={24} />
                </a>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Portfolio;
