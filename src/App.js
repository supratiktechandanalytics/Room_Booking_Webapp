import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu'
import Hotels from './components/Hotels/Hotels'
import React, { useCallback, useEffect, useReducer } from 'react';
import LoadingIcon from './components/UI/LoadingIcon/LoadingIcon';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer'
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import AuthContext from './context/authContext';
import BestHotel from './components/BestHotel/BestHotel';
import InspiringQuote from './components/InspiringQuotes/InspiringQuote';
import useStateStorage from './hooks/useStateStorage'
import LastHotel from './components/Hotels/LastHotel/LastHotel';
//tutaj jest przechowywany stan mojego koloru
/*
class App extends Component {
  //przypisujemy context ,te pole musi sie tak nazywazac contextType

 
 //stan poczatkowy hotels: this.hotels
  state = {
      hotels: [],
      loading:true,
      theme:'primary', // jak dodałem contextAPI to można to w sumie usunac
      isAuthenticated:false
  }
//powinna byc nazwa w sumie onSearch
}
*/
const backendHotels = [
  {
    id:1,
    name:'Pensjonat po gruszą',
    city:'Wieliczka',
    rating:8.5,
    description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image:''
  },
  {
  id:2,
  name:'Apartamenty dębowe wzgórze',
  city:'Myślenice',
  rating:7.5,
  description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  image:''
  }

 ];

 const reducer = (state,action)=>{
   switch(action.type) {
     case 'change-theme':
       return{
      ...state,
      theme:state.theme === 'danger' ? 'primary' : 'danger'
      };
      case 'set-hotels':
      return{
      ...state,
      hotels:action.hotels
      };
      case 'set-loading':
        return {
          ...state,
          loading:action.loading
        }
        case 'login':
          return {
            ...state,
            isAuthenticated:true
          }
          case 'logout':
            return{
              ...state,
              isAuthenticated:false
            }
   default:
     throw new Error('nie ma takiej akcji: ' + action.type)
      }
//reducer zwraca stan
 // return state; //wartosc po zmianie stanu
}; 
const initialState = {
  theme: 'danger',
  hotels:[],
  loading:true,
  isAuthenticated:false
}

function App(){
const [storage,setStorage] = useStateStorage('klucz','jakas wartosc startowa')
const [lastHotel,setLastHotel]=useStateStorage('last-hotel',null);
const [state,dispatch] = useReducer(
  reducer
  ,initialState)


const getBestHotel = useCallback( () => {
if(state.hotels.length < 2){
return null;
} else {
  return state.hotels.sort((a,b)=>a.rating>b.rating ? -1 : 1 )
  [0];
}
},[state.hotels]
)

const removeLastHotel = () =>
{
  setLastHotel(null)
}

//a-element pierwszy ktory bedzie sorotwany,b-element nastepny
 const searchHandler = (term) => {
    const newHotels = [...backendHotels]
    .filter(x=>x.name.toLowerCase()
    .includes(term.toLowerCase()));
    //setHotels(newHotels)
     dispatch({type:'set-hotels',hotels:newHotels})  
  }
 //tutaj bede przekazywal ktory hotel byl otwarty
  const openHotel = (hotel) =>
  {
   setLastHotel(hotel);
console.log(hotel);  
}

  useEffect(()=>
  { setTimeout(()=>{
    //setHotels(backendHotels);
    //setLoading(false);
    dispatch({type:'set-hotels',hotels:backendHotels})
    dispatch({type:'set-loading',loading: false})
   } ,1000);
  
  },[])

  const header = (<Header>
   
   <InspiringQuote />
    <Searchbar 
    onSearch = {(term)=>searchHandler(term)}
    />
  <ThemeButton
  />
    </Header>);
    const menu=(<Menu
      />)
  const content = ( state.loading ? (
    <LoadingIcon
    />
  )
: 
<div>
{lastHotel ? <LastHotel
{...lastHotel}
onRemove={removeLastHotel}
/> : null}

{getBestHotel() ? <BestHotel
getHotel={getBestHotel}
/> : null}
<Hotels 
onOpen={openHotel}
hotels = {state.hotels} />
</div>

);

const footer = (<Footer />);


  return( <AuthContext.Provider value = {{
    isAuthenticated:state.isAuthenticated,
    login:()=> dispatch({type:'login'}),
    logout:()=>dispatch({type:'logout'})
  }}>
  
  <ThemeContext.Provider value={{
    color: state.theme,
    changeTheme :() =>{ dispatch({type:'change-theme'})}
  }}>
  
  <Layout
  header={header }
  menu={menu }
  content={ content}
  footer={footer}
  />   
  </ThemeContext.Provider>
  </AuthContext.Provider>);
}


//44.-podpinam this pod moj obecny komponent app -tak by w funkcji searchHandler this odnosil sie do app
//44 - tak było  <Header onSearch = { this.searchHandler.bind(this)} />  ale zaminienilem na latwiejsza wersje
//header on search-przekazujemy parametr on search
//i przenoszę tutaj searchbar z headeara
//55 linijka było <Header onSearch = { this.searchHandler} /> 
export default App;
