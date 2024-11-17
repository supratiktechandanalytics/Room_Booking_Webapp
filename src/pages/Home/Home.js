import React, { useCallback, useContext, useEffect, useState } from "react";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import LastHotel from "../../components/Hotels/LastHotel/LastHotel";
import Hotels from "../../components/Hotels/Hotels";
import BestHotel from "../../components/BestHotel/BestHotel";
import ReducerContext from "../../context/reducerContext";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import { reducer } from "../../reducer";
import useStateStorage from "../../hooks/useStateStorage";
import axios from "../../axios";
import { objectToArrayWithId } from "../../helpers/objects";
import useAuth from "../../hooks/useAuth";

export default function Home(props) {
  useWebsiteTitle("Strona glówna");
  const [loading, setLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [lastHotel, setLastHotel] = useStateStorage("last-hotel", null);
  const [auth] = useAuth();
  const getBestHotel = () => {
    if (hotels.length < 2) {
      return null;
    } else {
      return hotels.sort((a, b) => (a.rating > b.rating ? -1 : 1))[0];
    }
  };

  const openHotel = hotel => {
    console.log("set last hotel");
    setLastHotel(hotel);
  };
  const removeLastHotel = () => {
    setLastHotel(null);
  };
  const fetchHotels = async () => {
    try {
      const res = await axios.get("/hotels.json");
      console.log(res.data);
      const newHotel = objectToArrayWithId(res.data).filter(
        hotel => hotel.status === "1"
      );
      console.log(newHotel);
      setHotels(newHotel);
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchHotels();
  }, []);

  return loading ? (
    <LoadingIcon />
  ) : (
    <>
      {lastHotel ? (
        <LastHotel {...lastHotel} onRemove={removeLastHotel} />
      ) : null}

      {getBestHotel() ? <BestHotel getHotel={getBestHotel} /> : null}
      <Hotels onOpen={openHotel} hotels={hotels} />
    </>
  );
}
