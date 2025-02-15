import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BusinessData } from "@/types/business";

interface LayoutProps {
  children: React.ReactNode;
  businessData?: BusinessData | null;
}

export function Layout({ children, businessData }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar businessName={businessData?.basic_info.name} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}
