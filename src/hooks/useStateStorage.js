import { useState } from "react";

function useStateStorage(key,defaultValue)
{
const [state,setState]=useState(()=>{
    const storageValue = window.localStorage.getItem(key);

    if(storageValue){
        return JSON.parse(storageValue)
    }else{
    return defaultValue;
    }
})


//jesli taka wartosc jeszcze nie istnieje to uzywamy po prostu state

const setValue = val => {
setState(val);
window.localStorage.setItem(key,JSON.stringify(val));
}

return [state,setValue];
}

//funkcja przyjmuje jakis klucz - nazwa pod jaka dane beda zapisane w localStorage
//defaultValue- ta wartość poczatkowa
export default useStateStorage