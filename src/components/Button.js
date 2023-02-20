function Button(props) {
  return (
    <button className="simple--button" type="button" onClick={props.handleClick}>{props.text}</button>
  );
}

export default Button;