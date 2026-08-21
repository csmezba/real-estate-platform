import { Listing, Agent, BlogPost } from "./types";

export const agents: Agent[] = [
  {
    id: "agent-1",
    name: "Alistair Sterling",
    role: "Senior Managing Director, Luxury Advisory",
    rating: 4.9,
    reviewsCount: 148,
    languages: ["English", "French"],
    experienceYears: 18,
    soldVolume: "$320M+",
    specialties: ["Luxury Waterfront", "Private Penthouses", "New Development Off-Market"],
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500",
    phone: "(310) 555-0198",
    email: "alistair@luxeestates.com",
    awards: ["President's Club Elite (Top 0.1% National)", "Sotheby's Global Top Producer 2024"],
  },
  {
    id: "agent-2",
    name: "Victoria Vance",
    role: "Director of International Client Services",
    rating: 5.0,
    reviewsCount: 96,
    languages: ["English", "Mandarin", "Spanish"],
    experienceYears: 12,
    soldVolume: "$185M+",
    specialties: ["Investment Portfolios", "Historic Mansions", "Corporate Relocation"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500",
    phone: "(212) 555-0142",
    email: "victoria@luxeestates.com",
    awards: ["Elite Architectural Ambassador Award", "MLS Platinum Circle 2023-2025"],
  },
  {
    id: "agent-3",
    name: "Christian Thorne",
    role: "Lead Broker, Coastal Estates",
    rating: 4.8,
    reviewsCount: 210,
    languages: ["English"],
    experienceYears: 15,
    soldVolume: "$240M+",
    specialties: ["Beachfront Estates", "Architectural Masterpieces", "Equestrian Ranches"],
    photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500",
    phone: "(415) 555-0177",
    email: "christian@luxeestates.com",
    awards: ["Architectural Digest Broker Feature", "Top 50 Real Estate Agents in California"],
  }
];

export const listings: Listing[] = [
  {
    id: "prop-1",
    title: "The Glass Pavilion & Infinity Estate",
    price: 14500000,
    address: "2731 Ocean Terrace Rd",
    city: "Malibu",
    state: "CA",
    zip: "90265",
    beds: 5,
    baths: 6.5,
    sqft: 8200,
    propertyType: "Luxury Estate",
    status: "Buy",
    isLuxury: true,
    isOpenHouse: true,
    photos: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613977257592-4871e5fbe76e?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    ],
    description: "Suspended between sky and sea, this architectural masterpiece designed by renowned architect Marc Whipple represents Malibu luxury living at its finest. Built entirely of concrete, steel, and structural glass, the estate boasts 180-degree white-water ocean views. A massive custom pivots door opens to a triple-height foyer leading to the living and dining gallery. Amenities include a dual-sided floating fireplace, automated Fleetwood glass pocket doors, custom Italian Boffi kitchen, 75-foot infinity pool cascading over Malibu's coastline, wellness wing, home automation, and separate guest residence.",
    amenities: ["Infinity Pool", "Wellness Spa", "Home Cinema", "Smart Automation", "Wine Cellar", "Guest House", "Private Beach Access"],
    walkScore: 68,
    transitScore: 42,
    schools: [
      { name: "Webster Elementary School", rating: 9, distance: "1.2 miles" },
      { name: "Malibu High School", rating: 10, distance: "2.5 miles" }
    ],
    taxes: 112000,
    hoa: 450,
    energyScore: 92,
    agentId: "agent-1",
    priceHistory: [
      { year: 2026, price: 14500000, event: "Listed" },
      { year: 2024, price: 12200000, event: "Sold" },
      { year: 2021, price: 9500000, event: "Sold" }
    ],
    neighborhood: {
      walkScore: 68,
      transitScore: 42,
      schoolRating: 9.5,
      crimeRate: "Very Low",
      medianIncome: "$230,000"
    }
  },
  {
    id: "prop-2",
    title: "The Obsidian Skyline Penthouse",
    price: 8900000,
    address: "721 Park Avenue, Penthouse 42B",
    city: "New York",
    state: "NY",
    zip: "10021",
    beds: 3,
    baths: 3.5,
    sqft: 4500,
    propertyType: "Penthouse",
    status: "Buy",
    isLuxury: true,
    isOpenHouse: false,
    photos: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Perched atop one of Park Avenue's premier pre-war cooperatives, this spectacular 4,500 sqft penthouse duplex offers panoramic views of Central Park and the Manhattan skyline. Masterfully redesigned by Pierre Yovanovitch, the residence displays a seamless blend of timeless elegance and minimalist scale. Features a private elevator landing, grand corner salon, custom bronze staircase, formal dining room, gourmet eat-in kitchen with Calacatta marble slab countertops, and a wrapping 1,200 sqft terrace overlooking the reservoir.",
    amenities: ["Private Elevator", "Central Park Views", "Wrap-around Terrace", "24/7 White-glove Doorman", "Fitness Pavilion", "Catering Kitchen", "Automated Shades"],
    walkScore: 98,
    transitScore: 100,
    schools: [
      { name: "PS 6 Lillie D Devereaux School", rating: 10, distance: "0.3 miles" },
      { name: "Hunter College High School", rating: 10, distance: "0.8 miles" }
    ],
    taxes: 84000,
    hoa: 2200,
    energyScore: 88,
    agentId: "agent-2",
    priceHistory: [
      { year: 2026, price: 8900000, event: "Listed" },
      { year: 2025, price: 9200000, event: "Price Change" },
      { year: 2022, price: 7800000, event: "Sold" }
    ],
    neighborhood: {
      walkScore: 98,
      transitScore: 100,
      schoolRating: 10,
      crimeRate: "Very Low",
      medianIncome: "$310,000"
    }
  },
  {
    id: "prop-3",
    title: "Sausalito Mid-Century Floating Pavilion",
    price: 4950000,
    address: "18 Golden Gate Point",
    city: "Sausalito",
    state: "CA",
    zip: "94965",
    beds: 4,
    baths: 4,
    sqft: 3800,
    propertyType: "Single Family",
    status: "Buy",
    isLuxury: false,
    isOpenHouse: true,
    photos: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Originally constructed in 1964 and completely modernized in 2025, this architectural gem celebrates mid-century modern design in direct dialogue with Sausalito's marine climate. Floor-to-ceiling redwood-framed glass captures unobstructed frames of the Golden Gate Bridge and San Francisco skyline. Redwood ceilings, polished terrazzo flooring, and custom walnut cabinetry highlight the primary living areas. Generous decks flow seamlessly to landscaped tier gardens.",
    amenities: ["Golden Gate Views", "Teak Sun Deck", "Wine Vault", "Chef's Kitchen", "Terrazzo Flooring", "Solar Array", "EV Fast Charger"],
    walkScore: 74,
    transitScore: 55,
    schools: [
      { name: "Bayside Academy", rating: 8, distance: "1.4 miles" },
      { name: "Tamalpais High School", rating: 9, distance: "3.2 miles" }
    ],
    taxes: 38000,
    hoa: 0,
    energyScore: 95,
    agentId: "agent-3",
    priceHistory: [
      { year: 2026, price: 4950000, event: "Listed" },
      { year: 2018, price: 3400000, event: "Sold" }
    ],
    neighborhood: {
      walkScore: 74,
      transitScore: 55,
      schoolRating: 8.5,
      crimeRate: "Very Low",
      medianIncome: "$185,000"
    }
  },
  {
    id: "prop-4",
    title: "Mid-Town Luxury Apartment",
    price: 18500, // Rent per month
    address: "420 Biscayne Blvd, Unit 3801",
    city: "Miami",
    state: "FL",
    zip: "33132",
    beds: 2,
    baths: 2.5,
    sqft: 2100,
    propertyType: "Apartment",
    status: "Rent",
    isLuxury: false,
    isOpenHouse: false,
    photos: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Experience resort-style luxury in this spectacular corner unit apartment at Ten Museum Park. Elevated 38 floors above Biscayne Bay, this residence enjoys pristine east-facing views of the bay, Miami Beach, and the Atlantic Ocean. Double-height 20-foot ceilings, architectural concrete columns, and premium Sub-Zero and Miele appliances define the master loft layout. Full building amenities include a private spa, multiple dip pools, state-of-the-art gym, and 24-hour concierge.",
    amenities: ["Biscayne Bay Views", "Double-height Lofts", "Wellness Spa Center", "Infinity Pools", "Valet Parking", "24/7 Security", "Pet Friendly"],
    walkScore: 89,
    transitScore: 90,
    schools: [
      { name: "Downtown Miami Charter School", rating: 7, distance: "0.6 miles" },
      { name: "Miami Senior High School", rating: 7, distance: "2.1 miles" }
    ],
    taxes: 0,
    hoa: 1100,
    energyScore: 82,
    agentId: "agent-2",
    priceHistory: [
      { year: 2026, price: 18500, event: "Listed" },
      { year: 2024, price: 16000, event: "Price Change" }
    ],
    neighborhood: {
      walkScore: 89,
      transitScore: 90,
      schoolRating: 7,
      crimeRate: "Low",
      medianIncome: "$115,000"
    }
  },
  {
    id: "prop-5",
    title: "Contemporary Hillside Villa",
    price: 6450000,
    address: "1483 Oriole Way",
    city: "Los Angeles",
    state: "CA",
    zip: "90069",
    beds: 4,
    baths: 4.5,
    sqft: 5200,
    propertyType: "Villa",
    status: "Buy",
    isLuxury: true,
    isOpenHouse: false,
    photos: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "Nestled quietly within the ultra-exclusive Bird Streets, this architectural villa offers incredible visual drama. An over-engineered glass-walled garage gives way to the foyer with a living green wall and water feature. Massive pocket doors frame stunning views of the entire Los Angeles basin. Features high-end limestone floors, professional home studio, custom security architecture, smart climate management, and an spectacular pool terrace with heated dining bar.",
    amenities: ["Bird Streets Privacy", "City Basin Views", "Heated Pool Bar", "Green wall foyer", "Home Recording Studio", "Limestone flooring", "Multi-zone HVAC"],
    walkScore: 54,
    transitScore: 38,
    schools: [
      { name: "West Hollywood Elementary", rating: 9, distance: "0.9 miles" },
      { name: "LACES Magnet High School", rating: 9, distance: "4.1 miles" }
    ],
    taxes: 52000,
    hoa: 0,
    energyScore: 90,
    agentId: "agent-1",
    priceHistory: [
      { year: 2026, price: 6450000, event: "Listed" }
    ],
    neighborhood: {
      walkScore: 54,
      transitScore: 38,
      schoolRating: 9,
      crimeRate: "Low",
      medianIncome: "$190,000"
    }
  },
  {
    id: "prop-6",
    title: "Pacific Heights Victorian Reimagined",
    price: 11500000,
    address: "2940 Broadway",
    city: "San Francisco",
    state: "CA",
    zip: "94115",
    beds: 6,
    baths: 7,
    sqft: 7400,
    propertyType: "Luxury Estate",
    status: "Sold",
    isLuxury: true,
    isOpenHouse: false,
    photos: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&q=80&w=1200"
    ],
    description: "This historic Pacific Heights Victorian built in 1898 has been meticulously down-to-the-studs reimagined for twenty-first-century architectural performance. The floor plan has been opened to flood all five levels with light from a newly installed central skylight atrium. Golden Gate Bridge and Bay views are featured from all primary bedrooms. High ceilings, herringbone white-oak floors, bespoke moldings, and customized millwork reflect exquisite craftsmanship throughout.",
    amenities: ["Bay & Golden Gate Views", "Central Skylight Atrium", "Wine Vault & Tasting Salon", "Dedicated Elevator", "Terraced Gardens", "Automated Security Room", "Penthouse Clubroom"],
    walkScore: 94,
    transitScore: 82,
    schools: [
      { name: "Sherman Elementary School", rating: 9, distance: "0.5 miles" },
      { name: "Wallenberg High School", rating: 8, distance: "1.1 miles" }
    ],
    taxes: 96000,
    hoa: 0,
    energyScore: 86,
    agentId: "agent-3",
    priceHistory: [
      { year: 2026, price: 11500000, event: "Sold" },
      { year: 2024, price: 12000000, event: "Listed" },
      { year: 2019, price: 8200000, event: "Sold" }
    ],
    neighborhood: {
      walkScore: 94,
      transitScore: 82,
      schoolRating: 8.5,
      crimeRate: "Very Low",
      medianIncome: "$270,000"
    }
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Modern Architectural Masterpieces: The Shift Toward Steel and Glass",
    category: "Interior Design",
    excerpt: "Exploring how luxury builders are pushing engineering limits to frame breathtaking, uninterrupted landscape profiles.",
    author: "Elena Rostova",
    date: "July 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog-2",
    title: "Understanding High-Yield Real Estate Investment in an Appreciating Economy",
    category: "Investment",
    excerpt: "A data-driven deep dive into how changing inflation rates affect luxury residential asset classes in coastal US hubs.",
    author: "Richard Caldwell",
    date: "July 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "blog-3",
    title: "The Ultimate Guide to Pre-Approval and Navigating Jumbo Home Loans",
    category: "Buying",
    excerpt: "Everything you need to secure high-value finance options with top-tier private banks and exclusive lenders.",
    author: "Marcus Vance",
    date: "June 28, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600"
  }
];
