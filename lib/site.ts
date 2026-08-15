export const site = {
  name: "Yajur Fire Bowl",
  hindiName: "यजुर",
  tagline: ["Chinese", "Tandoor", "Momos"],
  owner: "Rahul Panchal",
  phone: "+919870760205",
  phoneDisplay: "98707 60205",
  email: "yajur.firebowl@gmail.com",
  hours: "11AM – 11PM",
  hoursNote: "Open daily",
  partyOrders: "We are happy to take party orders",
  partners: ["Swiggy", "Zomato"] as const,
  address: {
    name: "Yajur Fire Bowl",
    lines: [
      "Yajur Fire Bowl",
      "Chinese · Tandoor · Momos",
    ],
    mapsQuery: "Yajur Fire Bowl",
  },
};

export function mapsUrl(query = site.address.mapsQuery) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
