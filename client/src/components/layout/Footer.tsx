import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link href="/residential" className="hover:text-primary transition-colors">
                Residential Services
              </Link>
              <Link href="/commercial" className="hover:text-primary transition-colors">
                Commercial Services
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Services</h3>
            <div className="flex flex-col gap-2">
              <span>Emergency Repairs</span>
              <span>Installation</span>
              <span>Maintenance</span>
              <span>Inspections</span>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="flex flex-col gap-2">
              <span>24/7 Emergency Service</span>
              <span>Licensed & Insured</span>
              <span>Free Estimates</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}