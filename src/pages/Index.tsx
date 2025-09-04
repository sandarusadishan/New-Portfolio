import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  ArrowRight,
  Clock,
  BriefcaseBusiness,
  Sparkles,
  Code,
  Facebook,
  MessageSquare,
  Youtube,
  Instagram,
  Sun,
  Moon,
} from "lucide-react";
import emailjs from '@emailjs/browser';

/* ===============================
  🔧 QUICK PERSONALIZATION (EDIT)
  =============================== */
const PROFILE = {
  name: "Sandaru Sadishan",
  headlineRoles: ["Software Engineer", "Frontend Developer", "UI/UX Enthusiast", "Open Source Lover"],
  email: "sandarusadishan0404@gmail.com",
  social: {
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    facebook: "https://facebook.com/yourprofile",
    whatsapp: "https://wa.me/yourphonenumber",
    youtube: "https://youtube.com/yourchannel",
    instagram: "https://instagram.com/yourprofile",
  },
};

// 🧱 Services you offer
const SERVICES = [
  { title: "Web Development", icon: Globe, description: "Responsive, scalable web apps with modern stacks." },
  { title: "UI/UX Design", icon: Palette, description: "Clean, accessible interfaces with delightful details." },
  { title: "API Engineering", icon: Server, description: "Robust backends, REST/GraphQL integrations." },
  { title: "Mobile Apps", icon: Smartphone, description: "Cross‑platform apps with React Native." },
];

// 🧠 Skills (name + 0..100 level)
const TECHNOLOGIES = {
  web_and_backend: [
    {
      name: "React",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      level: 92,
      description: "Building interactive UIs with React & Next.js",
    },
    {
      name: "JavaScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      level: 90,
      description: "Dynamic and versatile frontend development",
    },
    {
      name: "TypeScript",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      level: 88,
      description: "Typed JavaScript for scalable apps",
    },
    {
      name: "Node.js",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      level: 85,
      description: "Event-driven backend with Express.js",
    },
    {
      name: "HTML5",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      level: 95,
      description: "Semantic markup & responsive layouts",
    },
    {
      name: "CSS3",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      level: 93,
      description: "Modern styling with Flexbox & Grid",
    },
    {
      name: "Tailwind CSS",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      level: 90,
      description: "Utility-first responsive design system",
    },
    {
      name: "Python",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      level: 80,
      description: "Data analysis, scripting & automation",
    },
    {
      name: "Spring Boot",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      level: 85,
      description: "Building microservices and robust backends",
    },
  ],
  mobile: [
    {
      name: "Flutter",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
      level: 80,
      description: "Cross-platform mobile development",
    },
    {
      name: "Java",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
      level: 82,
      description: "Enterprise-level backend development",
    },
    {
      name: "Kotlin",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
      level: 75,
      description: "Modern Android app development",
    },
  ],
  databases: [
    {
      name: "MongoDB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      level: 78,
      description: "NoSQL database design & aggregation",
    },
    {
      name: "MySQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      level: 82,
      description: "Relational database & query optimization",
    },
    {
      name: "SQL",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      level: 80,
      description: "Database design & query building",
    },
    {
      name: "Firebase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      level: 75,
      description: "Realtime mobile and web database solutions.",
    },
    {
      name: "Supabase",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
      level: 70,
      description: "Open-source Firebase alternative with a Postgres backend.",
    },
  ],
};


// 🗂️ Projects (👉 Replace with yours!)
const PROJECTS = [
  {
    title: "Task Management App",
    description:
      "Collaborative task manager with real‑time updates, drag‑and‑drop boards, and role‑based auth.",
    github: "https://github.com/yourusername/task-manager",
    demo: "https://demo-task-manager.vercel.app",
    tags: ["React", "Firebase", "TailwindCSS"],
    cover: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "E‑Commerce Dashboard",
    description:
      "Admin dashboard with analytics, inventory, and order workflows. Fully responsive + theming.",
    github: "https://github.com/yourusername/ecommerce-dashboard",
    demo: "https://demo-ecommerce-dashboard.vercel.app",
    tags: ["React", "TypeScript", "TailwindCSS"],
    cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEtUIkXu5Owr_ze2_HvDi4QyRM3d8e97k4zw&s",
  },
  {
    title: "Personal Blog",
    description: "MDX blog with syntax highlighting, RSS, and SEO best practices.",
    github: "https://github.com/yourusername/personal-blog",
    demo: "https://demo-personal-blog.vercel.app",
    tags: ["Next.js", "MDX", "Vercel"],
    cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Personal Blog",
    description: "MDX blog with syntax highlighting, RSS, and SEO best practices.",
    github: "https://github.com/yourusername/personal-blog",
    demo: "https://demo-personal-blog.vercel.app",
    tags: ["Next.js", "MDX", "Vercel"],
    cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Personal Blog",
    description: "MDX blog with syntax highlighting, RSS, and SEO best practices.",
    github: "https://github.com/yourusername/personal-blog",
    demo: "https://demo-personal-blog.vercel.app",
    tags: ["Next.js", "MDX", "Vercel"],
    cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Personal Blog",
    description: "MDX blog with syntax highlighting, RSS, and SEO best practices.",
    github: "https://github.com/yourusername/personal-blog",
    demo: "https://demo-personal-blog.vercel.app",
    tags: ["Next.js", "MDX", "Vercel"],
    cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
  },
];

