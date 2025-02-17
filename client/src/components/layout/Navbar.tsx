import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import { preserveQueryParams } from "@/lib/utils";

interface NavbarProps {
  businessName?: string;
}

export function Navbar({ businessName = "Plumbing Services" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Residential", href: "/residential" },
    { label: "Commercial", href: "/commercial" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={preserveQueryParams("/")} className="text-xl font-bold text-blue-400">
          {businessName}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={preserveQueryParams(item.href)}
              className="text-sm font-medium text-gray-300 hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Button>Contact Us</Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={preserveQueryParams(item.href)}
                  className="text-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-full">Contact Us</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}