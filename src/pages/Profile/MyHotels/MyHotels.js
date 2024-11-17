import { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import axios from "../../../axios";
import { objectToArrayWithId } from "../../../helpers/objects";
import useAuth from "../../../hooks/useAuth";
export default function MyHotels(props) {
  const { url } = useRouteMatch();
  const [auth] = useAuth();
  const [hotels, setHotels] = useState([]);
  const fetchHotels = async () => {
    try {
      const res = await axios.get("/hotels.json");

      const newHotel = objectToArrayWithId(res.data);
      setHotels(newHotel.filter(hotel => hotel.user_id === auth.userId)); //pobranie hoteli odpowiednich dla danego uzytkownika
    } catch (ex) {
      console.log(ex.response);
    }
  };
  useEffect(() => {
    fetchHotels();
  }, []);

  const deleteHandler = async id => {
    try {
      await axios.delete(`/hotels/${id}.json`);
      setHotels(hotels.filter(x => x.id !== id));
    } catch (ex) {
      console.log(ex.response);
    }
  };

  return (
    <div>
      {hotels ? (
        <table className="table">
          <thead>
            <th>Nazwa</th>
            <th>Status</th>
            <th>Opcje</th>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <tr>
                <td>{hotel.name}</td>
                <td>
                  {hotel.status == 1 ? (
                    <span className="badge bg-success">aktywny</span>
                  ) : (
                    <span className="badge bg-info">ukryty</span>
                  )}
                </td>
                <td>
                  <Link
                    to={`/profil/hotele/edytuj/${hotel.id}`}
                    className="btn btn-warning"
                  >
                    Edytuj
                  </Link>
                  <button
                    onClick={() => deleteHandler(hotel.id)}
                    className="btn btn-danger"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nie masz jeszcze żadnego hotelu </p>
      )}

      <Link to={`${url}/dodaj`} className="btn btn-primary">
        Dodaj hotel
      </Link>
    </div>
  );
}
