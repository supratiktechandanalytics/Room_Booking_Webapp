import { useRef, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import axios from "../../../axios";
import useAuth from "../../../hooks/useAuth";
import HotelForm from "./HotelForm";
const AddHotel = function (props) {
  const history = useHistory();
  const [auth] = useAuth();

  const { url } = useRouteMatch();
  const submit = async form => {
    const res = await axios.post(`/hotels.json?auth=${auth.token}`, form);
    history.push("/profil/hotele");
  };
  return (
    <div className="card">
      <div className="card-header">Dodaj hotel</div>
      <div className="card-body">
        <HotelForm buttonText="zapisz" onSubmit={submit} />
      </div>
    </div>
  );
};

export default AddHotel;
