import { Bot, Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Framework',
      links: [
        { label: 'LangGraph', href: '#' },
        { label: 'CrewAI', href: '#' },
        { label: 'Autogen', href: '#' },
        { label: 'MemGPT', href: '#' }
      ]
    },
    {
      title: 'Tools',
      links: [
        { label: 'OpenAI Functions', href: '#' },
        { label: 'Vector Databases', href: '#' },
        { label: 'Monitoring', href: '#' },
        { label: 'Deployment', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'Examples', href: '#' },
        { label: 'Community', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-card/50 border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-background" />
              </div>
              <span className="font-bold font-inter text-lg text-foreground">
                AI Agent Systems
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Building the future of intelligent, scalable AI agent architectures. 
              Enterprise-grade solutions for the next generation of AI systems.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Github className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Twitter className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-muted/50 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} AI Agent Systems. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;