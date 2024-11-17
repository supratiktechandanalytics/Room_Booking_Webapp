const Fragment = props => {
 return(
    <div className={props.className}>
    {props.children}; 
    </div>
 );
}
    //komponent przyjumje jakies propsy oraz wraca props.children

export default Fragment;