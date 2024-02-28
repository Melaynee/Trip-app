export const cities = [
  {
    name: "Tokyo",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTasSUoqJPe42ALurvaHlh9m4sMXgsxsPSx7RnBkhuE7w&s",
  },
  {
    name: "Lisbon",
    image: "https://www.brunswickgroup.com/media/8384/lisbon.jpg",
  },
  {
    name: "Berlin",
    image:
      "https://www.berlin.de/binaries/asset/image_assets/6274092/ratio_4_3/1684826673/800x600/",
  },
  {
    name: "Milan",
    image: "https://media.timeout.com/images/105984491/image.jpg",
  },
  {
    name: "London",
    image:
      "https://www.syracuse.edu/assets/original_images/london-large-image_07-29-202116-16-53.jpg",
  },
  {
    name: "Madrid",
    image:
      "https://a.cdn-hotels.com/gdcs/production133/d1207/7ad2d7f0-68ce-11e8-8a0f-0242ac11000c.jpg",
  },
  {
    name: "Kyiv",
    image:
      "https://www.globsec.org/sites/default/files/styles/inline/public/2022-10/AdobeStock_237922991-scaled-e1666004413531.jpeg?itok=oRrVvn-5",
  },
  {
    name: "Los Angeles",
    image:
      "https://www.scoprilosangeles.com/f/estados-unidos/los-angeles/guia/los-angeles-m.jpg",
  },
  {
    name: "New York",
    image:
      "https://www.viaggi-usa.it/wp-content/uploads/2022/10/manhattan-new-york.webp",
  },
  {
    name: "Dubai",
    image:
      "https://assets.kerzner.com/api/public/content/22a13cd86bef48b28e9ff17642419a6c?v=abeba10a&t=w2880",
  },
];

export const getCity = (name: string) => {
  return cities.find((city) => city.name === name);
};