// 🗓️ Timeline (edit freely)
const TIMELINE = [
  {
    year: "2024 – Present",
    title: "Software Engineering Intern",
    company: "Tech Solutions Inc.",
    description:
      "Built features for a large e‑commerce platform. Collaborated in Agile squads, improved performance by 25%.",
  },
  {
    year: "2023",
    title: "Freelance Web Developer",
    company: "Self‑Employed",
    description:
      "Delivered custom websites for SMBs with Lighthouse 95+ scores and solid SEO foundations.",
  },
  {
    year: "2022",
    title: "Student Researcher",
    company: "University of Tech",
    description:
      "Explored ML models for tabular data; contributed to data pipelines and experiment tracking.",
  },
];

/* ===============================
  🎨 Local Styles / Effects
  =============================== */
const CustomStyles = () => (
  <style>{`
    .glass {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.12);
      backdrop-filter: blur(10px);
    }
    .dark .glass {
      background: rgba(0,0,0,0.2);
      border: 1px solid rgba(255,255,255,0.05);
    }
    .bg-grid {
      background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
      background-size: 24px 24px, 24px 24px;
      background-position: -1px -1px, -1px -1px;
    }
    .dark .bg-grid {
      background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
    }
    @keyframes floatSlow {
      0%,100%{ transform: translateY(0) }
      50%{ transform: translateY(-18px) }
    }
    .float-slow { animation: floatSlow 10s ease-in-out infinite; }
    .footer-shadow {
      box-shadow: 0 -10px 15px -3px rgba(0,0,0,0.1), 0 -4px 6px -4px rgba(0,0,0,0.1);
    }
    .dark .footer-shadow {
      box-shadow: 0 -10px 15px -3px rgba(0,0,0,0.3), 0 -4px 6px -4px rgba(0,0,0,0.3);
    }
    .flip-card-inner {
        transform-style: preserve-3d;
        transition: transform 0.6s;
    }
    .flip-card-front, .flip-card-back {
        backface-visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .flip-card-back {
        transform: rotateY(180deg);
    }
    .group:hover .flip-card-inner {
        transform: rotateY(180deg);
    }
  `}</style>
);

/* ===============================
  🧠 Small Utilities / Hooks
  =============================== */
const useTypewriter = (words, speed = 70, pause = 1200) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];

    if (!deleting && subIndex === word.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }

    const t = setTimeout(() => setSubIndex((v) => v + (deleting ? -1 : 1)), deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [deleting, subIndex, index, words, speed, pause]);

  return words[index % words.length].slice(0, subIndex);
};

const Button = ({ children, asChild, variant = "solid", size = "md", className = "", ...props }) => {
  const classes = useMemo(() => {
    const base = "inline-flex items-center justify-center rounded-full transition focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variants = {
      solid: "bg-white text-slate-900 hover:opacity-90",
      glass: "glass text-white hover:bg-white/10",
      ghost: "text-white/80 hover:text-white hover:bg-white/10",
      hero: "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:opacity-95",
      icon: "glass",
    };
    const sizes = { sm: "px-4 py-2 text-sm", md: "px-5 py-2.5", lg: "px-7 py-3 text-lg", xl: "px-8 py-4 text-lg" };
    return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  }, [variant, size, className]);

  const Comp = asChild ? motion.a : motion.button;
  return (
    <Comp 
      className={classes} 
      whileHover={{ scale: 1.05, backgroundColor: (variant === 'hero' ? '#2563eb' : (variant === 'glass' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)')) }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {children}
    </Comp>
  );
};

/* ===============================
  🌈 Animation Variants
  =============================== */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger = { show: { transition: { staggerChildren: 0.15 } } };

/* ===============================
  ✨ Fancy Background Layers
  =============================== */
const BackgroundEffects = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* gradient blobs */}
    <motion.div
      aria-hidden
      className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-3xl"
      animate={{ scale: [1, 1.1, 1], x: [0, -15, 0], y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 12 }}
    />
    <motion.div
      aria-hidden
      className="absolute -bottom-24 -right-24 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_60%)] blur-3xl"
      animate={{ scale: [1, 1.08, 1], x: [0, 10, 0], y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 14 }}
    />
  </div>
);

