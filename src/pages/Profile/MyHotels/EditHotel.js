import { useEffect, useRef, useState } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import HotelForm from "./HotelForm";
const EditHotel = function (props) {
  const [auth] = useAuth();
  const [hotel, setHotel] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  const submit = async form => {
    const res = await axios.patch(
      `/hotels/${id}.json?auth=${auth.token}`,
      form
    );
    history.push("/profil/hotele");
  };

  const fetchHotel = async () => {
    const res = await axios.get(`/hotels/${id}.json`);
    const hotelData = res.data;
    delete hotelData.user_id;
    delete hotelData.rating;
    setHotel(hotelData);
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  return (
    <div className="card">
      <div className="card-header">Edytuj hotel</div>
      <div className="card-body">
        <HotelForm hotel={hotel} buttonText="zapisz" onSubmit={submit} />
      </div>
    </div>
  );
};

export default EditHotel;
