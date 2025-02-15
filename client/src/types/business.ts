export interface BusinessData {
  ids: {
    site_id: string;
  };
  basic_info: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
  };
  services?: {
    title: string;
    description: string;
    image_url?: string;
  }[];
  reviews?: {
    author: string;
    rating: number;
    text: string;
  }[];
}
