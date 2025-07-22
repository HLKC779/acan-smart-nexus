import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Bot, Brain, User, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'components', label: 'Components' },
    { id: 'features', label: 'Features' },
    { id: 'examples', label: 'Examples' },
    { id: 'cta', label: 'Get Started' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-floating' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-500">
                <Bot className="w-5 h-5 text-background" />
              </div>
              <div className="absolute inset-0 bg-gradient-primary rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
            </div>
            <span className="font-bold font-inter text-xl text-foreground group-hover:text-agent-blue transition-colors duration-300">
              AI Agent Systems
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative px-4 py-2 text-muted-foreground hover:text-agent-blue transition-all duration-300 font-medium group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/rl-agent-management">
              <Button 
                variant="outline"
                className="border-purple-500/30 text-purple-500 hover:bg-purple-500/10 hover:border-purple-500/50 hover:shadow-glow/50 transition-all duration-300"
              >
                <Settings className="w-4 h-4 mr-2" />
                RL Agents
              </Button>
            </Link>
            <Link to="/ai-chat">
              <Button 
                variant="outline"
                className="border-agent-blue/30 text-agent-blue hover:bg-agent-blue/10 hover:border-agent-blue/50 hover:shadow-glow/50 transition-all duration-300"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Chat
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    {user.email}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 font-semibold">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-all duration-300"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <Link to="/rl-agent-management" className="block">
                  <Button 
                    variant="outline"
                    className="w-full border-purple-500/20 text-purple-500 hover:bg-purple-500/10"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    RL Agents
                  </Button>
                </Link>
                <Link to="/ai-chat" className="block">
                  <Button 
                    variant="outline"
                    className="w-full border-primary/20 text-primary hover:bg-primary/10"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    AI Chat
                  </Button>
                </Link>
                
                {user ? (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground px-3 py-2">
                      {user.email}
                    </div>
                    <Button 
                      onClick={handleSignOut}
                      variant="outline"
                      className="w-full border-destructive/20 text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" className="block">
                    <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;