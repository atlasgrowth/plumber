import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  features?: string[];
  onContactClick?: () => void;
}

export function ServiceCard({
  title,
  description,
  features = [],
  onContactClick
}: ServiceCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        {features.length > 0 && (
          <ul className="list-disc list-inside mb-6 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="text-gray-600">{feature}</li>
            ))}
          </ul>
        )}
        <Button onClick={onContactClick} className="w-full">
          Contact Us
        </Button>
      </CardContent>
    </Card>
  );
}
