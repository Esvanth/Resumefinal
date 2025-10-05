import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Phone, ExternalLink, Award, Code, Database, Cloud, Monitor, ChevronDown, Menu, X, Send, User, MessageCircle, Download, Sparkles, Zap, Target } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [visibleSections, setVisibleSections] = useState(new Set(['home']));

  // Refs for intersection observer
  const aboutRef = useRef(null);
  const experienceRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const titles = [
    'Full-Stack Developer',
    'Software Developer',
    'Machine Learning Enthusiast',
    'AI-Engineer',
  ];

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const currentTitle = titles[currentIndex];
    let charIndex = 0;
    let isDeleting = false;

    const typeInterval = setInterval(() => {
      if (!isDeleting) {
        if (charIndex < currentTitle.length) {
          setDisplayText(currentTitle.substring(0, charIndex + 1));
          charIndex++;
        } else {
          setTimeout(() => {
            isDeleting = true;
          }, 500);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentTitle.substring(0, charIndex - 1));
          charIndex--;
        } else {
          isDeleting = false;
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observers = [];
    const sections = [
      { ref: aboutRef, name: 'about' },
      { ref: experienceRef, name: 'experience' },
      { ref: projectsRef, name: 'projects' },
      { ref: contactRef, name: 'contact' }
    ];

    sections.forEach(({ ref, name }) => {
      if (ref.current) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections(prev => new Set([...prev, name]));
              }
            });
          },
          {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
          }
        );
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);



  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };
  const handleDownloadResume = () => {
    // Create a link to download your actual PDF resume
    const link = document.createElement('a');
    link.href = '/Esvanth_Resume.pdf'; // Path to your PDF file in public folder
    link.download = 'Resume.pdf'; // Name for the downloaded file
    link.target = '_blank'; // Open in new tab if user wants to view instead of download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Fixed handleSubmit with your actual Formspree endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mnnzypbj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitMessage(' Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setSubmitMessage(' Failed to send message. Please try again or contact directly via email.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 8000);
    }
  };

  const skillCategories = [
    {
      title: "Languages",
      icon: <Code className="w-6 h-6" />,
      skills: ["Python", "JavaScript", "Java", "C", "Node.js", "PHP"],
      color: "from-cyan-400 via-blue-500 to-purple-600",
      glowColor: "shadow-cyan-500/30"
    },
    {
      title: "Web Technologies",
      icon: <Monitor className="w-6 h-6" />,
      skills: ["React.js", "HTML5", "CSS3", "REST APIs", "UI/UX", "Tailwind CSS", "Figma"],
      color: "from-green-400 via-emerald-500 to-teal-600",
      glowColor: "shadow-green-500/30"
    },
    {
      title: "Databases & Tools",
      icon: <Database className="w-6 h-6" />,
      skills: ["MongoDB", "SQL", "Git", "Docker", "CI/CD"],
      color: "from-orange-400 via-pink-500 to-red-600",
      glowColor: "shadow-orange-500/30"
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud className="w-6 h-6" />,
      skills: ["Oracle Cloud", "AWS", "IoT", "DevOps"],
      color: "from-purple-400 via-violet-500 to-indigo-600",
      glowColor: "shadow-purple-500/30"
    }
  ];

  const projects = [
    {
      title: "MedAI Multi-Modal Diagnostic Assistant",
      description: "Multi-modal diagnostic system analyzing medical images (X-rays, MRIs, CT scans) and clinical text simultaneously, achieving 75% diagnostic accuracy with explainable insights for healthcare professionals.",
      tech: ["TensorFlow", "PyTorch", "Streamlit", "NLP", "Computer Vision"],
      features: ["Medical Image Analysis", "Clinical Text Processing", "Explainable AI", "Interactive Dashboard"],
      icon: <Sparkles className="w-8 h-8" />,
      gradient: "from-blue-400 to-purple-500",
      link: "https://medic-multi-model.streamlit.app/"
    },
    {
      title: "AI-Resume Scorer",
      description: "Intelligent resume evaluation system processing applications in seconds with 90% improved screening accuracy, using NLP-based extraction for skills, experience, and education analysis.",
      tech: ["Python", "NLP", "spaCy", "pandas", "NumPy", "Streamlit"],
      features: ["NLP Extraction", "Weighted Scoring", "Data-driven Ranking", "70% Time Reduction"],
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-green-400 to-teal-500",
      link: "https://ai-resumescorer.streamlit.app/"
    },
    {
      title: "WellnessWay – Agentic Health Discovery",
      description: "Intelligent wellness discovery platform leveraging Foursquare Places API and AI agents to recommend parks, yoga studios, organic stores through natural language queries with 80% faster response time.",
      tech: ["React.js", "Redux.js", "REST APIs", "AI Agents"],
      features: ["AI-Powered Search", "Location-based Recommendations", "Redux State Management", "Natural Language Queries"],
      icon: <Target className="w-8 h-8" />,
      gradient: "from-purple-400 to-pink-500",
      link: "https://wellnesssite-final.vercel.app/"
    },
    {
      title: "Portfolio Website",
      description: "Responsive personal portfolio showcasing projects, skills, and professional experience with modern UI/UX principles, seamless navigation, and optimized performance across all devices.",
      tech: ["React.js", "TypeScript", "Tailwind CSS", "PHP", "HTML5"],
      features: ["Type Safety", "Utility-first Styling", "Responsive Design", "Clean Architecture"],
      icon: <Code className="w-8 h-8" />,
      gradient: "from-orange-400 to-red-500",
      link: "https://esvanthresume.vercel.app/"
    }
  ];
  const achievements = [
    {
      title: "Best Idea Award – MODA Taiwan",
      description: "NT$10,000 prize for AI-and-drone agriculture concept",
      icon: <Award className="w-8 h-8 text-yellow-400" />,
      glow: "shadow-yellow-400/30",
      Image: "moda_taiwan_award.png"
    },
    {
      title: "3rd Place – Infocruise Hackathon",
      description: "Innovative prototype coding at Kongu Engineering College",
      icon: <Award className="w-8 h-8 text-orange-400" />,
      glow: "shadow-orange-400/30"
    },
    {
      title: "JLPT N5 Certification",
      description: "Gained Japanese language proficiency through dedicated self-study",
      icon: <Award className="w-8 h-8 text-blue-400" />,
      glow: "shadow-blue-400/30"
    }
  ];

  return (
    <div className="bg-gray-900 text-white overflow-hidden relative min-h-screen">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`
          }}
        ></div>
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              <div className="w-1 h-1 bg-blue-400 rounded-full opacity-40"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div
            className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform"
            onClick={() => scrollTo('home')}
          >
            Esvanth M
          </div>
          <div className="hidden md:flex space-x-8" role="navigation" aria-label="Main navigation">
            {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`capitalize transition-all hover:scale-105 transform relative font-medium ${activeSection === item ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                  }`}
                aria-current={activeSection === item ? 'page' : undefined}
              >
                {item}
                {activeSection === item && (
                  <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" aria-hidden="true"></div>
                )}
              </button>
            ))}
          </div>
          <button
            className="md:hidden hover:scale-110 transition-transform p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-full left-0 w-full bg-gray-900 z-50" role="navigation" aria-label="Mobile navigation menu" style={{ backgroundColor: '#111827' }}>
            <div className="px-4 py-6 space-y-2">
              {['home', 'about', 'experience', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className={`block w-full text-left capitalize py-3 px-4 rounded-lg transition-all font-medium ${activeSection === item
                    ? 'text-cyan-400'
                    : 'text-gray-300 hover:text-cyan-400'
                    }`}
                  style={{
                    backgroundColor: activeSection === item ? '#374151' : '#1f2937',
                    color: activeSection === item ? '#22d3ee' : '#d1d5db'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item) {
                      e.target.style.backgroundColor = '#374151';
                      e.target.style.color = '#22d3ee';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item) {
                      e.target.style.backgroundColor = '#1f2937';
                      e.target.style.color = '#d1d5db';
                    }
                  }}
                  aria-current={activeSection === item ? 'page' : undefined}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative z-10 px-4">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-400 bg-clip-text text-transparent animate-pulse">
              Esvanth M
            </h1>
            <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="relative mb-8">
            <p className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 mb-8 font-light min-h-16 flex items-center justify-center">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                {displayText}
              </span>
              <span className="ml-2 text-cyan-400 animate-ping text-3xl sm:text-4xl">|</span>
            </p>
          </div>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            Crafting innovative digital experiences with cutting-edge technology.
            Specializing in <span className="text-cyan-400 font-semibold">Full-stack development</span>,
            <span className="text-purple-400 font-semibold"> Machine learning</span>, and
            <span className="text-green-400 font-semibold"> Cloud solutions</span>.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-16 px-4">
            <a
              href="mailto:esvanth7@gmail.com"
              className="group flex items-center space-x-3 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold hover:shadow-2xl hover:shadow-cyan-500/30 transition-all hover:scale-105 transform text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span>Get In Touch</span>
            </a>
            <button
              onClick={handleDownloadResume}
              className="group flex items-center space-x-3 border-2 border-purple-700 bg-gradient-to-r from-purple-800 to-pink-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-purple-200 hover:text-white hover:border-purple-500 transition-all hover:scale-105 transform hover:shadow-lg hover:shadow-purple-700/40 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span>Download Resume</span>
            </button>
            <button
              onClick={() => scrollTo('projects')}
              className="group flex items-center space-x-3 border-2 border-green-700 bg-gradient-to-r from-green-800 to-teal-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-green-200 hover:text-white hover:border-green-500 transition-all hover:scale-105 transform hover:shadow-lg hover:shadow-green-700/40 text-sm sm:text-base"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 group-hover:animate-bounce" />
              <span>View Projects</span>
            </button>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section ref={aboutRef} id="about" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('about')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
            }`}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Passionate full-stack developer with expertise in building scalable applications,
              ML model deployment, and DevOps practices. Currently crafting innovative solutions
              at <span className="text-cyan-400 font-semibold">Sybeez</span>, delivering reliable systems
              across ERP, Finance and HRM modules.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={index}
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 hover:bg-gray-800/70 transition-all duration-700 hover:scale-105 transform hover:shadow-xl ${category.glowColor} ${visibleSections.has('about')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
                  }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white group-hover:text-cyan-400 transition-colors">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 bg-gray-700/80 text-gray-300 rounded-full text-xs sm:text-sm border border-white/10 hover:border-cyan-400/50 hover:text-cyan-400 hover:scale-105 transition-all cursor-pointer"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-800/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${visibleSections.has('experience')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
            }`}>
            Experience & Achievements
          </h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className={`space-y-8 transition-all duration-1000 ${visibleSections.has('experience')
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-20'
              }`}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-cyan-400 flex items-center">
                <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full mr-4"></div>
                Professional Experience
              </h3>
              <div className="space-y-6 relative">
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-500"></div>
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-cyan-400/50 hover:scale-105 transform transition-all hover:shadow-xl hover:shadow-cyan-500/20 relative ml-8 sm:ml-12">
                  <div className="absolute -left-10 sm:-left-14 top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full border-4 border-gray-900"></div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">Front-End Developer</h4>
                  <p className="text-cyan-400 mb-4 font-semibold text-base sm:text-lg">Sybeez Technology Private Limited • Jul 2025 – Present</p>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">Developing cutting-edge front-end solutions for ERP, Finance, and HRM modules using React.js and modern web technologies.</p>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-purple-400/50 hover:scale-105 transform transition-all hover:shadow-xl hover:shadow-purple-500/20 relative ml-8 sm:ml-12">
                  <div className="absolute -left-10 sm:-left-14 top-6 sm:top-8 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full border-4 border-gray-900"></div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-3">Machine Learning Intern</h4>
                  <p className="text-purple-400 mb-4 font-semibold text-base sm:text-lg">Litz Tech Pvt Ltd • Dec 2023 – Feb 2024</p>
                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">Optimized ML workflows, reducing manual effort by 40% and improved model delivery to 50+ users.</p>
                </div>
              </div>
            </div>
            <div className={`space-y-8 transition-all duration-1000 ${visibleSections.has('experience')
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '300ms' }}>
              <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-purple-400 flex items-center">
                <div className="w-2 h-6 sm:h-8 bg-gradient-to-b from-purple-400 to-pink-500 rounded-full mr-4"></div>
                Achievements
              </h3>
              <div className="space-y-6">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 hover:scale-105 transform transition-all duration-700 hover:shadow-xl ${achievement.glow} ${visibleSections.has('experience')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-20'
                      }`}
                    style={{ transitionDelay: `${500 + index * 150}ms` }}
                  >
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="flex-shrink-0">
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{achievement.title}</h4>
                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-4">{achievement.description}</p>

                        {/* MODA Taiwan Award Image - Auto animate in and out */}
                        {index === 0 && achievement.Image && (
                          <div className="mt-4">
                            <img
                              src={`/${achievement.Image}`}
                              alt="MODA Taiwan Award"
                              className="w-full h-auto max-w-xs mx-auto object-cover rounded-lg border border-white/20 animate-pulse hover:animate-none hover:scale-105 transition-transform duration-500 cursor-pointer"
                              loading="lazy"
                              onClick={() => {
                                // Optional: Add click to enlarge functionality
                                const img = new Image();
                                img.src = `/${achievement.Image}`;
                                img.className = 'fixed inset-0 m-auto max-w-90vw max-h-90vh z-50 cursor-zoom-out';
                                img.onclick = () => document.body.removeChild(img);
                                document.body.appendChild(img);
                              }}
                            />
                            <div className="text-center mt-2 text-xs text-cyan-400 animate-pulse">
                              Idea Award from Government of Taiwan MODA
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="py-16 sm:py-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${visibleSections.has('projects')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
            }`}>
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <a
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gray-800/50 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 hover:bg-gray-800/70 hover:scale-105 transform transition-all duration-700 hover:shadow-xl hover:shadow-blue-500/20 block ${visibleSections.has('projects')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-20'
                  }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="p-6 sm:p-8">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${project.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {project.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
                    {project.description}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-xs sm:text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-gray-700/80 border border-white/10 text-gray-300 rounded-full text-xs sm:text-sm hover:border-cyan-400/50 hover:text-cyan-400 hover:scale-105 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">Key Features</h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-gray-300 text-xs sm:text-sm flex items-center group-hover:text-white transition-colors">
                          <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 group-hover:scale-125 transition-transform flex-shrink-0"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* External Link Indicator */}
                  <div className="flex items-center justify-end mt-6 pt-6 border-t border-white/10">
                    <span className="text-cyan-400 text-sm font-medium mr-2">View Project</span>
                    <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section with working Formspree integration */}
      <section ref={contactRef} id="contact" className="py-16 sm:py-20 px-4 sm:px-6 bg-gray-800/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent transition-all duration-1000 ${visibleSections.has('contact')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-20'
            }`}>
            Let's Connect
          </h2>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left side - Contact Info */}
            <div className={`space-y-8 transition-all duration-1000 ${visibleSections.has('contact')
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-20'
              }`}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Contact Info</h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-xl flex items-center justify-center border border-white/10 hover:border-cyan-400/50 hover:scale-110 transition-all">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-400 mb-1 uppercase tracking-wider">Email</h4>
                    <a href="mailto:esvanth7@gmail.com" className="text-lg sm:text-xl font-medium text-white hover:text-cyan-400 transition-colors">
                      esvanth7@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-xl flex items-center justify-center border border-white/10 hover:border-purple-400/50 hover:scale-110 transition-all">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-400 mb-1 uppercase tracking-wider">Phone</h4>
                    <a href="tel:+916369051038" className="text-lg sm:text-xl font-medium text-white hover:text-purple-400 transition-colors">
                      +91 63690 51038
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-xl flex items-center justify-center border border-white/10 hover:border-blue-400/50 hover:scale-110 transition-all">
                    <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-400 mb-1 uppercase tracking-wider">LinkedIn</h4>
                    <a
                      href="https://linkedin.com/in/esvanth-m-960553231/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg sm:text-xl font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      linkedin.com/in/esvanth-m
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-xl flex items-center justify-center border border-white/10 hover:border-gray-400/50 hover:scale-110 transition-all">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-400 mb-1 uppercase tracking-wider">GitHub</h4>
                    <a
                      href="https://github.com/esvanth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg sm:text-xl font-medium text-white hover:text-gray-300 transition-colors"
                    >
                      github.com/esvanth
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700/50 rounded-xl flex items-center justify-center border border-white/10 hover:border-yellow-400/50 hover:scale-110 transition-all">
                    {/* Custom LeetCode SVG Icon */}
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382H10.617z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-400 mb-1 uppercase tracking-wider">LeetCode</h4>
                    <a
                      href="https://leetcode.com/u/esvanth/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg sm:text-xl font-medium text-white hover:text-yellow-400 transition-colors"
                    >
                      leetcode.com/u/esvanth
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* Right side - Contact Form */}
            <div className={`bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/10 transition-all duration-1000 ${visibleSections.has('contact')
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '300ms' }}>
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">Send Message</h3>
              </div>

              {/* Updated form with proper Formspree integration */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className={`transition-all duration-500 ${visibleSections.has('contact')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: '600ms' }}>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                      Your Name
                    </label>
                    <div className="relative group">
                      <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-700/50 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-gray-700/80 transition-all text-sm sm:text-base"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className={`transition-all duration-500 ${visibleSections.has('contact')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: '700ms' }}>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-focus-within:text-cyan-400 transition-colors" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-gray-700/50 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-gray-700/80 transition-all text-sm sm:text-base"
                        placeholder=""
                      />
                    </div>
                  </div>
                </div>
                <div className={`transition-all duration-500 ${visibleSections.has('contact')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: '800ms' }}>
                  <label htmlFor="subject" className="block text-xs sm:text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-gray-700/50 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-gray-700/80 transition-all text-sm sm:text-base"
                    placeholder="Project Discussion / Job Opportunity / General Inquiry"
                  />
                </div>
                <div className={`transition-all duration-500 ${visibleSections.has('contact')
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: '900ms' }}>
                  <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 sm:py-4 bg-gray-700/50 border-2 border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-gray-700/80 transition-all resize-none text-sm sm:text-base"
                    placeholder="Tell me about your project or inquiry..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-3 py-3 sm:py-4 px-6 rounded-xl font-bold text-base sm:text-lg transition-all duration-500 ${isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-cyan-500/30'
                    } text-white ${visibleSections.has('contact')
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                    }`}
                  style={{ transitionDelay: '1000ms' }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
                {submitMessage && (
                  <div
                    className={`text-center p-4 rounded-xl transition-all border-2 text-sm sm:text-base ${submitMessage.includes('✅') || submitMessage.includes('success')
                      ? 'bg-green-500/20 text-green-300 border-green-400/50'
                      : 'bg-red-500/20 text-red-300 border-red-400/50'
                      }`}
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className={`text-center mt-16 sm:mt-20 transition-all duration-1000 ${visibleSections.has('contact')
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1200ms' }}>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto mb-4 rounded-full"></div>
            <p className="text-gray-400 text-base sm:text-lg">© 2025 Esvanth M</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Portfolio;