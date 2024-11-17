import { useEffect, useState } from "react";
import LoadingButton from "../../../components/UI/LoadingButton/LoadingButton";
import { validateEmail } from "../../../helpers/validations";
import useAuth from "../../../hooks/useAuth";
import axios from "../../../axios-auth";
export default function ProfileDetails(props) {
  const [auth, setAuth] = useAuth();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(auth.email);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const buttonDisabled = Object.values(errors).filter(x => x).length;

  const submit = async e => {
    e.preventDefault();
    setLoading(true);
    const data = {
      idToken: auth.token,
      email: email,
      returnSecureToken: true,
    };
    if (password) {
      data.password = password;
    }
    try {
      const res = await axios.post("accounts:update", data);
      setAuth({
        email: res.data.email,
        token: res.data.idToken,
        userId: res.data.userId,
      });
      setSuccess(true);
    } catch (ex) {
      console.log(ex.response);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Niepoprawny mail" });
    }
  }, [email]);

  useEffect(() => {
    if (password.length >= 4 || password.length === 0) {
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({ ...errors, password: "Wymagane min. 4 znaki" });
    }
  }, [password]);

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`form-control ${
            errors.email ? "is-invalid" : "is-valid"
          } `}
        />
        <div className="invalid-feedback">{errors.email}</div>
        <div className="valid-feedback">Wszystko gra!</div>
      </div>
      <div className="form-group">
        <label>Hasło</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className={`form-control ${errors.password ? "is-invalid" : " "}`}
        />
        <div className="invalid-feedback">{errors.password}</div>
      </div>
      {success ? (
        <div className=" mt-2 alert alert-success">Zaaktualizowano dane</div>
      ) : null}
      <LoadingButton loading={loading} disabled={buttonDisabled}>
        Zapisz
      </LoadingButton>
    </form>
  );
}
