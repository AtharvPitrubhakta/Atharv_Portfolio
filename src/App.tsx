import React, { useState, useEffect, useRef } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Server,
  Palette,
  ChevronRight,
  Menu,
  X,
  Download,
  Send,
  MapPin,
  Phone,
  Award,
  Briefcase,
  GraduationCap,
  Folder,
  User,
  MessageSquare,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import StudyNotion from "./assets/StudyNotion.png";
import ExpenseTracker from "./assets/ExpenseTracker.png";

type SectionName =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "contact";

const Portfolio: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionName>("summary");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Include subject (was present in your vanilla HTML version)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "" | "sending" | "success" | "error"
  >("");

  // allow null on the RefObject generic
  const sectionRefs: Record<
    SectionName,
    React.RefObject<HTMLElement | null>
  > = {
    summary: useRef<HTMLElement | null>(null),
    skills: useRef<HTMLElement | null>(null),
    experience: useRef<HTMLElement | null>(null),
    education: useRef<HTMLElement | null>(null),
    projects: useRef<HTMLElement | null>(null),
    contact: useRef<HTMLElement | null>(null),
  };

  // isVisible typed as partial so keys are optional
  const [isVisible, setIsVisible] = useState<
    Partial<Record<SectionName, boolean>>
  >({});

  // formRef to attach to the contact form
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    // Initialize EmailJS with your public key
    // ⚠️ If you prefer, move this key to an env var (VITE_...) for production
    emailjs.init("hFpUAq4gr4amVCelH");

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = Object.keys(sectionRefs) as SectionName[];
      for (const section of sections) {
        const element = sectionRefs[section].current;
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (entry.target as HTMLElement).id) {
            const id = (entry.target as HTMLElement).id as SectionName;
            setIsVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    (
      Object.values(sectionRefs) as React.RefObject<HTMLElement | null>[]
    ).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // strongly typed scrollToSection
  const scrollToSection = (section: SectionName) => {
    const ref = sectionRefs[section];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  // typed navItems
  const navItems: {
    id: SectionName;
    label: string;
    icon: React.ReactElement;
  }[] = [
    { id: "summary", label: "Summary", icon: <User className="w-4 h-4" /> },
    { id: "skills", label: "Skills", icon: <Code2 className="w-4 h-4" /> },
    {
      id: "experience",
      label: "Experience",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      id: "education",
      label: "Education",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    { id: "projects", label: "Projects", icon: <Folder className="w-4 h-4" /> },
    {
      id: "contact",
      label: "Contact",
      icon: <MessageSquare className="w-4 h-4" />,
    },
  ];

  const roles = [
    "MERN Stack Developer",
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
  ];

  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500); // change every 2.5 seconds
    return () => clearInterval(interval);
  }, []);

  // const skillCategories = [
  //   {
  //     category: "Frontend",
  //     icon: <Code2 className="w-8 h-8" />,
  //     color: "from-blue-500 to-cyan-500",
  //     skills: [
  //       { name: "React.js", icon: <Code2 className="w-5 h-5" /> },
  //       { name: "Next.js", icon: <Code2 className="w-5 h-5" /> },
  //       { name: "JavaScript", icon: <Code2 className="w-5 h-5" /> },
  //       { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
  //       { name: "HTML5 & CSS3", icon: <Palette className="w-5 h-5" /> },
  //       { name: "Tailwind CSS", icon: <Palette className="w-5 h-5" /> },
  //       { name: "Redux", icon: <Code2 className="w-5 h-5" /> },
  //       { name: "Material-UI", icon: <Palette className="w-5 h-5" /> },
  //     ],
  //   },
  //   {
  //     category: "Backend",
  //     icon: <Server className="w-8 h-8" />,
  //     color: "from-green-500 to-emerald-500",
  //     skills: [
  //       { name: "Node.js", icon: <Server className="w-5 h-5" /> },
  //       { name: "Express.js", icon: <Server className="w-5 h-5" /> },
  //       { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
  //       { name: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
  //       { name: "REST API", icon: <Server className="w-5 h-5" /> },
  //       { name: "GraphQL", icon: <Server className="w-5 h-5" /> },
  //       { name: "Socket.io", icon: <Server className="w-5 h-5" /> },
  //       { name: "JWT Auth", icon: <Server className="w-5 h-5" /> },
  //     ],
  //   },
  //   {
  //     category: "Tools & Others",
  //     icon: <Palette className="w-8 h-8" />,
  //     color: "from-purple-500 to-pink-500",
  //     skills: [
  //       { name: "Git & GitHub", icon: <Github className="w-5 h-5" /> },
  //       { name: "VS Code", icon: <Code2 className="w-5 h-5" /> },
  //       { name: "Postman", icon: <Server className="w-5 h-5" /> },
  //       { name: "Docker", icon: <Server className="w-5 h-5" /> },
  //       { name: "AWS", icon: <Server className="w-5 h-5" /> },
  //       { name: "Firebase", icon: <Database className="w-5 h-5" /> },
  //       { name: "Figma", icon: <Palette className="w-5 h-5" /> },
  //       { name: "Vercel", icon: <Server className="w-5 h-5" /> },
  //     ],
  //   },
  // ];

  const skillCategories = [
    {
      category: "Frontend",
      icon: <Code2 className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React.js", icon: <Code2 className="w-5 h-5" /> },
        { name: "Next.js", icon: <Code2 className="w-5 h-5" /> },
        { name: "JavaScript", icon: <Code2 className="w-5 h-5" /> },
        { name: "TypeScript", icon: <Code2 className="w-5 h-5" /> },
        { name: "HTML5 & CSS3", icon: <Palette className="w-5 h-5" /> },
        { name: "Tailwind CSS", icon: <Palette className="w-5 h-5" /> },
        { name: "Redux", icon: <Code2 className="w-5 h-5" /> },
        { name: "Material UI", icon: <Palette className="w-5 h-5" /> },
      ],
    },
    {
      category: "Backend",
      icon: <Server className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: <Server className="w-5 h-5" /> },
        { name: "Express.js", icon: <Server className="w-5 h-5" /> },
        { name: "MongoDB", icon: <Database className="w-5 h-5" /> },
        { name: "PostgreSQL", icon: <Database className="w-5 h-5" /> },
        { name: "REST APIs", icon: <Server className="w-5 h-5" /> },
        { name: "JWT Auth", icon: <Server className="w-5 h-5" /> },
      ],
    },
    {
      category: "Tools & Others",
      icon: <Palette className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "Git & GitHub", icon: <Github className="w-5 h-5" /> },
        { name: "Postman", icon: <Server className="w-5 h-5" /> },
        { name: "AWS", icon: <Server className="w-5 h-5" /> },
        { name: "Firebase", icon: <Database className="w-5 h-5" /> },
        { name: "Vercel", icon: <Server className="w-5 h-5" /> },
        { name: "Figma", icon: <Palette className="w-5 h-5" /> },
      ],
    },
  ];

  const projects = [
    {
      title: "Study Notion (Ed-Tech Platform)",
      description:
        "A full-stack MERN Ed-Tech app with role-based authentication, course management, and secure payments via Razorpay.",
      image: StudyNotion,
      tech: ["React", "Node.js", "MongoDB", "JWT", "Redux", "Razorpay"],
      github: "https://github.com/AtharvPitrubhakta/StudyNotion",
      live: "#",
      featured: true,
    },
    {
      title: "Expense Tracker App",
      description:
        "A MERN-based app for managing personal finances with CRUD operations, filtering, and data visualization.",
      image: ExpenseTracker,
      tech: ["React", "Node.js", "MongoDB", "JWT", "Redux"],
      github: "https://github.com/AtharvPitrubhakta/Expense-Tracker",
      live: "#",
      featured: false,
    },
    {
      title: "Transaction Dashboard",
      description:
        "Transaction Dashboard is a website that allows users to efficiently manage and analyze their financial transactions through a user-friendly interface.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      tech: ["React", "Node.js", "Chart.js", "Tailwind"],
      github: "https://github.com/AtharvPitrubhakta/Transaction_Dashboard",
      live: "#",
      featured: false,
    },
    {
      title: "AI Content Generator",
      description:
        "AI-powered content creation tool with OpenAI integration, template library, and export functionality.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      tech: ["Next.js", "OpenAI", "MongoDB", "TypeScript"],
      github: "#",
      live: "#",
      featured: true,
    },
    {
      title: "Real Estate Platform",
      description:
        "Property listing platform with advanced search filters, virtual tours, and agent dashboard.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop",
      tech: ["React", "Firebase", "Google Maps", "Material-UI"],
      github: "#",
      live: "#",
      featured: false,
    },
    {
      title: "Fitness Tracker App",
      description:
        "Health and fitness tracking application with workout plans, progress charts, and nutrition logging. Built backend API’s and integrations to connect the chatbot interface with the underlying NLP model.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
      tech: ["React Native", "Node.js", "MongoDB", "Redux"],
      github: "#",
      live: "#",
      featured: false,
    },
  ];

  const experience = [
    {
      role: "Software Development Engineer I",
      company: "Nativbyte – Pune, IN",
      location: "Pune, India",
      period: "Oct 2024 – Mar 2025",
      description:
        "Developed an AI-powered chatbot platform with React, Node.js, and secure LLM integrations. Built REST APIs and UI features supporting document, URL, and video-based question answering.",
      achievements: [
        "Created reusable React UI components",
        "Integrated chatbot with AI/ML services",
        "Enhanced app responsiveness and accessibility",
      ],
    },
    {
      role: "Software Developer Intern",
      company: "SunRayz Technology – Pune, IN",
      location: "Pune, India",
      period: "Nov 2023 – Apr 2024",
      description:
        "Built a school management system enabling teachers, students, and admins to manage assignments, track progress, and communicate seamlessly.",
      achievements: [
        "Developed multiple role-based dashboards",
        "Improved UI/UX for key academic modules",
      ],
    },
  ];

  const certifications = [
    "Web Development Bootcamp (MERN Stack) - CODEHELP",
    "MERN Stack Development - Giri's Tech Hub",
    "Basic to Advanced Structured Query - Skill Nation",
    "Training on Core JAVA - Aspiring Careers",
  ];

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // basic validation can be added here
    setFormStatus("sending");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject || "Portfolio Contact",
      message: formData.message,
    };

    try {
      // use same service/template ids you used in app.js
      const serviceId = "service_wucj1fn";
      const templateId = "template_6uayn4g";
      const result = await emailjs.send(serviceId, templateId, templateParams);
      // success
      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      // clear success after delay
      setTimeout(() => setFormStatus(""), 3000);
      console.log("EmailJS success:", result);
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus(""), 3000);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-72 h-72 ${
            darkMode ? "bg-blue-500" : "bg-blue-300"
          } rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob`}
        ></div>
        <div
          className={`absolute top-40 right-10 w-72 h-72 ${
            darkMode ? "bg-purple-500" : "bg-purple-300"
          } rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000`}
        ></div>
        <div
          className={`absolute bottom-20 left-1/2 w-72 h-72 ${
            darkMode ? "bg-pink-500" : "bg-pink-300"
          } rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000`}
        ></div>
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? darkMode
              ? "bg-gray-900/90 backdrop-blur-lg shadow-2xl border-b border-gray-800"
              : "bg-white/90 backdrop-blur-lg shadow-2xl border-b border-gray-200"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient cursor-pointer"
              onClick={() => scrollToSection("summary")}
            >
              Atharv.dev
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-200"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div
              className={`md:hidden mt-4 pb-4 space-y-2 animate-slideDown ${
                darkMode ? "bg-gray-800" : "bg-white"
              } rounded-lg p-4`}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full px-4 py-3 rounded-lg transition-all duration-300 flex items-center gap-3 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                      : darkMode
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Summary Section */}
      <section
        id="summary"
        ref={sectionRefs.summary}
        className="min-h-screen flex items-center justify-center px-6 pt-24 pb-4 relative"
      >
        <div
          className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
            isVisible.summary
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* <div className="mb-8 relative inline-block">
            <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 animate-spin-slow">
              <div
                className={`w-full h-full rounded-full ${
                  darkMode ? "bg-gray-900" : "bg-white"
                } flex items-center justify-center`}
              >
                <User className="w-20 h-20 text-blue-500" />
              </div>
            </div>
          </div> */}

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fadeInUp">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Atharv Pitrubhakta
            </span>
          </h1>

          <div className="text-2xl md:text-3xl mb-6 font-semibold h-8 md:h-10 flex justify-center items-center">
            <span
              key={roles[currentRole]} // triggers animation on change
              className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-opacity duration-700 ease-in-out animate-fadeIn"
            >
              {roles[currentRole]}
            </span>
          </div>

          <p
            className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Passionate about crafting elegant solutions to complex problems. I
            specialize in building
            <span className="font-semibold text-blue-500">
              {" "}
              scalable web applications
            </span>{" "}
            with
            <span className="font-semibold text-purple-500">
              {" "}
              modern technologies
            </span>{" "}
            and
            <span className="font-semibold text-pink-500">
              {" "}
              beautiful user interfaces
            </span>
            . With around 1 years of experience, I turn ideas into reality
            through clean code and creative design.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div
              className={`px-6 py-3 rounded-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <span className="text-blue-500 font-bold text-xl">15+</span>
              <span
                className={`ml-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Projects
              </span>
            </div>
            <div
              className={`px-6 py-3 rounded-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <span className="text-purple-500 font-bold text-xl">1+</span>
              <span
                className={`ml-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Years Exp
              </span>
            </div>
            <div
              className={`px-6 py-3 rounded-full ${
                darkMode ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              <span className="text-pink-500 font-bold text-xl">50+</span>
              <span
                className={`ml-2 ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Happy Clients
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 inline-flex items-center gap-2 hover:scale-105"
            >
              View Projects
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1  transition-transform" />
            </button>
            <a
              // href="/Atharv_Pitrubhakta_Resume.pdf"
              // download="Atharv_Pitrubhakta_Resume.pdf"
              href="/Atharv_7083351169.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 border-2 border-gray-700"
                  : "bg-white hover:bg-gray-50 border-2 border-gray-300"
              }`}
            >
              <Download className="w-5 h-5" />
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={sectionRefs.skills}
        className={`py-24 px-6 relative ${
          darkMode ? "bg-gray-800/30" : "bg-white/50"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible.skills
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Skills & Expertise
              </span>
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, catIndex) => (
              <div
                key={catIndex}
                className={`rounded-2xl overflow-hidden transition-all duration-700 hover:scale-105 ${
                  darkMode ? "bg-gray-900/50" : "bg-white"
                } shadow-xl hover:shadow-2xl`}
                style={{
                  animationDelay: `${catIndex * 200}ms`,
                  animation: isVisible.skills
                    ? "fadeInUp 0.8s ease-out forwards"
                    : "none",
                }}
              >
                {/* Category Header */}
                <div
                  className={`bg-gradient-to-r ${category.color} p-6 text-white`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{category.category}</h3>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`group p-4 rounded-lg transition-all duration-300 cursor-pointer ${
                          darkMode
                            ? "bg-gray-800 hover:bg-gray-750 border border-gray-700"
                            : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                        } hover:scale-110 hover:shadow-lg`}
                        style={{
                          animationDelay: `${
                            catIndex * 200 + skillIndex * 50
                          }ms`,
                          animation: isVisible.skills
                            ? "scaleIn 0.5s ease-out forwards"
                            : "none",
                          opacity: isVisible.skills ? 1 : 0,
                        }}
                      >
                        <div className="flex flex-col items-center gap-2 text-center">
                          <div
                            className={`bg-gradient-to-r ${category.color} p-2 rounded-lg text-white group-hover:scale-110 transition-transform`}
                          >
                            {skill.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={sectionRefs.experience}
        className="py-24 px-6 relative"
      >
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible.experience
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Work Experience
              </span>
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              My professional journey and achievements
            </p>
          </div>

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <div
                key={index}
                className={`relative pl-8 md:pl-12 transition-all duration-700 ${
                  isVisible.experience
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div
                  className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                    darkMode ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
                <div className="absolute left-[-8px] top-8 w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>

                <div
                  className={`p-8 rounded-xl ${
                    darkMode ? "bg-gray-900/50" : "bg-white"
                  } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <Briefcase className="w-6 h-6 text-blue-500" />
                        {exp.role}
                      </h3>
                      <p className="text-xl text-purple-500 mb-2">
                        {exp.company}
                      </p>
                      <p
                        className={`flex items-center gap-2 ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold mt-4 md:mt-0 inline-block ${
                        darkMode
                          ? "bg-gray-800 text-gray-300"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <p
                    className={`mb-4 leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {exp.description}
                  </p>

                  <div className="space-y-2">
                    <p className="font-semibold text-blue-500 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Key Achievements:
                    </p>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className={`flex items-center gap-2 ${
                            darkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <ChevronRight className="w-4 h-4 text-purple-500" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        ref={sectionRefs.education}
        className={`py-24 px-6 relative ${
          darkMode ? "bg-gray-800/30" : "bg-white/50"
        }`}
      >
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible.education
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Education
              </span>
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Academic background and qualifications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              className={`p-8 rounded-xl ${
                darkMode ? "bg-gray-900/50" : "bg-white"
              } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Bachelor of Technology
                </h3>
                <p className="text-xl text-blue-500 mb-2">
                  Computer Science & Engineering
                </p>
                <p
                  className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}
                >
                  Savitribai Phule Pune University
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    Duration:
                  </span>
                  <span className="font-semibold">2021 - 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span
                    className={darkMode ? "text-gray-400" : "text-gray-600"}
                  >
                    CGPA:
                  </span>
                  <span className="font-semibold text-green-500">
                    8.32 / 10
                  </span>
                </div>
                <div
                  className={`pt-3 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Specialized in Web Development, Data Structures, Algorithms,
                    and Software Engineering.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-8 rounded-xl ${
                darkMode ? "bg-gray-900/50" : "bg-white"
              } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group`}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Certifications</h3>
                <p className="text-xl text-purple-500 mb-2">
                  Professional Development
                </p>
              </div>

              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      darkMode ? "bg-gray-800" : "bg-gray-50"
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 text-purple-500" />
                    <span
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={sectionRefs.projects}
        className="py-24 px-6 relative"
      >
        <div
          className={`max-w-7xl mx-auto transition-all duration-1000 ${
            isVisible.projects
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Some of my recent work and side projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`group rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                  darkMode ? "bg-gray-900/50" : "bg-white"
                } shadow-xl hover:shadow-2xl ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isVisible.projects
                    ? "fadeInUp 0.6s ease-out forwards"
                    : "none",
                }}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">
                    {project.title}
                  </h3>
                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-400" : "text-gray-600"
                    } line-clamp-3`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          darkMode
                            ? "bg-gray-800 text-gray-300"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors group/link"
                    >
                      <Github className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                      <span className="font-medium">Code</span>
                    </a>
                    <a
                      href={project.live}
                      className="flex items-center gap-2 text-purple-500 hover:text-purple-600 transition-colors group/link"
                    >
                      <ExternalLink className="w-5 h-5 group-hover/link:scale-110 transition-transform" />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://github.com/AtharvPitrubhakta"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 border-2 border-gray-700"
                  : "bg-white hover:bg-gray-50 border-2 border-gray-300"
              }`}
            >
              <Github className="w-5 h-5" />
              View More on GitHub
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        ref={sectionRefs.contact}
        className={`py-24 px-6 relative ${
          darkMode ? "bg-gray-800/30" : "bg-white/50"
        }`}
      >
        <div
          className={`max-w-5xl mx-auto transition-all duration-1000 ${
            isVisible.contact
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            <p
              className={`text-lg ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Let's discuss your next project or just say hello
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <div
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-900/50" : "bg-white"
                } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:atharv@example.com"
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      atharvpitrubhakta@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-900/50" : "bg-white"
                } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+919876543210"
                      className="text-purple-500 hover:text-purple-600 transition-colors"
                    >
                      +91 70833 51169
                    </a>
                  </div>
                </div>
              </div>

              <div
                className={`p-6 rounded-xl ${
                  darkMode ? "bg-gray-900/50" : "bg-white"
                } shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                <a
                  href="https://github.com/AtharvPitrubhakta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-white font-semibold hover:scale-105"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/atharv777/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-white font-semibold hover:scale-105"
                >
                  <Linkedin className="w-5 h-5" />
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Contact Form */}
            {/* <div
              className={`p-8 rounded-xl ${
                darkMode ? "bg-gray-900/50" : "bg-white"
              } shadow-xl`}
            >
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 resize-none ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    formStatus === "sending"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  }`}
                >
                  {formStatus === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <Award className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div> */}
            {/* Contact Form */}
            <div
              className={`p-8 rounded-xl ${
                darkMode ? "bg-gray-900/50" : "bg-white"
              } shadow-xl`}
            >
              <form
                ref={formRef}
                onSubmit={handleFormSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-500 resize-none ${
                      darkMode
                        ? "bg-gray-800 border border-gray-700 text-white"
                        : "bg-gray-50 border border-gray-300 text-gray-900"
                    }`}
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    formStatus === "sending"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  }`}
                >
                  {formStatus === "sending" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : formStatus === "success" ? (
                    <>
                      <Award className="w-5 h-5" />
                      Message Sent!
                    </>
                  ) : formStatus === "error" ? (
                    <>
                      <span>Failed — try again</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`py-12 px-6 ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                Atharv.dev
              </div>
              <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
                Building the web, one project at a time
              </p>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4">
                <a
                  href="https://github.com/AtharvPitrubhakta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/atharv777/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="mailto:atharvpitrubhakta@gmail.com"
                  className={`p-3 rounded-lg transition-all duration-300 hover:scale-110 ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                © 2024 Atharv Pitrubhakta. Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
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

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }

      `}</style>
    </div>
  );
};

export default Portfolio;
