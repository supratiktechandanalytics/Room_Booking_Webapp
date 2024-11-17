import React, { useContext } from "react";
import styles from "./Hotel.module.css";
import PropTypes from "prop-types";
import ThemeContext from "../../../context/themeContext";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
//pola wymagane
const propTypes = {
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  //missing:PropTypes.bool.isRequired
};

//const defaultProps = {
//missing : 'to jest domyslny props'
//}

function Hotel(props) {
  const theme = useContext(ThemeContext);
  const [auth] = useAuth(); //jesli nie chce to nie musze pobierac drugiej wartosci setAuth

  const clickHandler = e => {
    //e.preventDefault()  // na razie próbujemy zatrzymać działanie tego linku by się strona nie odświeżyła
    if (props.onOpen) {
      props.onOpen(props);
    }
  };

  return (
    <div className={`card ${styles.hotel}`}>
      <div className="card-body">
        <div className="row">
          <div className="col-4">
            <img
              src={`https://placeimg.com/220/18${Math.floor(
                Math.random() * 10
              )}/arch`}
              alt=""
              className="img-fluid img-thumbnail"
            />
          </div>
          <div className="col-8">
            <div className="row">
              <div className="col">
                <p className={styles.title}>{props.name}</p>
                <span className="badge badge-light">{props.city}</span>
              </div>
              <div className="col text-right">
                <h5>Ocena: {props.rating ?? 0}</h5>

                <Link onClick={clickHandler} to={`/hotele/${props.id}`}>
                  Pokaż
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12">
            <p className={styles.description}>{props.description}</p>
            {auth ? (
              <p className="mt-2"> Dostepnosc: {props.rooms}</p>
            ) : (
              <p className="mt-2"> Dostepnosc: Zaloguj</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Hotel.propTypes = propTypes;
//Hotel.defaultProps = defaultProps;

export default Hotel;
