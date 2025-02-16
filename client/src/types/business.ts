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
  five_star_reviews?: {
    text: string;
    reviewer_name: string;
    date: string;
  }[];
}
