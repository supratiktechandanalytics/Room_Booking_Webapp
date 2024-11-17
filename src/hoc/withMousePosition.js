import React from "react"

const withMousePosition = (WrappedComponent) =>
{

class Hoc extends React.Component {
  state = {
      x:0,
      y:0
  };


//jesli komponent zostal zamontowany zczytaj pozycje myszy
componentDidMount(){
  document.body.addEventListener('mousemove',this.UpdateMousePosition.bind(this))
}

UpdateMousePosition = (e) => {
this.setState({
  x:e.pageX,
  y:e.pageY
});

}

  //renderuje komponent ktory pobieram, a w nim musze cos zwrocic
    render(){
      return (
          <WrappedComponent
           mouseX = {this.state.x}
           mouseY = {this.state.y}
          {...this.props} />
      );
  }
}
return Hoc;
}

export default withMousePosition;