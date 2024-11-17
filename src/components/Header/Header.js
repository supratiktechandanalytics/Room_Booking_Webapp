import React from 'react';
import styles from './Header.module.css';
//import Searchbar from '../UI/Searchbar/Searchbar'
import withMousePosition from '../../hoc/withMousePosition';

function Header(props){
    const paralaxStyles = {
        transform: `translate(
            ${props.mouseX / -50}px,
            ${props.mouseY / 150}px
            )`
    };
    return (
        //dodanie nowej klasy css
        <header className = {` ${styles.header} `}>
        <div 
        className={styles.headerImage}
        style={paralaxStyles}
        ></div>
    {props.children}
    </header>    
    
    );
}
export default withMousePosition(Header);

//styles.header tak jakbym uzywał zmiennej jss