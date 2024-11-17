import { useContext } from 'react';
import ThemeContext from '../../context/themeContext'

function Footer(props){
    const theme = useContext(ThemeContext)
return(
   
<div className={`text-center margin-3 text-${theme.color}`}>
stopka @2021
</div>

)
}
export default Footer;