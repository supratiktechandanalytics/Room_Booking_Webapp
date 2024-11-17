import { useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import LoadingButton from "../../components/UI/LoadingButton/LoadingButton";
import axios from "../../axios-auth";
import axiosFresh from "axios";
import { useHistory } from "react-router-dom";
export default function Login(props) {
  const [auth, setAuth] = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState();
  const history = useHistory();
  const [valid, setValid] = useState(null);
  const [error, setError] = useState("");
  const submit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("accounts:signInWithPassword", {
        email: email,
        password: password,
        returnSecureToken: true,
      });
      console.log(res);
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      history.push("/");
    } catch (ex) {
      let response =
        ex.response.data.error.message == "EMAIL_NOT_FOUND"
          ? "Nie istnieje konto o podanym adresie mailowym"
          : ex.response.data.error.message == "INVALID_PASSWORD"
          ? "Błędne hasło"
          : ex.response.data.error.message;
      setError(response);
    }

    //   setTimeout(() => {
    //     if (true) {
    //       console.log("ello");
    //       setAuth(true);
    //       history.push("/");
    //     } else {
    //       setValid(false);
    //       setPassword("");
    //     }
    //
    //   }, 500);
    setLoading(false);
  };
  if (auth) {
    history.push("/");
  }
  return (
    <div>
      <h2>Strona logowania</h2>

      {valid === false ? (
        <div className="alert alert-danger">
          Nie poprawne dane do logowania{" "}
        </div>
      ) : null}
      <form onSubmit={submit} className="form-group">
        <label> Wprowadź adres mailowy</label>
        <input
          className="form-control"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="twojmail@example.pl"
        />
        <label>Wprowadź hasło</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="*****"
        />
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <LoadingButton className="btn-primary" loading={loading}>
          Zaloguj
        </LoadingButton>
      </form>
    </div>
  );
}
