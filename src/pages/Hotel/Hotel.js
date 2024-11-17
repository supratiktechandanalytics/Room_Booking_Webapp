import axios from "../../axios";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingIcon from "../../components/UI/LoadingIcon/LoadingIcon";
import { objectToArrayWithId } from "../../helpers/objects";
import useWebsiteTitle from "../../hooks/useWebsiteTitle";
import useAuth from "../../hooks/useAuth";
function Hotel(props) {
  const [hotel, setHotels] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const setTitle = useWebsiteTitle();
  const [auth] = useAuth();
  const [rating, setRating] = useState(5);
  const history = useHistory();
  const fetchHotel = async () => {
    try {
      const res = await axios.get(`/hotels/${id}.json`);
      //  const newHotel = objectToArrayWithId(res.data);
      setHotels(res.data);
      setTitle(`Hotel ${res.data.name}`);
      // console.log(hotels);
    } catch (ex) {
      console.log(ex);
    }

    setLoading(false);
  };
  //console.log(params)
  useEffect(() => {
    fetchHotel();
  }, []);

  const rateHotel = async () => {
    try {
      const res = await axios.put(
        `/hotels/${id}/rating.json?auth=${auth.token}`,
        rating
      );
      history.push("/");
    } catch (ex) {
      console.log(ex);
    }

    setLoading(false);
  };

  if (loading) return <LoadingIcon />;

  return (
    <div className="card">
      <div className="card-header font-weight-bold  ">
        <h3>Hotel: {hotel.name}</h3>
      </div>
      <div className="card-body d-flex flex-column align-items-center">
        <img
          src={`https://placeimg.com/420/18${Math.floor(
            Math.random() * 10
          )}/arch`}
          alt=""
          className="img-fluid img-thumbnail mb-4"
        />
        <div className="card-text">
          <p>
            Miejscowość:<b> {hotel.city}</b>
          </p>
          <p>Miejsca wolne: {hotel.rooms}</p>
          <p>{hotel.description}</p>
          <p>Wyposażenie</p>
          <ul>
            {hotel.features.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h4>Ocena: {props.rating ?? "brak ocen"}</h4>
        </div>
      </div>
      {auth ? (
        <div className="card-footer  d-flex flex-column align-items-center">
          <div className="form-group row mt-4">
            <div className="col">
              <select
                value={rating}
                onChange={e => setRating(e.target.value)}
                className="form-control form-select-lg mb-3"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="col">
              <button onClick={rateHotel} className="btn btn-info">
                Oceń hotel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Hotel;
//align-items-center d-flex justify-content-center
