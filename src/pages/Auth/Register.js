import { useState } from "react";
import Input from "../../components/input/Input";
import LoadingButton from "../../components/UI/LoadingButton/LoadingButton";
import { validate } from "../../helpers/validations";
import axios from "../../axios-auth";
import axiosFresh from "axios";
import useAuth from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
export default function Register(props) {
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const history = useHistory();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: {
      value: "",
      error: "",
      showError: false,
      rules: ["required", "email"],
    },
    password: {
      value: "",
      error: "",
      showError: false,
      rules: ["required"],
    },
  });
  const submit = async e => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post("accounts:signUp", {
        email: form.email.value,
        password: form.password.value,
        returnSecureToken: true,
      });
      console.log(res);
      console.log(res.data.email);
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.localId,
      });
      history.push("/");
    } catch (ex) {
      console.log(ex.response);
      let response =
        ex.response.data.error.message == "EMAIL_EXISTS"
          ? "Konto o podanym adresie mailowym już istnieje"
          : ex.response.data.error.message ==
            "WEAK_PASSWORD : Password should be at least 6 characters"
          ? "słabe hasło, wymagane co najmniej 6 znaków"
          : ex.response.data.error.message;
      setError(response);
      setLoading(false);
    }
  };
  const valid = !Object.values(form)
    .map(input => input.error)
    .filter(x => x).length;
  const changeHandler = (value, fieldName) => {
    const error = validate(form[fieldName].rules, value);
    setForm({
      ...form,
      [fieldName]: {
        ...form[fieldName],
        value,
        showError: true,
        error: error,
      },
    });
  };
  //jesli jestem zalogowany - to nie moge sie rejestrowac, robię od razu przekierowanie
  // na stronę główną
  if (auth) {
    history.push("/");
  }

  return (
    <div className="card">
      <div className="card-header">Rejestracja</div>
      <div className="card-body">
        <form onSubmit={submit}>
          <Input
            label="Email"
            type="email"
            value={form.email.value}
            onChange={value => changeHandler(value, "email")}
            error={form.email.error}
            showError={form.email.showError}
          />

          <Input
            label="Hasło"
            type="password"
            value={form.password.value}
            onChange={value => changeHandler(value, "password")}
            error={form.password.error}
            showError={form.password.showError}
          />
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <div className="text-right">
            <LoadingButton
              loading={loading}
              disabled={!valid}
              className="btn-success"
            >
              Rejestruj !
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
}
