import React, { useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer=(state,action)=>{
  if(action.type==='ADD_EMAIL'){
    return {value:action.val,isVaild:action.val.includes('@')} 
  }
  if(action.type==='CHECK_EMAIL'){
    return {value:state.value,isVaild:state.value.includes('@')} 
  }
  return {value:'',isVaild:undefined}
};

const passwordReducer=(state,action)=>{
  if(action.type==='ADD_PASSWORD'){
    return {value:action.val,isVaild:action.val>=6};
  }
  if(action.type==='CHECK_PASSWORD'){
    return {value:state.value,isVaild:state.value>=6};
  }
  return {value:'',isVaild:undefined};
}

// const clgReducer=(state,action)=>{
//   if(action.type==='ADD_PASSWORD'){
//     return {value:action.val,isVaild:action.val>=6};
//   }
//   if(action.type==='CHECK_PASSWORD'){
//     return {value:state.value,isVaild:state.value>=6};
//   }
//   return {value:'',isVaild:undefined};
// }

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClg, setClg] = useState("");
  const [ClgIsValid, setCldValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer,{value:'',isVaild:undefined});
  const [passwordState,dispatchPassword]=useReducer(passwordReducer,{value:'',isVaild:undefined});
  useEffect(() => {
    setFormIsValid(
      emailState.isVaild &&
        passwordState.isVaild&&
        enteredClg.length > 3
    );
  }, [emailState,enteredClg,passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type:'ADD_EMAIL',val:event.target.value});
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type:'ADD_PASSWORD',val:event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmail({type:'CHECK_EMAIL'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'CHECK_PASSWORD'});
  };

  const ClgChangeHandler = (event) => {
    setClg(event.target.value);
  };

  const validateClgHandler = () => {
    setCldValid(enteredClg.length > 3);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            ClgIsValid === false ? classes.invalid : ""
          }`}
        >
          <label> College Name</label>
          <input
            type="text"
            onChange={ClgChangeHandler}
            onBlur={validateClgHandler}
          ></input>
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isVaild === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
