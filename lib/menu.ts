export type Diet = "veg" | "nv";

export type PricePair = {
  half?: string;
  full: string;
};

export type MomoPrices = {
  steam: string | null;
  fried: string;
  cheese: string;
  tandoori: string;
};

export type Dish = {
  name: string;
  diet: Diet;
  price?: string;
  note?: string;
  special?: boolean;
  pair?: PricePair;
  momo?: MomoPrices;
};

export type MenuSection = {
  id: string;
  title: string;
  diets: Diet[];
  note?: string;
  layout?: "list" | "split" | "momo";
  items: Dish[];
};

export const menuNav = [
  { id: "soups", label: "Soups" },
  { id: "veg-starters", label: "Veg Starters" },
  { id: "chicken-starters", label: "Chicken" },
  { id: "rice-noodles", label: "Rice & Noodles" },
  { id: "shawarma", label: "Shawarma" },
  { id: "momos", label: "Momos" },
  { id: "address", label: "Address" },
] as const;

export const menu: MenuSection[] = [
  {
    id: "soups",
    title: "Soups",
    diets: ["veg", "nv"],
    items: [
      { name: "Manchow Soup", diet: "veg", price: "₹90" },
      { name: "Sweet Corn Soup", diet: "veg", price: "₹90" },
      { name: "Hot ’n’ Sour Soup", diet: "veg", price: "₹90" },
      { name: "Burnt Garlic Soup", diet: "veg", price: "₹90" },
      { name: "Chicken Soup", diet: "nv", price: "₹100" },
    ],
  },
  {
    id: "veg-starters",
    title: "Veg Starters",
    diets: ["veg"],
    items: [
      { name: "French Fries", diet: "veg", price: "₹70" },
      { name: "Veg Nuggets", diet: "veg", price: "₹90" },
      { name: "Paneer Chilly", diet: "veg", price: "₹200" },
      { name: "Paneer Manchurian Dry", diet: "veg", price: "₹200" },
      { name: "Paneer Hot Garlic", diet: "veg", price: "₹200" },
      { name: "Paneer Schezwan", diet: "veg", price: "₹200" },
      { name: "Paneer Crispy", diet: "veg", price: "₹200" },
      { name: "Veg Manchurian", diet: "veg", price: "₹160" },
      { name: "Veg Spring Roll", diet: "veg", price: "₹175" },
      { name: "Veg Crispy", diet: "veg", price: "₹180" },
      { name: "Honey Chilly Potato", diet: "veg", price: "₹180" },
    ],
  },
  {
    id: "chicken-starters",
    title: "Chicken Starters",
    diets: ["nv"],
    items: [
      { name: "Chicken Hot Garlic", diet: "nv", price: "₹220" },
      { name: "Chicken Schezwan", diet: "nv", price: "₹220" },
      { name: "Chicken Manchurian", diet: "nv", price: "₹220" },
      { name: "Chicken Chilly", diet: "nv", price: "₹250" },
      { name: "Chicken Lollypop", diet: "nv", price: "₹250" },
      { name: "Chicken Crispy", diet: "nv", price: "₹250" },
      { name: "Dragon Spring Roll", diet: "nv", price: "₹220" },
      { name: "Chicken Spring Roll", diet: "nv", price: "₹220" },
      { name: "Chicken 65", diet: "nv", price: "₹220" },
      { name: "Chicken Nepal Red Sauce", diet: "nv", price: "₹200" },
      { name: "Chicken Lollypop Sauce Dry / Gravy", diet: "nv", price: "₹250", note: "8 pcs" },
      { name: "Chicken Leg Piece", diet: "nv", price: "₹250", note: "2 pcs" },
      { name: "Chicken Nuggets", diet: "nv", price: "₹120", note: "7 pcs" },
      { name: "Yajur’s Special", diet: "nv", price: "₹250", special: true, note: "House favourite" },
    ],
  },
  {
    id: "rice-noodles",
    title: "Rice & Noodles",
    diets: ["veg", "nv"],
    layout: "split",
    note: "Half / Full where listed. Same price for rice or noodles.",
    items: [
      { name: "Veg Fried Rice / Noodles", diet: "veg", pair: { half: "₹90", full: "₹150" } },
      { name: "Chicken Fried Rice / Noodles", diet: "nv", pair: { half: "₹110", full: "₹170" } },
      { name: "Egg Fried Rice / Noodles", diet: "nv", pair: { half: "₹100", full: "₹150" } },
      { name: "Hakka Rice / Noodles", diet: "veg", pair: { half: "₹120", full: "₹180" } },
      { name: "Packing Rice / Noodles", diet: "nv", pair: { full: "₹200" } },
      { name: "Combination Rice / Noodles", diet: "nv", pair: { half: "₹150", full: "₹220" } },
      { name: "Schezwan Rice / Noodles", diet: "veg", pair: { half: "₹120", full: "₹180" } },
      { name: "Manchurian Rice / Noodles", diet: "veg", pair: { half: "₹110", full: "₹160" } },
      { name: "Triple Rice / Noodles", diet: "nv", pair: { half: "₹160", full: "₹220" } },
      { name: "Paneer Chilly Rice / Noodles", diet: "veg", pair: { full: "₹220" } },
      { name: "Prawn Rice / Noodles", diet: "nv", pair: { full: "₹220" } },
    ],
  },
  {
    id: "shawarma",
    title: "Shawarma",
    diets: ["nv"],
    items: [
      { name: "Pav Shawarma", diet: "nv", price: "₹40" },
      { name: "Classic Shawarma", diet: "nv", price: "₹70" },
      { name: "Peri Peri Shawarma", diet: "nv", price: "₹90" },
      { name: "Double Chicken Shawarma", diet: "nv", price: "₹100" },
      { name: "Barbeque Shawarma", diet: "nv", price: "₹100" },
      { name: "Cheese Peri Peri Shawarma", diet: "nv", price: "₹120" },
      { name: "Cheese Barbeque Shawarma", diet: "nv", price: "₹120" },
      { name: "Open Shawarma", diet: "nv", price: "₹120" },
      { name: "Open Cheese Shawarma", diet: "nv", price: "₹180" },
      { name: "Salad Shawarma", diet: "nv", price: "₹120 / ₹180", note: "Small / Big" },
    ],
  },
  {
    id: "momos",
    title: "Momos",
    diets: ["veg", "nv"],
    layout: "momo",
    note: "1 plate = 6 pieces. Choose steam, fried, cheese or tandoori.",
    items: [
      { name: "Veg Momo", diet: "veg", momo: { steam: "₹70", fried: "₹80", cheese: "₹90", tandoori: "₹100" } },
      { name: "Paneer Momo", diet: "veg", momo: { steam: "₹80", fried: "₹90", cheese: "₹100", tandoori: "₹120" } },
      { name: "Chicken Momo", diet: "nv", momo: { steam: "₹90", fried: "₹100", cheese: "₹110", tandoori: "₹130" } },
      { name: "Cheese Corn Momo", diet: "veg", momo: { steam: "₹90", fried: "₹100", cheese: "₹110", tandoori: "₹130" } },
      { name: "Kurkure Momo", diet: "veg", momo: { steam: null, fried: "₹120", cheese: "₹130", tandoori: "₹140" } },
      { name: "Paneer Tikka Momo", diet: "veg", momo: { steam: "₹90", fried: "₹100", cheese: "₹110", tandoori: "₹130" } },
      { name: "Chicken Tikka Momo", diet: "nv", momo: { steam: "₹90", fried: "₹100", cheese: "₹110", tandoori: "₹130" } },
      { name: "Peri Peri Momo", diet: "veg", momo: { steam: "₹90", fried: "₹100", cheese: "₹110", tandoori: "₹130" } },
    ],
  },
];
