import { useEffect, useLayoutEffect, useState } from "react";

const quotes = [
    '„Mówić w danym języku to stawić czoło światu i kulturze.” – Frantz Fanon',
    '„Nic tak nie rozwija inteligencji jak podróżowanie” – Emile Zola',
    '„Należy podróżować, by się czegoś nauczyć” – Mark Twain',
    '„Zwiedzaj świat. To lepsze niż najpiękniejszy sen” – Ray Bradbury',
    ' „Inwestycja w podróże to inwestycja w siebie” – Matthew Karsten' 
]



const styles = {
position:'absolute',
top: '20px',
left:0,
right:0,
textAlign:'center',
color: 'black',
fontStyle:'italic'
}



function InspiringQuote(props) {

const [Quote,setQuote]=useState('Wczytywanie cytatu...');
const [loading,setLoading] = useState(true);

useEffect(()=>{
    //...pobieranie
        setLoading(false);
    },[])
    
    useLayoutEffect(()=>{
    setQuote(quotes[Math.floor(Math.random()*quotes.length)])
    },[loading])
    
    return(
<p style={styles}> {Quote}</p>

    );
}

export default InspiringQuote;