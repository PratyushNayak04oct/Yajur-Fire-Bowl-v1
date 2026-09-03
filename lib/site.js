export const site = {
  name: "Yajur Fire Bowl",
  hindiName: "यजुर",
  tagline: ["Chinese", "Tandoor", "Momos"],
  owner: "Rahul Panchal",
  phone: "+919987205605",
  phoneDisplay: "99872 05605",
  phones: [
    { tel: "+919987205605", display: "99872 05605" },
    { tel: "+919870760205", display: "98707 60205" },
  ],
  email: "yajur.firebowl@gmail.com",
  hours: "11AM – 12AM",
  hoursNote: "Open daily",
  partyOrders: "We are happy to take party orders",
  partners: ["Swiggy", "Zomato"],
  address: {
    name: "Yajur Fire Bowl",
    lines: ["Yajur Fire Bowl", "Mumbai"],
    mapsQuery: "Yajur Fire Bowl",
    mapsUrl: "https://www.google.com/maps/place/Yajur+Fire+Bowl/@19.0696697,72.8969432,17z",
    embed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.8650585670594!2d72.8969432!3d19.0696697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9000042b4f1%3A0xcd076b014349b77c!2sYajur%20Fire%20Bowl!5e0!3m2!1sen!2sin!4v1788452650431!5m2!1sen!2sin",
  },
};

export function mapsUrl() {
  return site.address.mapsUrl;
}
