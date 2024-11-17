import { useEffect, useState } from "react";
import moment from 'moment';

function BestHotel(props){
const endTime = moment().add(23,'minutes').add(34,'seconds')
const Hotel = props.getHotel();
const [time,setTime]=useState('');
let interval = null;


//componentDidMount,jeśli jako argument podam pustą tablice
useEffect(()=>{
interval=setInterval(() => {
    const leftTime = -moment().diff(endTime)/1000;
    const minutes = Math.floor(leftTime / 60);
    const seconds = Math.floor(leftTime % 60);
    setTime(`${minutes} minut, ${seconds} sekund`);
   // console.log(leftTime);
}, 1000)

//to dziala jak componentDidUnmount() - czyli jak komponent sie wymontuje
//zniknie to wykona się ta funkcja wsrodku
return () => {
clearInterval(interval);
}
},[]);

if(!Hotel) return null;

return(
<div className="card bg-success text-white">
<div className="card-header">
Najlepsza oferta</div>
<div className="card-body">
<div className="d-flex justify-content-between">
<h5 className="card-title">{Hotel.name}</h5>
<p>Ocena: {Hotel.rating}</p>
</div>
<p>Do końca oferty pozostało: {time}</p>
<a className="btn btn-sm btn-light " href="#">Pokaż</a>
</div>
</div>
);
}


export default BestHotel;