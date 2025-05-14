import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { Moon, Sun, Mail, Menu, X, ArrowDown, ExternalLink, Code, Database, Brain, Award, Calendar, MapPin, Globe, Download, Layers, Monitor, Cpu, Instagram, Linkedin, Twitter } from 'lucide-react';
import { debounce } from 'lodash';
import husseinImage from './img/hussein.png';
// Import images with JavaScript require to handle spaces in filenames
const ecommerceImage = require('./img/E-Commerce Platform.avif');
const ngoImage = require('./img/NGO Websites.png');
const egmImage = require('./img/Exam Grades Prediction (EGM).webp');
const portfolioImage = require('./img/Portfolio Website.png');
const smsImage = require('./img/Student Management System.jpg');
const dataAnalysisImage = require('./img/Data Analysis Dashboard.png');
const resumePdf = require('./img/hussein_waliyu_resume.pdf');

// Memoized section components for better performance
const SectionHeader = memo(({ title, subtitle }) => (
  <div className="mb-12 text-center">
    <span className="inline-block px-3 py-1 text-sm font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full mb-3">
      {subtitle}
    </span>
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      {title}
    </h2>
    <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4"></div>
  </div>
));

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved preference or system preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolling, setIsScrolling] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [typedText, setTypedText] = useState('');
  const [currentProjectFilter, setCurrentProjectFilter] = useState('all');
  const [visibleSections, setVisibleSections] = useState({});
  const [skillsProgress, setSkillsProgress] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = {
    about: useRef(null),
    skills: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    education: useRef(null),
    testimonials: useRef(null),
    contact: useRef(null)
  };
  
  // Store intersection observer references
  const observersRef = useRef({});

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Optimized hero animation that's less resource intensive for mobile
  useEffect(() => {
    if (isMobile) {
      // Simplified animation for mobile - just static gradient background
      return;
    }

    // Only create canvas animation for desktop
    const canvas = document.createElement('canvas');
    canvas.id = 'tech-animation';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.appendChild(canvas);
    }

    // Initialize canvas with lower-intensity parameters for better performance
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    let mouseX = 0;
    let mouseY = 0;
    
    // Reduced number of nodes and connections for better performance
    let nodes = [];
    let connections = [];
    let dataPackets = [];
    
    // Track mouse movement for interactive effect with throttling
    const handleMouseMove = debounce((e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, 50); // Throttle to improve performance
    
    document.addEventListener('mousemove', handleMouseMove);

    // Node class - represents circuit board nodes
    class Node {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2; // Smaller nodes for better performance
        this.baseRadius = this.radius;
        this.connections = [];
        this.active = Math.random() > 0.7;
        this.activationTimer = 0;
        this.activationDuration = Math.random() * 100 + 50;
        this.pulseDirection = 1;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulseSize = 0;
        
        // Colors from our theme
        const colorOptions = [
          [16, 185, 129],  // emerald
          [79, 209, 197],  // teal
          [168, 85, 247],  // purple
          [45, 212, 191]   // light teal
        ];
        
        this.colorIndex = Math.floor(Math.random() * colorOptions.length);
        this.color = colorOptions[this.colorIndex];
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        // Inactive nodes are dimmer
        if (this.active) {
          ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.7)`;
          ctx.shadowBlur = 10; // Reduced for performance
          ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.7)`;
        } else {
          ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.2)`;
          ctx.shadowBlur = 0; // No shadow for inactive nodes
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Draw pulse effect for active nodes
        if (this.active && this.pulseSize > 0) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.pulseSize, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${1 - this.pulseSize/20})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
      
      update() {
        // Handle node activation state
        if (this.active) {
          this.activationTimer++;
          
          // Pulse effect
          this.pulseSize += this.pulseSpeed * this.pulseDirection;
          if (this.pulseSize > 20) { // Smaller pulse for performance
            this.pulseSize = 20;
            this.pulseDirection = -1;
          } else if (this.pulseSize <= 0) {
            this.pulseSize = 0;
            this.pulseDirection = 1;
          }
          
          // Occasional deactivation
          if (this.activationTimer > this.activationDuration && Math.random() > 0.99) {
            this.active = false;
            this.pulseSize = 0;
          }
        } else if (Math.random() > 0.995) { // Random activation
          this.active = true;
          this.activationTimer = 0;
          this.activationDuration = Math.random() * 100 + 50;
        }
        
        // Handle mouse interaction
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) { // Reduced detection radius
          // Activate node when mouse is near
          this.active = true;
          this.activationTimer = 0;
          
          // Slightly increase size when mouse is near
          this.radius = this.baseRadius + (80 - distance) / 20;
        } else {
          // Reset to base size
          this.radius = this.baseRadius;
        }
      }
    }

    // Connection class - represents circuit paths
    class Connection {
      constructor(nodeA, nodeB) {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.width = Math.random() * 1 + 0.5; // Thinner lines
        this.active = false;
        this.trafficDirection = Math.random() > 0.5 ? 1 : -1;
        
        // Calculate path properties
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        this.length = Math.sqrt(dx * dx + dy * dy);
        
        nodeA.connections.push(this);
        nodeB.connections.push(this);
        
        if (Math.random() > 0.7) {
          this.active = true;
          
          // Less initial data packets
          if (Math.random() > 0.8) {
            this.createDataPacket();
          }
        }
      }
      
      draw() {
        if (!ctx) return;
        
        const colorA = this.nodeA.color;
        const colorB = this.nodeB.color;
        
        // Draw connection line with gradient
        const gradient = ctx.createLinearGradient(this.nodeA.x, this.nodeA.y, this.nodeB.x, this.nodeB.y);
        
        if (this.active) {
          gradient.addColorStop(0, `rgba(${colorA[0]}, ${colorA[1]}, ${colorA[2]}, 0.7)`);
          gradient.addColorStop(1, `rgba(${colorB[0]}, ${colorB[1]}, ${colorB[2]}, 0.7)`);
          ctx.shadowBlur = 0; // No shadow for better performance
        } else {
          gradient.addColorStop(0, `rgba(${colorA[0]}, ${colorA[1]}, ${colorA[2]}, 0.15)`);
          gradient.addColorStop(1, `rgba(${colorB[0]}, ${colorB[1]}, ${colorB[2]}, 0.15)`);
          ctx.shadowBlur = 0;
        }
        
        ctx.beginPath();
        ctx.moveTo(this.nodeA.x, this.nodeA.y);
        ctx.lineTo(this.nodeB.x, this.nodeB.y);
        ctx.lineWidth = this.width;
        ctx.strokeStyle = gradient;
        ctx.stroke();
      }
      
      update() {
        // Connections become active when both connected nodes are active
        this.active = this.nodeA.active && this.nodeB.active;
        
        // Occasionally create data packets along active connections
        if (this.active && Math.random() > 0.995) { // Reduced chance
          this.createDataPacket();
        }
      }
      
      createDataPacket() {
        // Determine starting and ending nodes based on traffic direction
        const startNode = this.trafficDirection === 1 ? this.nodeA : this.nodeB;
        const endNode = this.trafficDirection === 1 ? this.nodeB : this.nodeA;
        
        // Create data packet
        dataPackets.push(new DataPacket(startNode, endNode, startNode.color));
      }
    }

    // DataPacket class - represents data moving along connections
    class DataPacket {
      constructor(startNode, endNode, color) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.color = color;
        this.progress = 0;
        this.speed = Math.random() * 0.01 + 0.005;
        this.size = Math.random() * 2 + 1; // Smaller data packets
        this.completed = false;
      }
      
      draw() {
        if (!ctx) return;
        
        // Calculate current position along the path
        const x = this.startNode.x + (this.endNode.x - this.startNode.x) * this.progress;
        const y = this.startNode.y + (this.endNode.y - this.startNode.y) * this.progress;
        
        // Draw data packet
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.9)`;
        ctx.shadowBlur = 5; // Reduced blur
        ctx.shadowColor = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.7)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      
      update() {
        // Move along the path
        this.progress += this.speed;
        
        // Mark as completed when it reaches the end
        if (this.progress >= 1) {
          this.completed = true;
          this.endNode.active = true; // Activate the destination node
          this.endNode.activationTimer = 0;
          
          // Reduced chance to continue to another connection
          if (Math.random() > 0.7) {
            const availableConnections = this.endNode.connections.filter(
              conn => conn.nodeA === this.endNode && conn.nodeB !== this.startNode ||
                     conn.nodeB === this.endNode && conn.nodeA !== this.startNode
            );
            
            if (availableConnections.length > 0) {
              const nextConn = availableConnections[Math.floor(Math.random() * availableConnections.length)];
              const nextNode = nextConn.nodeA === this.endNode ? nextConn.nodeB : nextConn.nodeA;
              
              // Create new data packet for the next leg
              dataPackets.push(new DataPacket(this.endNode, nextNode, this.endNode.color));
            }
          }
        }
      }
    }

    // Create grid of nodes - with reduced density for better performance
    function createCircuitGrid() {
      nodes = [];
      connections = [];
      dataPackets = [];
      
      // Create nodes in a grid pattern with some randomness - fewer nodes on mobile
      const gridSpacingX = Math.min(canvas.width / 12, 150);
      const gridSpacingY = Math.min(canvas.height / 12, 150);
      
      const cols = Math.ceil(canvas.width / gridSpacingX) + 1;
      const rows = Math.ceil(canvas.height / gridSpacingY) + 1;
      
      // Create nodes at grid points (with some randomness)
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add some randomness to position
          const offsetX = Math.random() * gridSpacingX * 0.5;
          const offsetY = Math.random() * gridSpacingY * 0.5;
          
          // Create node at grid position with offset
          const x = i * gridSpacingX - gridSpacingX/2 + offsetX;
          const y = j * gridSpacingY - gridSpacingY/2 + offsetY;
          
          // Skip more grid points randomly to create a more sparse look for performance
          if (Math.random() > 0.4) {
            nodes.push(new Node(x, y));
          }
        }
      }
      
      // Create connections between nearby nodes - with fewer connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];
          
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Connect nodes that are close but not too close - with stricter distance check
          if (distance < gridSpacingX * 1.2 && distance > 20) {
            // Add randomness to connection creation - create fewer connections
            if (Math.random() > 0.6) {
              connections.push(new Connection(nodeA, nodeB));
            }
          }
        }
      }
    }
    
    // Resize canvas and recreate circuit - with debounce for performance
    const resizeCanvas = debounce(() => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createCircuitGrid();
      }
    }, 250);
    
    window.addEventListener('resize', resizeCanvas);
    
    // Initial setup
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createCircuitGrid();
    
    // Animation loop with RAF management for better performance
    function animate() {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Optional: Add slight trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections first (behind nodes)
        for (let i = 0; i < connections.length; i++) {
          connections[i].update();
          connections[i].draw();
        }
        
        // Update and draw nodes
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].update();
          nodes[i].draw();
        }
        
        // Update and draw data packets
        for (let i = dataPackets.length - 1; i >= 0; i--) {
          dataPackets[i].update();
          
          // Remove completed packets
          if (dataPackets[i].completed) {
            dataPackets.splice(i, 1);
          } else {
            dataPackets[i].draw();
          }
        }
        
        animationFrameId = requestAnimationFrame(animate);
      }
    }
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (heroSection && canvas && heroSection.contains(canvas)) {
        heroSection.removeChild(canvas);
      }
    };
  }, [isMobile]);

  // Initial page load animation
  useEffect(() => {
    // Simulating loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30); // Faster loading animation
    
    return () => clearInterval(interval);
  }, []);

  // Trigger animations for skills section when visible
  useEffect(() => {
    if (visibleSections.skills && !skillsProgress) {
      setSkillsProgress(true);
    }
  }, [visibleSections.skills, skillsProgress]);

  // Typing effect for hero section
  useEffect(() => {
    const phrases = ["Full Stack Developer", "Computer Science Student", "Machine Learning Enthusiast", "UI/UX Designer"];
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Faster typing
    
    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        setTypedText(currentPhrase.substring(0, currentCharIndex - 1));
        currentCharIndex--;
        typingSpeed = 50; // Faster deleting
      } else {
        setTypedText(currentPhrase.substring(0, currentCharIndex + 1));
        currentCharIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && currentCharIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
      } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    const typingTimeout = setTimeout(type, 500); // Start sooner
    return () => clearTimeout(typingTimeout);
  }, []);

  // Using Intersection Observer for section visibility - much more performant than scroll events
  useEffect(() => {
    // Clean up previous observers
    Object.values(observersRef.current).forEach(observer => {
      if (observer) observer.disconnect();
    });
    
    // Options for the observer
    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.2 // 20% visibility triggers callback
    };
    
    // Function to handle intersection
    const handleIntersection = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Update active section for navigation
          if (sectionId) {
            setActiveSection(sectionId);
          }
          
          // Update visible sections for animations
          const sectionName = sectionId === 'hero' ? 'hero' : sectionId;
          setVisibleSections(prev => ({
            ...prev,
            [sectionName]: true
          }));
        }
      });
    };
    
    // Create new observer
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    // Observe each section
    const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'testimonials', 'contact'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.observe(element);
      }
    });
    
    // Store observer reference
    observersRef.current.sections = observer;
    
    // Add minimal scroll listener just for header transparency
    const handleScroll = debounce(() => {
      setIsScrolling(window.scrollY > 50);
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Optimized menu handling functions
  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
    // When opening menu, prevent body scrolling
    if (!menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);
  
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use native smooth scrolling with offset for header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    closeMenu();
  }, [closeMenu]);

  // Form handlers with optimization
  const handleInputChange = useCallback((e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here
    console.log("Form submitted:", formData);
    alert("Message sent! (This is a demo - no actual message is sent)");
    setFormData({ name: '', email: '', message: '' });
  }, [formData]);

  // Filter projects by category - memoized
  const filterProjects = useCallback((category) => {
    setCurrentProjectFilter(category);
  }, []);

  // Resume download handler - memoized
  const handleResumeDownload = useCallback(() => {
    window.open(resumePdf, '_blank');
  }, []);

  // Section animation class based on visibility
  const getSectionAnimationClass = useCallback((section) => {
    return visibleSections[section] 
      ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out' 
      : 'opacity-0 translate-y-10 transition-all duration-700 ease-out';
  }, [visibleSections]);

  // Navigation items
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  // Return JSX with optimized structure
  return (
    <div className={`relative min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      {/* Page Preloader - Smoother and faster transition */}
      {loadingProgress < 100 && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-purple-600">
            Hussein Waliyu
          </div>
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-purple-600 rounded-full transition-all duration-300" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            Loading... {loadingProgress}%
          </div>
        </div>
      )}
      
      {/* Optimized Header/Navigation - improved mobile handling */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${isScrolling ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md' : 'bg-transparent'} transition-all duration-300`}>
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tight">
            <span className="text-emerald-600 dark:text-emerald-400">Hussein</span> Waliyu
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg ${activeSection === item.id ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'} transition-all duration-200 relative`}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle - enhanced accessibility */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 relative group"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="overflow-hidden w-5 h-5">
                <Sun 
                  size={20} 
                  className={`absolute transition-all duration-300 ${darkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'}`}
                />
                <Moon 
                  size={20} 
                  className={`absolute transition-all duration-300 ${darkMode ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`}
                />
              </div>
            </button>

            {/* Mobile Menu Button - improved touch target */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Improved animation and accessibility */}
        <div 
          className={`fixed inset-0 z-40 bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
          aria-hidden={!menuOpen}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex flex-col h-full pt-20 p-6">
            <div className="mb-8 flex justify-between items-center">
              <div className="text-2xl font-bold tracking-tight">
                <span className="text-emerald-600 dark:text-emerald-400">Hussein</span> Waliyu
              </div>
              <button 
                onClick={closeMenu}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <button 
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-6 py-4 rounded-xl ${activeSection === item.id ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 font-medium' : 'text-gray-700 dark:text-gray-300'} transition-all duration-300 transform hover:translate-x-2`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  <span className="flex items-center">
                    {activeSection === item.id && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 mr-3"></span>
                    )}
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
            
            <div className="mt-auto">
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <div className="flex justify-center space-x-6 mb-6">
                  <a href="https://www.linkedin.com/in/hussein-waliyu-a10713254/" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-all duration-300 transform hover:scale-125" aria-label="LinkedIn Profile">
                    <Linkedin size={22} />
                  </a>
                  <a href="https://x.com/starsschola?s=21&t=MlV5ZvVz2XQAh0jAaJIVAQ" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-all duration-300 transform hover:scale-125" aria-label="Twitter Profile">
                    <Twitter size={22} />
                  </a>
                  <a href="https://www.instagram.com/hussein_waliyu?igsh=YmVoZ3l4NWd5Ym54&utm_source=qr" className="text-gray-600 hover:text-emerald-500 dark:text-gray-400 dark:hover:text-emerald-400 transition-all duration-300 transform hover:scale-125" aria-label="Instagram Profile">
                    <Instagram size={22} />
                  </a>
                </div>
                
                <button 
                  onClick={() => {
                    scrollToSection('contact');
                    closeMenu();
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 flex items-center justify-center"
                >
                  Contact Me <Mail className="ml-2" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {/* Hero Section - Optimized for mobile */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated Background - simplified for mobile */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-emerald-900 to-purple-900">
              {/* Canvas for particle network will be added via JS for desktop only */}
              
              {/* Animated gradient circles for depth - fewer and more optimized for mobile */}
              <div className="absolute w-64 md:w-96 h-64 md:h-96 rounded-full bg-emerald-500/10 -top-10 -left-16 animate-pulse" style={{animationDuration: '8s'}}></div>
              <div className="absolute w-64 md:w-96 h-64 md:h-96 rounded-full bg-teal-500/10 top-1/4 right-1/3 animate-pulse" style={{animationDuration: '12s'}}></div>
              <div className="absolute w-56 md:w-80 h-56 md:h-80 rounded-full bg-purple-500/10 bottom-1/4 left-1/4 animate-pulse" style={{animationDuration: '10s'}}></div>
              <div className="absolute w-48 md:w-64 h-48 md:h-64 rounded-full bg-emerald-400/10 bottom-10 right-10 animate-pulse" style={{animationDuration: '7s'}}></div>
            </div>
            
            {/* Parallax Overlay - optimized for better performance */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
                backgroundSize: isMobile ? "20px 20px" : "30px 30px", // Smaller grid on mobile
                transform: `translateY(${isScrolling ? window.scrollY * 0.1 : 0}px)` // Less intense parallax
              }}
            ></div>
          </div>
          
          <div className="relative z-10 text-center text-white max-w-4xl px-4 sm:px-6 py-16 md:py-0">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-300">
              Hussein Waliyu
            </h1>
            <div className="h-10 md:h-14 mb-6">
              <p className="text-lg sm:text-xl md:text-3xl font-light">
                <span className="text-emerald-300">I am a </span>
                <span className="text-white inline-block min-w-32 md:min-w-64 border-r-4 border-emerald-400 animate-pulse">{typedText}</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Contact Me <Mail className="ml-2" size={16} />
              </button>
              <a 
                href="https://github.com/Waliyu23" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 flex items-center shadow-lg hover:shadow-gray-700/50 transform hover:-translate-y-1 text-sm sm:text-base"
              >
                GitHub <ExternalLink className="ml-2" size={16} />
              </a>
              <button
                onClick={handleResumeDownload}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-emerald-900 rounded-full transition-all duration-300 flex items-center shadow-lg transform hover:-translate-y-1 text-sm sm:text-base"
              >
                Download CV <Download className="ml-2" size={16} />
              </button>
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-12">
              <a href="https://www.linkedin.com/in/hussein-waliyu-a10713254/" className="text-white hover:text-emerald-300 transition-all duration-300 transform hover:scale-125" aria-label="LinkedIn Profile">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/starsschola?s=21&t=MlV5ZvVz2XQAh0jAaJIVAQ" className="text-white hover:text-emerald-300 transition-all duration-300 transform hover:scale-125" aria-label="Twitter Profile">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/hussein_waliyu?igsh=YmVoZ3l4NWd5Ym54&utm_source=qr" className="text-white hover:text-emerald-300 transition-all duration-300 transform hover:scale-125" aria-label="Instagram Profile">
                <Instagram size={20} />
              </a>
            </div>
            
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <button 
                onClick={() => scrollToSection('about')}
                aria-label="Scroll down to About section"
                className="text-white hover:text-emerald-300 transition-colors duration-300"
              >
                <ArrowDown size={30} />
              </button>
            </div>
          </div>
        </section>

        {/* About Section - Improved mobile layout */}
        <section 
          id="about" 
          ref={sectionRefs.about}
          className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
        >
          <div className={`container mx-auto max-w-4xl ${getSectionAnimationClass('about')}`}>
            <SectionHeader title="Get to Know Me Better" subtitle="About Me" />
            
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 relative">
              <div className="w-full md:w-1/3 flex justify-center">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -left-4 w-16 md:w-24 h-16 md:h-24 border-t-4 border-l-4 border-emerald-500 z-0"></div>
                  <div className="absolute -bottom-4 -right-4 w-16 md:w-24 h-16 md:h-24 border-b-4 border-r-4 border-emerald-500 z-0"></div>
                  
                  {/* Profile image - native lazy loading */}
                  <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl z-10 relative">
                    <img
                      src={husseinImage}
                      alt="Hussein Waliyu"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-emerald-600 dark:text-emerald-400">
                  Dedicated Computer Science Undergraduate
                </h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                  I'm a passionate computer science student with a strong technical foundation in full-stack development, machine learning, and web technologies. I have experience developing e-commerce solutions, NGO websites, and implementing machine learning algorithms for academic research.
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  My proven leadership capabilities and commitment to excellence have been demonstrated through academic achievements and organizational roles at Albukhary International University.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <MapPin size={18} className="mr-2 text-emerald-500" />
                    <span>Alor Setar, Kedah, Malaysia</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Mail size={18} className="mr-2 text-emerald-500" />
                    <span>husseinwaliyu23@gmail.com</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Calendar size={18} className="mr-2 text-emerald-500" />
                    <span>Expected Graduation: Nov 2025</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Globe size={18} className="mr-2 text-emerald-500" />
                    <span>English</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center px-6 py-3 mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1"
                >
                  Get In Touch <ArrowDown className="ml-2 transform rotate-90" size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section - Improved mobile performance */}
        <section 
          id="skills" 
          ref={sectionRefs.skills}
          className="py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-900"
        >
          <div className={`container mx-auto max-w-5xl ${getSectionAnimationClass('skills')}`}>
            <SectionHeader title="Technical Skills" subtitle="My Expertise" />
            
            {/* Skills Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-12 md:mb-16">
              {/* Programming Languages */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-4">
                    <Code size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Programming Languages</h3>
                </div>
                
                {/* Skill Bars */}
                <div className="space-y-4 md:space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">JavaScript</span>
                      <span className="text-gray-700 dark:text-gray-300">90%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[90%]' : 'w-0'}`}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Python</span>
                      <span className="text-gray-700 dark:text-gray-300">85%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[85%]' : 'w-0'}`}
                        style={{ transitionDelay: '100ms' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">HTML/CSS</span>
                      <span className="text-gray-700 dark:text-gray-300">95%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[95%]' : 'w-0'}`}
                        style={{ transitionDelay: '200ms' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">SQL</span>
                      <span className="text-gray-700 dark:text-gray-300">80%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[80%]' : 'w-0'}`}
                        style={{ transitionDelay: '300ms' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Java</span>
                      <span className="text-gray-700 dark:text-gray-300">75%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[75%]' : 'w-0'}`}
                        style={{ transitionDelay: '400ms' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Web Technologies */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-4">
                    <Globe size={28} className="text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Web Technologies</h3>
                </div>
                
                {/* Skill Bars */}
                <div className="space-y-4 md:space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">React</span>
                      <span className="text-gray-700 dark:text-gray-300">85%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[85%]' : 'w-0'}`}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">Node.js</span>
                      <span className="text-gray-700 dark:text-gray-300">80%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[80%]' : 'w-0'}`}
                        style={{ transitionDelay: '100ms' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">WordPress</span>
                      <span className="text-gray-700 dark:text-gray-300">90%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[90%]' : 'w-0'}`}
                        style={{ transitionDelay: '200ms' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">SEO</span>
                      <span className="text-gray-700 dark:text-gray-300">75%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[75%]' : 'w-0'}`}
                        style={{ transitionDelay: '300ms' }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">UI/UX Design</span>
                      <span className="text-gray-700 dark:text-gray-300">70%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-1000 ease-out ${skillsProgress ? 'w-[70%]' : 'w-0'}`}
                        style={{ transitionDelay: '400ms' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tools & Technologies - Improved grid layout for mobile */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <div className="flex flex-col items-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <Database size={32} className="text-emerald-500 mb-3" />
                <h3 className="text-base md:text-lg font-semibold text-center mb-1">Databases</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm text-center">MySQL, MongoDB</p>
              </div>
              
              <div className="flex flex-col items-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <Brain size={32} className="text-emerald-500 mb-3" />
                <h3 className="text-base md:text-lg font-semibold text-center mb-1">Machine Learning</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm text-center">Predictive Modeling</p>
              </div>
              
              <div className="flex flex-col items-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <Layers size={32} className="text-emerald-500 mb-3" />
                <h3 className="text-base md:text-lg font-semibold text-center mb-1">DevOps</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm text-center">Git, Docker, AWS</p>
              </div>
              
              <div className="flex flex-col items-center p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <Monitor size={32} className="text-emerald-500 mb-3" />
                <h3 className="text-base md:text-lg font-semibold text-center mb-1">UI Frameworks</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm text-center">Tailwind, Bootstrap</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section - Optimized timeline for mobile */}
        <section 
          id="experience" 
          ref={sectionRefs.experience}
          className="py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800"
        >
          <div className={`container mx-auto max-w-4xl ${getSectionAnimationClass('experience')}`}>
            <SectionHeader title="Professional Experience" subtitle="My Journey" />
            
            {/* Timeline - improved mobile display */}
            <div className="relative">
              {/* Line - hidden on mobile, shown on desktop */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-emerald-500 to-teal-500 hidden md:block"></div>
              
              {/* Experience Items */}
              <div className="space-y-8 md:space-y-12">
                {/* Full Stack Development Intern */}
                <div className="relative">
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-600 border-4 border-white dark:border-gray-800 z-10"></div>
                  
                  <div className="md:w-1/2 md:pr-8 md:ml-auto">
                    <div className="bg-white dark:bg-gray-700 p-5 md:p-6 rounded-lg shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-semibold">Full Stack Development Intern</h3>
                        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded">6 months</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Business Web Solutions, New Delhi, India</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        <li>Collaborated with senior developers on web applications</li>
                        <li>Implemented responsive UI designs and backend integrations</li>
                        <li>Participated in all stages of software development lifecycle</li>
                        <li>Gained experience in agile development methodologies</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* WordPress Developer */}
                <div className="relative">
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-600 border-4 border-white dark:border-gray-800 z-10"></div>
                  
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-white dark:bg-gray-700 p-5 md:p-6 rounded-lg shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-semibold">WordPress Developer</h3>
                        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded">3 years</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">Self-employed</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        <li>Designed and developed responsive websites for clients</li>
                        <li>Utilized Elementor to create custom layouts</li>
                        <li>Implemented SEO best practices for improved rankings</li>
                        <li>Provided ongoing maintenance and technical support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Leadership - Country Head */}
                <div className="relative">
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-600 border-4 border-white dark:border-gray-800 z-10"></div>
                  
                  <div className="md:w-1/2 md:pr-8 md:ml-auto">
                    <div className="bg-white dark:bg-gray-700 p-5 md:p-6 rounded-lg shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-semibold">Country Head Representative</h3>
                        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded">2024-2025</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">African Student Association (AFSA)</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        <li>Represented students from my country at the university</li>
                        <li>Organized cultural events and academic initiatives</li>
                        <li>Liaised between university administration and students</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Leadership - Deputy Media */}
                <div className="relative">
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-600 border-4 border-white dark:border-gray-800 z-10"></div>
                  
                  <div className="md:w-1/2 md:pl-8">
                    <div className="bg-white dark:bg-gray-700 p-5 md:p-6 rounded-lg shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <h3 className="text-lg md:text-xl font-semibold">1st Deputy of Media and Communication</h3>
                        <span className="text-sm bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded">2023-2024</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">African Student Association (AFSA)</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        <li>Managed association's social media presence</li>
                        <li>Created promotional materials for events</li>
                        <li>Coordinated a team of content creators</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section - Improved filtering and responsiveness */}
        <section 
          id="projects" 
          ref={sectionRefs.projects}
          className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        >
          <div className={`container mx-auto max-w-5xl ${getSectionAnimationClass('projects')}`}>
            <SectionHeader title="Featured Projects" subtitle="My Work" />
            
            {/* Project Filter Buttons - Mobile optimized */}
            <div className="inline-flex flex-wrap justify-center gap-2 p-1 rounded-xl bg-gray-100 dark:bg-gray-700/50 mb-8 md:mb-10">
              <button 
                onClick={() => filterProjects('all')} 
                className={`px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${
                  currentProjectFilter === 'all' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50'
                }`}
              >
                All Projects
              </button>
              <button 
                onClick={() => filterProjects('web')} 
                className={`px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${
                  currentProjectFilter === 'web' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50'
                }`}
              >
                Web Development
              </button>
              <button 
                onClick={() => filterProjects('ml')} 
                className={`px-4 md:px-6 py-2 rounded-lg transition-all duration-300 ${
                  currentProjectFilter === 'ml' 
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/50'
                }`}
              >
                Machine Learning
              </button>
            </div>
            
            {/* Projects Grid - now with filtering and lazy loading */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* E-Commerce Platform */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ${
                  currentProjectFilter !== 'all' && currentProjectFilter !== 'web' ? 'hidden' : ''
                }`}
              >
                {/* E-Commerce Platform */}
                <div className="relative group">
                  <div className="h-48 bg-gradient-to-br from-emerald-400 to-purple-500 overflow-hidden">
                    <img
                      src={ecommerceImage}
                      alt="E-Commerce Platform"
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-75 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-xl font-bold mb-2">E-Commerce Project</h4>
                    <p className="text-gray-200 text-sm">Full-stack shop with payment gateway</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">E-Commerce Platform</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Full-stack e-commerce solution with secure payment integration, user authentication, and product management.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">React</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Node.js</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">MongoDB</span>
                    </div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                      aria-label="View E-Commerce Platform project"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Further project cards continue with similar optimizations - using LazyLoadImage and improved responsiveness */}
              {/* NGO Websites */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ${
                  currentProjectFilter !== 'all' && currentProjectFilter !== 'web' ? 'hidden' : ''
                }`}
              >
                <div className="relative group">
                  <div className="h-48 bg-gradient-to-br from-teal-400 to-emerald-500 overflow-hidden">
                    <img
                      src={ngoImage}
                      alt="NGO Websites"
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-75 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-xl font-bold mb-2">NGO Website Project</h4>
                    <p className="text-gray-200 text-sm">Custom WordPress development</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">NGO Websites</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Accessible websites for non-profit organizations with donation systems and event management features.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">WordPress</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Elementor</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">PHP</span>
                    </div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                      aria-label="View NGO Websites project"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* ML Research Project */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ${
                  currentProjectFilter !== 'all' && currentProjectFilter !== 'ml' ? 'hidden' : ''
                }`}
              >
                <div className="relative group">
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-emerald-500 overflow-hidden">
                    <img
                      src={egmImage}
                      alt="ML Research Project"
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-75 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-xl font-bold mb-2">ML Research Project</h4>
                    <p className="text-gray-200 text-sm">Student performance prediction</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Exam Grades Prediction (EGM)</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Machine learning algorithms to predict student performance and analyze correlations between student attributes.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Python</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">ML</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Data</span>
                    </div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                      aria-label="View Exam Grades Prediction project"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Portfolio Website */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ${
                  currentProjectFilter !== 'all' && currentProjectFilter !== 'web' ? 'hidden' : ''
                }`}
              >
                <div className="relative group">
                  <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 overflow-hidden">
                    <img
                      src={portfolioImage}
                      alt="Portfolio Website"
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-75 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-xl font-bold mb-2">Personal Portfolio</h4>
                    <p className="text-gray-200 text-sm">React-based portfolio site</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Portfolio Website</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Modern React-based portfolio with animations, dark mode, and interactive elements to showcase skills and projects.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">React</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Tailwind</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">UI/UX</span>
                    </div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                      aria-label="View Portfolio Website project"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Student Management System */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ${
                  currentProjectFilter !== 'all' && currentProjectFilter !== 'web' ? 'hidden' : ''
                }`}
              >
                <div className="relative group">
                  <div className="h-48 bg-gradient-to-br from-teal-500 to-emerald-600 overflow-hidden">
                    <img
                      src={smsImage}
                      alt="Student Management System"
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-75 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-xl font-bold mb-2">Management System</h4>
                    <p className="text-gray-200 text-sm">Full-stack academic portal</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Student Management System</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Complete academic management solution with student registration, course enrollment, and grade tracking features.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Java</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Spring</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">MySQL</span>
                    </div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                      aria-label="View Student Management System project"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Data Analysis Dashboard */}
              <div 
                className={`bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-500 ${
                  currentProjectFilter !== 'all' && currentProjectFilter !== 'ml' ? 'hidden' : ''
                }`}
              >
                <div className="relative group">
                  <div className="h-48 bg-gradient-to-br from-purple-500 to-emerald-600 overflow-hidden">
                    <img
                      src={dataAnalysisImage}
                      alt="Data Analysis Dashboard"
                      loading="lazy"
                      className="w-full h-full object-cover mix-blend-overlay opacity-75 transition-all duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-white text-xl font-bold mb-2">Analytics Dashboard</h4>
                    <p className="text-gray-200 text-sm">Interactive data visualization</p>
                  </div>
                </div>
                
                <div className="p-5 md:p-6">
                  <div className="mb-4">
                    <h3 className="text-lg md:text-xl font-bold mb-2">Data Analysis Dashboard</h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">Interactive data visualization dashboard with real-time analytics, filtering capabilities, and comprehensive reports.</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">Python</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">D3.js</span>
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-2 py-1 rounded-full">React</span>
                    </div>
                    
                    <button 
                      className="w-8 h-8 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 rounded-full hover:bg-emerald-200 dark:hover:bg-emerald-800/50 transition-colors"
                      aria-label="View Data Analysis Dashboard project"
                    >
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* View All Projects Button */}
            <div className="mt-10 md:mt-12 text-center">
              <button className="px-6 md:px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1 flex items-center mx-auto">
                View All Projects <ExternalLink className="ml-2" size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Education Section - Improved layout and responsiveness */}
        <section 
          id="education" 
          ref={sectionRefs.education}
          className="py-16 md:py-20 px-4 sm:px-6 bg-gray-50 dark:bg-gray-800"
        >
          <div className={`container mx-auto max-w-4xl ${getSectionAnimationClass('education')}`}>
            <SectionHeader title="Academic Background" subtitle="My Education" />
            
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-emerald-200 to-teal-200 dark:from-emerald-900/30 dark:to-teal-900/30 transform -translate-y-1/2 z-0"></div>
              
              <div className="bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-xl p-5 md:p-8 relative z-10 border-2 border-emerald-100 dark:border-emerald-900/30">
                <div className="flex flex-col md:flex-row">
                  <div className="mb-6 md:mb-0 md:mr-8 flex justify-center md:block">
                    <div className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-500">
                      <Award size={40} className="text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 text-emerald-600 dark:text-emerald-400">Bachelor of Computer Science</h3>
                        <p className="text-md md:text-lg text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                          <MapPin size={16} className="mr-1 text-emerald-500" />
                          Albukhary International University, Alor Setar, Malaysia
                        </p>
                      </div>
                      
                      <div className="mt-2 md:mt-0 flex items-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-100 px-4 py-2 rounded-full text-sm font-medium">
                        <Calendar size={16} className="mr-2" /> 2021 - 2025
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                            <Award size={20} className="text-green-600 dark:text-green-400" />
                          </div>
                          <h4 className="font-bold text-lg">Achievements</h4>
                        </div>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                            <span>CGPA: <strong className="text-green-600 dark:text-green-400">*.**/4.0</strong></span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                            <span>Dean's List (5 semesters)</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2"></span>
                            <span>Academic Excellence Scholarship</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                        <div className="flex items-center mb-3">
                          <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 rounded-lg mr-3">
                            <Cpu size={20} className="text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <h4 className="font-bold text-lg">Key Projects</h4>
                        </div>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm md:text-base">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-2"></span>
                            <span>Machine Learning Research - Exam Grade Prediction</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-2"></span>
                            <span>Database System for Student Management</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-2"></span>
                            <span>Web Development for University Events</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-emerald-50 dark:bg-gray-800 p-4 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                      <h4 className="font-semibold mb-3 text-emerald-700 dark:text-emerald-400">Relevant Coursework:</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Data Structures</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Algorithms</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Software Engineering</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Database Systems</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Web Development</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Computer Networks</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Operating Systems</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Machine Learning</span>
                        <span className="px-3 py-1 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs md:text-sm shadow-sm">Cybersecurity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section - Improved for mobile */}
        <section 
          id="testimonials" 
          ref={sectionRefs.testimonials}
          className="py-16 md:py-20 px-4 sm:px-6 bg-white dark:bg-gray-900"
        >
          <div className={`container mx-auto max-w-5xl ${getSectionAnimationClass('testimonials')}`}>
            <SectionHeader title="Testimonials" subtitle="What People Say" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white text-3xl md:text-4xl font-serif">
                  "
                </div>
                <div className="mb-6 mt-4">
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm md:text-base">
                    Hussein is an exceptional developer with strong problem-solving skills. His work on our e-commerce platform was outstanding, delivering features ahead of schedule and with great attention to detail.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1682089892133-556bde898f2c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmFodWx8ZW58MHx8MHx8fDA%3D"
                      alt="Rahul Sharma"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Rahul Sharma</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">CTO, Business Web Solutions</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white text-3xl md:text-4xl font-serif">
                  "
                </div>
                <div className="mb-6 mt-4">
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm md:text-base">
                    Working with Hussein on our NGO website was a pleasure. He understood our mission and created a user-friendly platform that significantly increased our online donations and volunteer sign-ups.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1669704098858-8cd103f4ac2e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U2FyYWh8ZW58MHx8MHx8fDA%3D"
                      alt="Sarah Johnson"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Sarah Johnson</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Director, Global Aid Initiative</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white text-3xl md:text-4xl font-serif">
                  "
                </div>
                <div className="mb-6 mt-4">
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm md:text-base">
                    Hussein's leadership in our student organization was transformative. He implemented digital solutions that streamlined our operations and improved communication between members significantly.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://plus.unsplash.com/premium_photo-1661964155525-fe70c0f7162b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFmcmljYW4lMjBzdHVkZW50fGVufDB8fDB8fHww"
                      alt="David Okafor"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">David Okafor</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">President, AFSA</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 4 */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-lg relative">
                <div className="absolute -top-4 -left-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl text-white text-3xl md:text-4xl font-serif">
                  "
                </div>
                <div className="mb-6 mt-4">
                  <p className="text-gray-700 dark:text-gray-300 italic text-sm md:text-base">
                    Hussein's machine learning research project was impressive. His ability to translate complex data into actionable insights helped our department improve student support services and academic outcomes.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://images.unsplash.com/photo-1644904105846-095e45fca990?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2Z8ZW58MHx8MHx8fDA%3D"
                      alt="Prof. Lim Wei Chen"
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 dark:text-white">Prof. Lim Wei Chen</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">Computer Science Department, AIU</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section - Improved form responsiveness */}
        <section 
          id="contact" 
          ref={sectionRefs.contact}
          className="py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900"
        >
          <div className={`container mx-auto max-w-4xl ${getSectionAnimationClass('contact')}`}>
            <SectionHeader title="Get In Touch" subtitle="Let's Connect" />
            <p className="mt-4 md:mt-6 max-w-2xl mx-auto text-gray-600 dark:text-gray-300 text-center text-sm md:text-base">
              I'm always open to new opportunities, collaborations, or just a friendly chat about technology. Feel free to reach out using any of the methods below.
            </p>
            
            <div className="relative mt-10 md:mt-12">
              {/* Decorative Background Elements - reduced complexity for performance */}
              <div className="absolute top-0 -left-10 w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full filter blur-2xl opacity-50"></div>
              <div className="absolute bottom-0 -right-10 w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-full filter blur-2xl opacity-50"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 relative z-10">
                <div className="md:col-span-2 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 flex items-center">
                    <Mail className="mr-3" size={22} />
                    Contact Details
                  </h3>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
                      <div className="flex items-start">
                        <Mail className="text-emerald-500 mt-1 mr-4" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Email</h4>
                          <a href="mailto:husseinwaliyu23@gmail.com" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm md:text-base">
                            husseinwaliyu23@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
                      <div className="flex items-start">
                        <MapPin className="text-emerald-500 mt-1 mr-4" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Location</h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            Jalan Tun Abdul Razak, 05200, Alor Setar Kedah Darul Aman, MALAYSIA
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
                      <div className="flex items-start">
                        <ExternalLink className="text-emerald-500 mt-1 mr-4" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">GitHub</h4>
                          <a href="https://github.com/Waliyu23" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline text-sm md:text-base">
                            https://github.com/Waliyu23
                          </a>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 transform transition-transform duration-300 hover:scale-105">
                      <div className="flex items-start">
                        <Globe className="text-emerald-500 mt-1 mr-4" size={18} />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Languages</h4>
                          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                            English (Fluent).
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Social Media */}
                    <div className="pt-4">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Connect on Social Media</h4>
                      <div className="flex space-x-4">
                        <a 
                          href="https://www.linkedin.com/in/hussein-waliyu-a10713254/" 
                          className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-lg"
                          aria-label="LinkedIn Profile"
                        >
                          <Linkedin size={18} />
                        </a>
                        <a 
                          href="https://x.com/starsschola?s=21&t=MlV5ZvVz2XQAh0jAaJIVAQ" 
                          className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-lg"
                          aria-label="Twitter Profile"
                        >
                          <Twitter size={18} />
                        </a>
                        <a 
                          href="https://www.instagram.com/hussein_waliyu?igsh=YmVoZ3l4NWd5Ym54&utm_source=qr" 
                          className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:shadow-lg"
                          aria-label="Instagram Profile"
                        >
                          <Instagram size={18} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="md:col-span-3 bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 flex items-center">
                    <Mail className="mr-3" size={22} />
                    Send Me a Message
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Your Message</label>
                      <textarea 
                        id="message" 
                        rows="4"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="How can I help you?"
                        required
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 transform hover:-translate-y-1 flex items-center justify-center font-medium"
                    >
                      Send Message <Mail className="ml-2" size={18} />
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                      I'll respond to your message as soon as possible. Thank you!
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Optimized for mobile */}
      <footer className="pt-16 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
        {/* Decorative Elements - reduced complexity for mobile */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600"></div>
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-emerald-900/20 to-transparent"></div>
        <div className="absolute top-10 left-10 w-24 md:w-32 h-24 md:h-32 bg-emerald-600/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 md:w-32 h-24 md:h-32 bg-teal-600/10 rounded-full filter blur-2xl"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 pb-12 border-b border-gray-800">
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 inline-block text-transparent bg-clip-text">3+</h3>
              <p className="text-gray-400 text-sm md:text-base">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 inline-block text-transparent bg-clip-text">15+</h3>
              <p className="text-gray-400 text-sm md:text-base">Projects Completed</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 inline-block text-transparent bg-clip-text">5+</h3>
              <p className="text-gray-400 text-sm md:text-base">Happy Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-emerald-400 to-teal-400 inline-block text-transparent bg-clip-text">10+</h3>
              <p className="text-gray-400 text-sm md:text-base">Certificates</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 mb-12 md:mb-16">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-xl md:text-2xl font-bold tracking-tight">
                  <span className="text-emerald-500">Hussein</span> Waliyu
                </div>
              </div>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Full Stack Developer and Computer Science student specializing in creating modern, responsive web applications and machine learning solutions.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/hussein-waliyu-a10713254/" 
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                </a>
                <a 
                  href="https://x.com/starsschola?s=21&t=MlV5ZvVz2XQAh0jAaJIVAQ" 
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={16} />
                </a>
                <a 
                  href="https://www.instagram.com/hussein_waliyu?igsh=YmVoZ3l4NWd5Ym54&utm_source=qr" 
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300"
                  aria-label="Instagram Profile"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 md:space-y-3">
                {navItems.map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 flex items-center text-sm md:text-base"
                    >
                      <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center text-gray-400 text-sm md:text-base">
                  <Mail size={16} className="mr-3 text-emerald-500" />
                  <span>husseinwaliyu23@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm md:text-base">
                  <MapPin size={16} className="mr-3 text-emerald-500" />
                  <span>Alor Setar, Kedah, Malaysia</span>
                </div>
                <div className="flex items-center text-gray-400 text-sm md:text-base">
                  <ExternalLink size={16} className="mr-3 text-emerald-500" />
                  <span>https://github.com/Waliyu23</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:-translate-y-1 text-sm"
                >
                  Get In Touch
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs md:text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Hussein Waliyu. All rights reserved.
            </p>
            <div className="flex items-center">
              <p className="text-gray-500 text-xs md:text-sm mr-3">Made with</p>
              <span className="text-red-500 animate-pulse">❤</span>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button - Enhanced Accessibility */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-2 md:p-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full shadow-lg transform transition-all duration-500 z-50 group ${isScrolling ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        aria-label="Back to top"
      >
        <ArrowDown className="transform rotate-180 group-hover:animate-bounce" size={18} />
      </button>
    </div>
  );
};

export default Portfolio;