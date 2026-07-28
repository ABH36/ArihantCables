export interface Location {
  label: string;
  name: string;
  icon: string;
  address: string;
  phones: string[];
  mapUrl: string;
}

export const locations: Location[] = [
  {
    label: "Shop Address",
    name: "ARIHANT CABLES",
    icon: "icons/icons8-google-maps-100.png",
    address: "27, Shreenath Bhavan, 6/12 Picket X Road, Lohar Chawl, Mumbai – 400 002",
    phones: [
      "022-22084443 / 22084447",
      "022-22084450 / 22069420",
      "022-22081673 (Intercom: *257 / *744)",
    ],
    mapUrl: "https://maps.app.goo.gl/MGesV8scY7MJELeDA",
  },
  {
    label: "Godown Address",
    name: "RAJ CABLE WAREHOUSE",
    icon: "icons/icons8-warehouse-100.png",
    address:
      "Haribhau Patil Compound, K-square Prakhyat Industrial Park, Opposite Urban Tadka Hotel, Mumbai-Nashik Highway, Village Kurund, Padgha Bhiwandi – 421101",
    phones: ["9702333505 / 9821155960 / 9930543276"],
    mapUrl: "https://maps.app.goo.gl/8Eyev7QJfC5JmEJU7",
  },
];
