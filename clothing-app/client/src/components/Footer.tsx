import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail("");
  };

  return (
    <footer className="bg-card border-t" data-testid="footer-main">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-semibold" data-testid="text-footer-brand">
              Fashion Store
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-footer-description">
              Curating timeless fashion pieces that blend contemporary style with classic elegance.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-youtube">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold" data-testid="text-footer-quick-links">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-about">
                  About Us
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-collections">
                  Collections
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-sale">
                  Sale
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-blog">
                  Blog
                </Button>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold" data-testid="text-footer-customer-service">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-shipping">
                  Shipping Info
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-returns">
                  Returns & Exchanges
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-size-guide">
                  Size Guide
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground" data-testid="link-contact">
                  Contact Us
                </Button>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold" data-testid="text-footer-newsletter">Stay Updated</h4>
            <p className="text-sm text-muted-foreground" data-testid="text-newsletter-description">
              Subscribe to get special offers and style updates.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-sm"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" size="sm" className="w-full" data-testid="button-newsletter-submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground" data-testid="text-footer-copyright">
            © 2024 Fashion Store. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm" data-testid="link-privacy">
              Privacy Policy
            </Button>
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm" data-testid="link-terms">
              Terms of Service
            </Button>
            <Button variant="ghost" className="p-0 h-auto text-muted-foreground hover:text-foreground text-sm" data-testid="link-cookies">
              Cookie Policy
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span data-testid="text-contact-email">hello@fashionstore.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span data-testid="text-contact-phone">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span data-testid="text-contact-address">123 Fashion Ave, NY 10001</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}