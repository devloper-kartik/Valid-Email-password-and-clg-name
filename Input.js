import classes from "./Input.module.css";


const Input=(props)=>{
    return (<div
        className={`${classes.control} ${
          props.isVaild === false ? classes.invalid : ""
        }`}
      >
        <label htmlFor={props.type}>{props.label}</label>
        <input
          type={props.type}
          id={props.type}
          value={props.value}
          onChange={props.ChangeHandler}
          onBlur={props.ValidHandler}
        />
      </div>);
}

export default Input;

