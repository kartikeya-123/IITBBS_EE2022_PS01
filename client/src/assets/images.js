import SportsImage from "./sport.jpg";
import CricketImage from "./cricket.jfif";
import FootballImage from "./football.jfif";
import BadmintonImage from "./badminton.jfif";

const imageMap = new Map();
imageMap.set("Sport", SportsImage);
imageMap.set("Cricket", CricketImage);
imageMap.set("Badminton", BadmintonImage);
imageMap.set("Football", FootballImage);
imageMap.set("other", CricketImage);

const getImage = (name) => {
  if (imageMap.has(name)) {
    return imageMap.get(name);
  } else return imageMap.get("other");
};

export default getImage;
