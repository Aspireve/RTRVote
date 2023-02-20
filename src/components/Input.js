function Input(props) {
    return (
        <input className="card--input" type = {props.type} name = {props.name} placeholder = {props.text} onChange={props.onchange} value={props.val} autoComplete="on"></input>
    );
  }
  
  export default Input;