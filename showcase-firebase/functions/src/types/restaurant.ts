// "id":"5WmWRzIbF7ilJcigW7Vx",
// "url":"https://omochikaeri.com/r/5WmWRzIbF7ilJcigW7Vx",
// "info":{
//    "name":"あぶり料理の権十楼",
//    "ownerName":"大橋　勝秀",
//    "introduction":"",
//    "location":{
//       "lng":138.9369517,
//       "lat":37.6501465
//    },
//    "url":"http://gonjyurou.com/",
//    "phoneNumber":"0256468093htto"
// },
// "address":{
//    "zip":"9591232",
//    "state":"新潟県",
//    "city":"燕市井土巻",
//    "streetAddress":"3丁目171番地"
// },
// "images":{
//    "cover":"https://firebasestorage.googleapis.com/v0/b/ownplate-jp.appspot.com/o/images%2Frestaurants%2F5WmWRzIbF7ilJcigW7Vx%2Fx017Hxp9vINE1CJqRE7fu9Wxb6w1%2Fresize%2F600%2Fcover.jpg?alt=media&token=7de61208-f90f-409c-a651-ea8faecfcd67",
//    "profile":"https://firebasestorage.googleapis.com/v0/b/ownplate-jp.appspot.com/o/images%2Frestaurants%2F5WmWRzIbF7ilJcigW7Vx%2Fx017Hxp9vINE1CJqRE7fu9Wxb6w1%2Fresize%2F600%2Fprofile.jpg?alt=media&token=c909353f-835b-4573-853f-d9101c2bd084"
// },

type RestaurantLocation = {
  lat: number;
  lng: number;
};

type RestaurantAddress = {
  zip: string;
  state: string;
  city: string;
  streetAddress: string;
};

type RestaurantImages = {
  cover: string;
  profile: string;
};

type RestaurantInfo = {
  name: string;
  ownerName: string;
  introduction?: string;
  location: RestaurantLocation;
};

type OpenTime = {
  start: string;
  end: string;
};

type BusinessDayItem = {
  day: string;
  name: string;
  isOpen: boolean;
  openTime: OpenTime[];
};

export type Restaurant = {
  id?: string;
  source: "omochikaeri" | "user-created";
  url?: string;
  info: RestaurantInfo;
  address: RestaurantAddress;
  images: RestaurantImages;
  businessDay: BusinessDayItem[];
};
