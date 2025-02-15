import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { BusinessData } from "@/types/business";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useSiteId } from "@/hooks/useBusinessData";

interface LayoutProps {
  children: React.ReactNode;
  businessData?: BusinessData | null;
}

export function Layout({ children, businessData }: LayoutProps) {
  const siteId = useSiteId();
  useAnalytics(siteId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar businessName={businessData?.basic_info.name} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
}