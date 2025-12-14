import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, Check, Mail, Linkedin, MapPin, Phone, FileDown } from 'lucide-react';
import content from '@/data/content.json';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const { personal } = content;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/amrittyagi52@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: "New Contact Form Submission - Portfolio",
          _template: "table"
        })
      });

      if (response.ok) {
        setIsSubmitting(false);
        setIsSubmitted(true);

        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });

        // Reset after animation
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later or email me directly.",
        variant: "destructive"
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: 'Phone', value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: 'Location', value: personal.location },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: personal.linkedin },
  ];

  return (
    <section id="contact" className="section-padding relative" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at bottom, hsl(var(--primary) / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase mb-4 block">
            05 / Contact
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full bg-gradient-to-r from-primary via-secondary to-accent" />
          <p className="mt-6 text-muted-foreground max-w-lg mx-auto">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-8">
              <span className="gradient-text">Contact Info</span>
            </h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href || '#'}
                  target={item.href?.startsWith('http') ? '_blank' : undefined}
                  rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="group glass-card p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-1">
                      {item.label}
                    </span>
                    <span className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Resume Download */}
            <motion.a
              href="#"
              className="group inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-primary/50 hover:border-primary text-primary font-semibold transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.02, boxShadow: '0 0 30px hsl(var(--primary) / 0.3)' }}
              whileTap={{ scale: 0.98 }}
            >
              <FileDown size={20} className="group-hover:animate-bounce" />
              Download Resume
            </motion.a>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl font-semibold mb-8">
              <span className="gradient-text-secondary">Send Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 transition-colors peer"
                  placeholder="Your Name"
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'name' || formData.name
                      ? '-top-2.5 text-xs bg-background px-2 text-primary'
                      : 'top-4 text-muted-foreground'
                    }`}
                >
                  Your Name
                </label>
              </motion.div>

              {/* Email Input */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 transition-colors peer"
                  placeholder="your@email.com"
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'email' || formData.email
                      ? '-top-2.5 text-xs bg-background px-2 text-primary'
                      : 'top-4 text-muted-foreground'
                    }`}
                >
                  Email Address
                </label>
              </motion.div>

              {/* Message Input */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  className="w-full px-4 py-4 bg-muted/50 border border-border rounded-xl text-foreground placeholder-transparent focus:outline-none focus:border-primary/50 transition-colors resize-none peer"
                  placeholder="Your message..."
                />
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${focusedField === 'message' || formData.message
                      ? '-top-2.5 text-xs bg-background px-2 text-secondary'
                      : 'top-4 text-muted-foreground'
                    }`}
                >
                  Your Message
                </label>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="group relative w-full py-4 rounded-xl font-semibold overflow-hidden disabled:cursor-not-allowed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {/* Background */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: isSubmitted
                      ? 'linear-gradient(135deg, hsl(142 76% 36%), hsl(142 76% 46%))'
                      : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
                  }}
                  animate={{
                    backgroundPosition: isSubmitting ? ['0% 0%', '100% 100%'] : '0% 0%',
                  }}
                  transition={{
                    duration: 1,
                    repeat: isSubmitting ? Infinity : 0,
                    ease: "linear",
                  }}
                />

                {/* Content */}
                <span className="relative z-10 flex items-center justify-center gap-2 text-primary-foreground">
                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.span
                        key="success"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <Check size={20} />
                        Sent Successfully!
                      </motion.span>
                    ) : isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sending...
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Send Message
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
