import { Link } from "react-router-dom";

const styles = {
  color: "black",
};

function LastHotel(props) {
  //const [hotel,setHotel] = useStateStorage(null);

  //if(!props) return null;
  return (
    <div className="card mb-3 bg-light">
      <div className="card-header">
        Ostatnio oglądana oferta, dalej zainteresowany ?
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title">{props.name}</h5>
          <span className="badge badge-light">{props.city}</span>
        </div>
        <div
          className="ml-auto d-flex justify-content-between"
          style={{ width: "100px" }}
        >
          <Link
            to={`/hotele/${props.id}`}
            className=" btn btn-sm   btn-primary "
            href="#"
          >
            Tak!
          </Link>
          <button className=" btn btn-sm  btn-danger " onClick={props.onRemove}>
            Nie!
          </button>
        </div>
      </div>
    </div>
  );
}
export default LastHotel;