/* ===============================
  🔩 Tilt Card (3D hover)
  =============================== */
const useTilt = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handle = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateY(${px * 10}deg) rotateX(${py * -10}deg)`;
    };
    const reset = () => (el.style.transform = "rotateY(0deg) rotateX(0deg)");
    el.addEventListener("mousemove", handle);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", handle);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);
  return ref;
};

/* ===============================
  🏁 Main Portfolio Component
  =============================== */
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef();
  const typed = useTypewriter(PROFILE.headlineRoles);
  
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      return savedMode === "true" || window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", darkMode);
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  const allSkills = useMemo(() => {
    const skillsByCategory = Object.entries(TECHNOLOGIES).map(([category, skills]) => ({
      category: category.replace(/_/g, " "),
      skills,
    }));
    const totalSkills = skillsByCategory.flatMap(cat => cat.skills);
    return { categorized: skillsByCategory, total: totalSkills };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const ids = ["home", "services", "about", "skills", "projects", "timeline", "contact"];
      const y = window.scrollY + 200;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("Sending message...");
  
    const serviceID = 'service_0xz4lzu';
    const templateIDToCompany = 'template_q02hspr';
    const templateIDToCustomer = 'template_87fcm78';
    const publicKey = 'p6uoW575AKT5hjL4J';
  
    try {
      await Promise.all([
        emailjs.sendForm(serviceID, templateIDToCompany, formRef.current, publicKey),
        emailjs.sendForm(serviceID, templateIDToCustomer, formRef.current, publicKey)
      ]);
  
      setStatusMessage("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      setStatusMessage("Failed to send message. Please try again later.");
      console.error('EmailJS Error:', error);
    }
  };

  return (
    <div className={`relative min-h-screen ${darkMode ? 'dark' : ''} bg-[linear-gradient(135deg,#f1f5f9_0%,#e2e8f0_100%)] dark:bg-[linear-gradient(135deg,#0f172a_0%,#111827_100%)] text-slate-800 dark:text-gray-100 selection:bg-indigo-500/40`}>
      <CustomStyles />
      <BackgroundEffects />

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mt-4 mb-3 glass rounded-2xl px-4 h-14 flex items-center justify-between">
            <button onClick={() => scrollTo("home")} className="font-bold tracking-tight text-lg">
              <span className="text-slate-900 dark:text-white">{PROFILE.name}</span>
              <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/10 dark:bg-white/10 px-2 py-0.5 text-xs text-slate-900 dark:text-white/80">
                <Sparkles size={14} /> Portfolio
              </span>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {["home", "services", "about", "skills", "projects", "timeline", "contact"].map((id) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`capitalize text-sm transition hover:text-slate-900 dark:hover:text-white ${activeSection === id ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-white/70"}`}
                >
                  {id}
                </button>
              ))}
              <Button onClick={toggleDarkMode} variant="icon" size="sm" className="w-9 h-9">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </nav>

            <div className="flex items-center gap-2 md:hidden">
              <Button onClick={toggleDarkMode} variant="icon" size="sm" className="w-9 h-9">
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
              <button className="p-2" onClick={() => setIsMenuOpen((v) => !v)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="md:hidden glass mx-2 rounded-2xl overflow-hidden"
              >
                <div className="px-4 py-4 grid grid-cols-2 gap-3">
                  {["home", "services", "about", "skills", "projects", "timeline", "contact"].map((id) => (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      className={`text-left capitalize rounded-xl px-4 py-3 hover:bg-white/10 transition ${activeSection === id ? "bg-white/10 text-white" : "text-white/80"}`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative">
        {/* Hero */}
        <section id="home" className="min-h-[92vh] flex items-center justify-center px-4 pt-28">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="order-2 lg:order-1"
            >
              <p className="text-slate-500 dark:text-white/70">Hello, I'm</p>
              <h1 className="mt-1 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {PROFILE.name}
              </h1>
              <div className="mt-3 text-xl sm:text-2xl text-white/90 h-[2.2em]">
                <span className="text-slate-500 dark:text-white/70">I am </span>
                <span className="text-slate-900 dark:text-white font-semibold">{typed}</span>
                <span className="animate-pulse">▍</span>
              </div>
              <p className="mt-5 text-slate-600 dark:text-white/70 max-w-prose">
                I craft performant web apps with delightful, accessible interfaces. I love shipping polished
                experiences and collaborating in product‑minded teams.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button variant="hero" size="lg" onClick={() => scrollTo("projects")}>See Projects <ArrowRight className="ml-2" size={18} /></Button>
                <Button variant="glass" size="lg" asChild>
                  <a href={`mailto:${PROFILE.email}`}><Mail size={18} className="mr-2"/>Contact</a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <a href={PROFILE.github} target="_blank"><Github className="mr-2" size={18}/>GitHub</a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="order-1 lg:order-2"
            >
              <div className="relative aspect-square max-w-sm mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-grid opacity-40" />
                <img
                  src="https://placehold.co/600x600/f1f5f9/000000?text=Your+Photo"
                  alt="Profile"
                  className="relative z-10 w-full h-full object-cover rounded-3xl border border-slate-200 dark:border-white/10"
                />
                <motion.div
                  className="absolute -inset-3 rounded-[2rem] bg-gradient-to-tr from-indigo-500/20 to-sky-400/10 blur-2xl"
                  animate={{ opacity: [0.4, 0.7, 0.4] }}
                  transition={{ repeat: Infinity, duration: 6 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              What I Do
            </motion.h2>

            <motion.div
              className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              {SERVICES.map((s) => (
                <motion.div
                  key={s.title}
                  variants={fadeUp}
                  className="glass rounded-2xl p-6 transition border-slate-200 hover:bg-slate-200/50 dark:border-white/10 dark:hover:bg-white/10"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <s.icon className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
                  <h3 className="mt-4 font-semibold text-lg text-slate-900 dark:text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-white/70">{s.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="py-24 px-4">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-3 gap-10 items-center">
            <motion.div className="lg:col-span-2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">About Me</h2>
              <p className="mt-4 text-slate-600 dark:text-white/80 leading-relaxed">
                I'm a passionate engineer with a strong foundation in modern web technologies. I turn complex
                problems into simple, beautiful, and intuitive experiences.
              </p>
              <p className="mt-4 text-slate-500 dark:text-white/70">
                I care about performance, accessibility, and clean architecture. Outside work, I explore open
                source, write, and prototype ideas.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="glass rounded-2xl p-6 border-slate-200 dark:border-white/10">
                <h3 className="font-semibold text-slate-900 dark:text-white">Quick Facts</h3>
                <ul className="mt-3 space-y-2 text-slate-600 dark:text-white/80 text-sm">
                  <li>• Based on the web 🌍</li>
                  <li>• Product‑minded & detail‑oriented</li>
                  <li>• Love design systems & patterns</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>Technical Skills</motion.h2>
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              {Object.entries(TECHNOLOGIES).map(([category, skills]) => (
                <div key={category} className="space-y-4">
                  <h3 className="text-xl font-bold capitalize text-slate-900 dark:text-white">{category.replace(/_/g, " ")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map((s, i) => (
                      <SkillCard key={s.name} skill={s} index={i} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              Featured Projects
            </motion.h2>
            <motion.div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-7" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
              {PROJECTS.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 dark:text-white" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              Professional Timeline
            </motion.h2>
            <div className="mt-12 relative">
              <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10" />
              <div className="space-y-10">
                {TIMELINE.map((e, idx) => (
                  <motion.div key={idx} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="relative">
                    <div className={`sm:grid sm:grid-cols-2 gap-8 ${idx % 2 ? "sm:direction-rtl" : ""}`}>
                      <div className={`sm:text-right ${idx % 2 ? "sm:order-2" : ""}`}>
                        <p className="text-indigo-500 dark:text-indigo-300 font-medium flex items-center gap-2 sm:justify-end"><Clock size={16} /> {e.year}</p>
                        <h3 className="mt-2 font-semibold text-slate-900 dark:text-white">{e.title}</h3>
                        <p className="text-slate-600 dark:text-white/70 text-sm">{e.company}</p>
                      </div>
                      <div className={`${idx % 2 ? "sm:order-1" : ""}`}>
                        <div className="glass rounded-2xl p-5 border-slate-200 dark:border-white/10">
                          <p className="text-slate-600 dark:text-white/80 text-sm leading-relaxed">{e.description}</p>
                        </div>
                      </div>
                    </div>
                    <span className="absolute left-3.5 sm:left-1/2 sm:-translate-x-1/2 top-2 inline-block w-3 h-3 rounded-full bg-indigo-500 dark:bg-indigo-400 ring-4 ring-indigo-500/20 dark:ring-indigo-400/20" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              Let's Connect
            </motion.h2>
            <motion.p className="mt-4 text-slate-600 dark:text-white/80 max-w-prose mx-auto" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
              I'm open to new opportunities, collaborations, or a friendly chat. Fill out the form below to get in touch.
            </motion.p>
            <motion.div
              className="mt-10 glass rounded-2xl p-6 max-w-lg mx-auto border-slate-200 dark:border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-slate-800 dark:text-white/80 mb-1 text-left">Your Name</label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    required
                    className="w-full rounded-lg bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-800 dark:text-white/80 mb-1 text-left">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="pNumber" className="block text-sm font-medium text-slate-800 dark:text-white/80 mb-1 text-left">WhatsApp Number</label>
                  <input
                    type="tel"
                    id="pNumber"
                    name="pNumber"
                    required
                    className="w-full rounded-lg bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-800 dark:text-white/80 mb-1 text-left">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    required
                    className="w-full rounded-lg bg-slate-100/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="text-right">
                  <Button type="submit" variant="hero" size="lg">Send Message</Button>
                </div>
              </form>
              <AnimatePresence>
                {statusMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mt-4 text-center text-sm font-medium ${statusMessage.includes("successfully") ? "text-green-400" : "text-red-400"}`}
                  >
                    {statusMessage}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 px-4 glass rounded-t-2xl footer-shadow">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <Linkedin size={24} />
              </a>
              <a href={PROFILE.social.github} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <Github size={24} />
              </a>
              <a href={PROFILE.social.twitter} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a href={PROFILE.social.facebook} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href={PROFILE.social.whatsapp} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <MessageSquare size={24} />
              </a>
              <a href={PROFILE.social.youtube} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <Youtube size={24} />
              </a>
              <a href={PROFILE.social.instagram} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
            <p className="text-sm text-slate-500 dark:text-white/50 text-center md:text-right">© {new Date().getFullYear()} {PROFILE.name}. All Rights Reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

/* ===============================
  🧩 Project Card Component
  =============================== */
const ProjectCard = ({ project }) => {
  const ref = useTilt();
  return (
    <motion.div variants={fadeUp} className="group">
      <div ref={ref} className="[transform-style:preserve-3d] transition will-change-transform">
        <div className="glass rounded-2xl overflow-hidden border-slate-200 dark:border-white/10">
          {project.cover && (
            <div className="relative overflow-hidden">
              <img src={project.cover} alt="cover" className="h-40 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}
          <div className="p-5">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white">{project.title}</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-white/75">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags?.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100/50 dark:bg-white/10 text-xs text-slate-800 dark:text-white/80 border border-slate-200 dark:border-white/10">
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              {project.github && (
                <Button variant="ghost" asChild><a href={project.github} target="_blank" rel="noreferrer"><Github size={16} className="mr-1"/>Code</a></Button>
              )}
              {project.demo && (
                <Button variant="ghost" asChild><a href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={16} className="mr-1"/>Live</a></Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillCard = ({ skill, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative h-40"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flip-card-inner">
        {/* Front of the card */}
        <motion.div 
            className="flip-card-front glass rounded-2xl p-5 flex flex-col items-center justify-center border-slate-200 dark:border-white/10"
            animate={{ rotateY: isHovered ? -180 : 0, opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.6 }}
        >
          <img src={skill.logo} alt={skill.name} className="w-12 h-12" />
          <span className="mt-3 font-medium text-slate-900 dark:text-white">{skill.name}</span>
        </motion.div>
        
        {/* Back of the card */}
        <motion.div 
            className="flip-card-back glass rounded-2xl p-5 flex flex-col items-center justify-center border-slate-200 dark:border-white/10"
            animate={{ rotateY: isHovered ? 0 : 180, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.6 }}
        >
          <span className="font-bold text-4xl bg-gradient-to-r from-indigo-500 to-sky-400 text-transparent bg-clip-text">
            {skill.level}%
          </span>
          <p className="mt-2 text-sm text-slate-600 dark:text-white/70 text-center">{skill.description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};


export default Portfolio;
