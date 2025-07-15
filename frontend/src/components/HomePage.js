import React, { useState, useEffect } from 'react';
import { mockData } from '../mock';
import { 
  ArrowRight, 
  Brain, 
  Code, 
  Palette, 
  Cloud, 
  Menu, 
  X,
  Mail,
  Linkedin,
  Instagram,
  Twitter,
  Send
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Smooth scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsContactFormOpen(false);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Service icon mapping
  const getServiceIcon = (iconName) => {
    const icons = {
      Brain: Brain,
      Code: Code,
      Palette: Palette,
      Cloud: Cloud
    };
    const IconComponent = icons[iconName] || Brain;
    return <IconComponent size={48} className="text-accent-primary" />;
  };

  // Add scroll-based animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="h2 text-text-primary font-bold">
              Trintz <span className="text-accent-primary">Tech</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {mockData.navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className="btn-ghost"
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden btn-ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border-subtle pt-4">
              {mockData.navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href.slice(1))}
                  className="block w-full text-left py-2 text-text-secondary hover:text-accent-primary transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="section pt-32 pb-20">
        <div className="container mx-auto text-center">
          <div className="fade-in-on-scroll">
            <h1 className="display-lg text-text-primary mb-6 animated-gradient bg-clip-text text-transparent">
              {mockData.company.hero.title}
            </h1>
            <p className="body-lg max-w-3xl mx-auto mb-8 text-text-secondary">
              {mockData.company.hero.subtitle}
            </p>
            <button
              onClick={() => scrollToSection('services')}
              className="btn-primary hover-lift"
            >
              {mockData.company.hero.ctaText}
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section bg-bg-secondary">
        <div className="container mx-auto">
          <div className="fade-in-on-scroll">
            <h2 className="display-md text-center mb-12 text-text-primary">
              {mockData.about.title}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="body-lg text-text-secondary leading-relaxed">
                {mockData.about.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section">
        <div className="container mx-auto">
          <div className="fade-in-on-scroll">
            <h2 className="display-md text-center mb-16 text-text-primary">
              Our Services
            </h2>
            <div className="grid-2 lg:grid-cols-2 gap-8">
              {mockData.services.map((service, index) => (
                <div
                  key={service.id}
                  className="feature-card fade-in-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-6">
                    {getServiceIcon(service.icon)}
                  </div>
                  <h3 className="h2 mb-4 text-text-primary">{service.title}</h3>
                  <p className="body-md text-text-secondary mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-accent-bg text-accent-primary text-sm rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section bg-bg-secondary">
        <div className="container mx-auto">
          <div className="fade-in-on-scroll">
            <h2 className="display-md text-center mb-16 text-text-primary">
              Meet Our Team
            </h2>
            <div className="grid-4 lg:grid-cols-4 gap-6">
              {mockData.team.map((member, index) => (
                <div
                  key={member.id}
                  className="team-card fade-in-on-scroll"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="h3 mb-2 text-text-primary">{member.name}</h3>
                  <p className="body-sm text-accent-primary mb-3 font-medium">
                    {member.role}
                  </p>
                  <p className="body-sm text-text-muted">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <div className="container mx-auto">
          <div className="fade-in-on-scroll text-center">
            <h2 className="display-md mb-8 text-text-primary">
              Let's Build Something Amazing Together
            </h2>
            <p className="body-lg mb-12 text-text-secondary max-w-2xl mx-auto">
              Ready to transform your ideas into intelligent digital solutions? 
              Get in touch with our team and let's discuss your project.
            </p>
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="btn-primary hover-lift"
            >
              Get In Touch
              <Mail size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-secondary border-t border-border-subtle py-16">
        <div className="container mx-auto">
          <div className="grid-4 lg:grid-cols-4 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="h2 text-text-primary font-bold mb-4">
                Trintz <span className="text-accent-primary">Tech</span>
              </div>
              <p className="body-md text-text-secondary mb-6">
                Building smarter digital futures with cutting-edge AI solutions, 
                full-stack development, and innovative design.
              </p>
              <div className="flex space-x-4">
                <a href={mockData.social.linkedin} className="footer-social-link">
                  <Linkedin size={20} />
                </a>
                <a href={mockData.social.instagram} className="footer-social-link">
                  <Instagram size={20} />
                </a>
                <a href={mockData.social.twitter} className="footer-social-link">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="h3 text-text-primary mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {mockData.navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href.slice(1))}
                      className="text-text-secondary hover:text-accent-primary transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="h3 text-text-primary mb-4">Contact</h4>
              <p className="body-md text-text-secondary">
                {mockData.company.email}
              </p>
            </div>
          </div>
          
          <div className="border-t border-border-subtle pt-8">
            <p className="text-center text-text-muted">
              © 2024 Trintz Technologies Pvt Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-bg-secondary rounded-16 p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="h2 text-text-primary">Contact Us</h3>
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="btn-ghost p-2"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-text-secondary mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-text-secondary mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-text-secondary mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="textarea-field"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>
              
              <button type="submit" className="btn-primary w-full">
                Send Message
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;