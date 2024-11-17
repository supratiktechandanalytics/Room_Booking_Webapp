import { useContext } from "react";
import AuthContext from "../context/authContext";

function useAuth() {
  const authContext = useContext(AuthContext); //pobieram wartosc z kontekstu
  const auth = authContext.user; //i teraz mozemy zwracac auth na podstawie authContext
  //czyli pobieram wartosc z kontekstu
  const setAuth = user => {
    if (user) {
      authContext.login(user);
      window.localStorage.setItem("token-data", JSON.stringify(user));
      //localStorage-odpowiednik ciasteczek,zapisuje pod kluczem token-data te dane
      //zapisanie do przegladarki tylko po to by w razie przelogowania miał cały czas te dane
    } else {
      authContext.logout();
      window.localStorage.removeItem("token-data");
      //po wylogowaniu usuwam token z localStorage(ciasteczek)
    }
  };

  return [auth, setAuth];
}

export default useAuth;
//nazwa jest bardzo wazna,jeśli jest use to react wie że to jest hook,
//natomiast nie narzucam nam wiecej jakis specjalnych wytycznych
