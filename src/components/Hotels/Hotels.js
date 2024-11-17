import React, { Component, PureComponent, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import Hotel from './Hotel/Hotel';
import styles from './Hotels.module.css';
//import ThemeContext from '../../context/themeContext';



const propTypes = {
 hotels: PropTypes.array.isRequired
};
const slowfunction = (count) =>{
return count;
}

function Hotels(props){

    const count = useMemo(()=>{
return slowfunction(props.hotels.length)
 },[props.hotels.length]);

        return(
            <div className={styles.container}>
            <h2 className={styles.title}>
            Oferty noclegow: Znalezione: {count}
            </h2>
            {props.hotels.map(ello => <Hotel 
                onOpen={props.onOpen}
                key={ello.id} {...ello} 
                />)} 
            </div>);
    
}
Hotels.propTypes = propTypes;

const areEqual = (prevProps,nextProps) => {
 return prevProps.hotels === nextProps.hotels;
    }

//ello.location = hotels.location
//21 this.props this-poniewaz jest to klasa
export default React.memo(Hotels,areEqual)