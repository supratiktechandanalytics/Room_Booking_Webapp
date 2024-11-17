import axios from "../../axios";
import { useParams } from "react-router-dom";
import { objectToArrayWithId } from "../../helpers/objects";
import Hotels from "../../components/Hotels/Hotels";
import { useEffect, useState } from "react";

function Search(props) {
  const { term } = useParams();
  const [hotels, setHotels] = useState([]);
  const searchHandler = async () => {
    //   const newHotels = [...backendHotels].filter(x =>
    //   x.name.toLowerCase().includes(term.toLowerCase())
    //);
    //setHotels(newHotels)
    //dispatch({ type: "set-hotels", hotels: newHotels });

    try {
      const res = await axios.get("/hotels.json");
      console.log(res.data);
      const newHotel = objectToArrayWithId(res.data).filter(hotel =>
        hotel.name.includes(term)
      );
      console.log(newHotel);
      setHotels(newHotel);
      // console.log(hotels);
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(() => {
    searchHandler();
  }, [term]);

  return (
    <div>
      <h2>Wyniki dla frazy "{term}":</h2>
      <Hotels hotels={hotels} />
    </div>
  );
}
export default Search;
