export interface PriceHistory {
  year: number;
  price: number;
  event: 'Listed' | 'Sold' | 'Price Change';
}

export interface NeighborhoodStats {
  walkScore: number;
  transitScore: number;
  schoolRating: number;
  crimeRate: 'Very Low' | 'Low' | 'Moderate';
  medianIncome: string;
}

export interface Listing {
  id: string;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: 'Single Family' | 'Apartment' | 'Condo' | 'Townhouse' | 'Villa' | 'Luxury Estate' | 'Penthouse';
  status: 'Buy' | 'Rent' | 'Sold';
  isLuxury: boolean;
  isOpenHouse: boolean;
  photos: string[];
  description: string;
  amenities: string[];
  walkScore: number;
  transitScore: number;
  schools: { name: string; rating: number; distance: string }[];
  taxes: number;
  hoa: number;
  energyScore: number;
  agentId: string;
  priceHistory: PriceHistory[];
  neighborhood: NeighborhoodStats;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  experienceYears: number;
  soldVolume: string;
  specialties: string[];
  photo: string;
  phone: string;
  email: string;
  awards: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'Buying' | 'Selling' | 'Investment' | 'Market' | 'Luxury' | 'Interior Design';
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface ValuationResult {
  estimatedValue: number;
  priceRange: { min: number; max: number };
  sqftValue: number;
  confidence: string;
  appraisalText: string;
  comparables: {
    address: string;
    salePrice: number;
    beds: number;
    baths: number;
    sqft: number;
    distance: string;
  }[];
  marketInsights: {
    neighborhoodTrend: string;
    avgDaysOnMarket: number;
    schoolsGrade: string;
    investmentScore: number;
  };
  customUpgradesValuation: string;
}
