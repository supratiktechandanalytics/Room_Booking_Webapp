import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ThemeContext from "../../../context/themeContext";
import Link from "react-router-dom";
import { withRouter } from "react-router";

function Searchbar(props) {
  const [term, setTerm] = useState("");
  //const { match, location, history } = props; mozna zastosowac tez taki zapis
  const search = () => {
    //props.onSearch(term);
    props.history.push(`/wyszukaj/${term}`);
  };

  const onKeyDownHander = e => {
    if (e.key === "Enter") {
      search();
    }
  };
  const theme = useContext(ThemeContext);
  const inputRef = useRef(null);
  const focusInput = () => {
    inputRef.current.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  //document.querySelector('.search').focus();
  return (
    <div className="d-flex">
      <input
        ref={inputRef}
        onChange={e => setTerm(e.target.value)}
        onKeyDown={onKeyDownHander}
        className="form-control"
        type="text"
        placeholder="wprowadz nazwe..."
      />

      <button onClick={search} className={`ml-1 btn btn-${theme.color}`}>
        Szukaj
      </button>
    </div>
  );
}

export default withRouter(Searchbar);
