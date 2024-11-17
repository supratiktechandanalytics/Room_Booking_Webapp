import ThemeContext from "../../../context/themeContext"

export default function LoadingIcon(props)
{
    return(
        <div className="text-center">
    <ThemeContext.Consumer>{
        ({color}) =>
        <div className={`spinner-border m-5 text-${color}`} role="status">
   
  <span className="sr-only">Ładuje...</span>
</div>
}</ThemeContext.Consumer>
</div>
    )
}