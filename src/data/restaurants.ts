export interface Restaurant {
  id: number;
  name: string;
  address: string;
  image: string;
  logo: string;
  rating: number;
  tags: string[];
  category: string;
}

export const restaurants: Restaurant[] = [
  {
    id: 1,
    name: "McDonald's",
    address: "1520 N Naper Blvd, Naperville, IL 60563",
    image: "https://images.unsplash.com/photo-1619881589928-a0c2f5a4a0cc?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/200px-McDonald%27s_Golden_Arches.svg.png",
    rating: 4.2,
    tags: ["Fast Food", "Burgers", "Value"],
    category: "fast-food"
  },
  {
    id: 2,
    name: "Chipotle",
    address: "22 E Chicago Ave, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Chipotle_Mexican_Grill_logo.svg/200px-Chipotle_Mexican_Grill_logo.svg.png",
    rating: 4.5,
    tags: ["Mexican", "Bowls", "Fresh"],
    category: "mexican"
  },
  {
    id: 3,
    name: "Raising Canes",
    address: "698 S Rte 59, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Raising_Cane%27s_Chicken_Fingers_logo.svg/200px-Raising_Cane%27s_Chicken_Fingers_logo.svg.png",
    rating: 4.7,
    tags: ["Chicken", "Fast Food"],
    category: "chicken"
  },
  {
    id: 4,
    name: "Culvers",
    address: "1515 N Naper Blvd, Naperville, IL 60563",
    image: "https://images.unsplash.com/photo-1552782592-cad57c10099c?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Culver%27s_Logo_2018.svg/200px-Culver%27s_Logo_2018.svg.png",
    rating: 4.6,
    tags: ["Fast Food", "Burgers", "Ice Cream"],
    category: "fast-food"
  },
  {
    id: 5,
    name: "Chick-Fil-A",
    address: "4435 Fox Valley Center Dr, Aurora, IL 60504",
    image: "https://images.unsplash.com/photo-1513342791620-b106dc487c94?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chick-fil-A_Logo.svg/200px-Chick-fil-A_Logo.svg.png",
    rating: 4.8,
    tags: ["Chicken", "Fast Food", "Sandwiches"],
    category: "chicken"
  },
  {
    id: 6,
    name: "Five Guys",
    address: "22 E Chicago Ave Suite 104, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1619881589928-a0c2f5a4a0cc?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Five_Guys_logo.svg/200px-Five_Guys_logo.svg.png",
    rating: 4.6,
    tags: ["Burgers", "Fries", "Fast Food"],
    category: "fast-food"
  },
  {
    id: 7,
    name: "MOD Pizza",
    address: "103 S Washington St Suite 113, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/MOD_Pizza_logo.svg/200px-MOD_Pizza_logo.svg.png",
    rating: 4.5,
    tags: ["Pizza", "Custom", "Fast Casual"],
    category: "pizza"
  },
  {
    id: 8,
    name: "Noodles & Company",
    address: "207 S Washington St, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Noodles_%26_Company_logo.svg/200px-Noodles_%26_Company_logo.svg.png",
    rating: 4.3,
    tags: ["Pasta", "Asian", "Salads"],
    category: "fast-food"
  },
  {
    id: 9,
    name: "Starbucks",
    address: "203 S Main St, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1577995216218-5523c5c71238?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png",
    rating: 4.7,
    tags: ["Coffee", "Drinks", "Snacks"],
    category: "drinks"
  },
  {
    id: 10,
    name: "Crumbl",
    address: "1504 N Naper Blvd, Naperville, IL 60563",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Crumbl_Cookies_logo.svg/200px-Crumbl_Cookies_logo.svg.png",
    rating: 4.8,
    tags: ["Cookies", "Desserts", "Bakery"],
    category: "desserts"
  },
  {
    id: 11,
    name: "Insomnia Cookies",
    address: "22 E Chicago Ave suite 109, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=400&h=250",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Insomnia_Cookies_Logo.svg/200px-Insomnia_Cookies_Logo.svg.png",
    rating: 4.7,
    tags: ["Cookies", "Desserts", "Late Night"],
    category: "desserts"
  },
  {
    id: 12,
    name: "Uni Uni Boba",
    address: "26 W Jefferson Ave, Naperville, IL 60540",
    image: "https://images.unsplash.com/photo-1558857563-b371033873b8?auto=format&fit=crop&w=400&h=250",
    logo: "https://images.unsplash.com/photo-1527006925023-b7d7f3b5e914?auto=format&fit=crop&w=200&h=200",
    rating: 4.6,
    tags: ["Boba", "Tea", "Drinks"],
    category: "drinks"
  }
];