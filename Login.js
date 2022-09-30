import React, { useContext, useEffect, useReducer, useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../Context/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "ADD_EMAIL") {
    return { value: action.val, isVaild: action.val.includes("@") };
  }
  if (action.type === "CHECK_EMAIL") {
    return { value: state.value, isVaild: state.value.includes("@") };
  }
  return { value: "", isVaild: undefined };
};

const passwordReducer = (state, action) => {
  if (action.type === "ADD_PASSWORD") {
    return { value: action.val, isVaild: action.val >= 6 };
  }
  if (action.type === "CHECK_PASSWORD") {
    return { value: state.value, isVaild: state.value >= 6 };
  }
  return { value: "", isVaild: undefined };
};

// const clgReducer=(state,action)=>{
//   if(action.type==='ADD_PASSWORD'){
//     return {value:action.val,isVaild:action.val>=6};
//   }
//   if(action.type==='CHECK_PASSWORD'){
//     return {value:state.value,isVaild:state.value>=6};
//   }
//   return {value:'',isVaild:undefined};
// }

const Login = () => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredClg, setClg] = useState("");
  const [ClgIsValid, setCldValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isVaild: undefined,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isVaild: undefined,
  });

  const cxt = useContext(AuthContext);

  useEffect(() => {
    setFormIsValid(
      emailState.isVaild && passwordState.isVaild && enteredClg.length > 3
    );
  }, [emailState, enteredClg, passwordState]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "ADD_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "ADD_PASSWORD", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "CHECK_EMAIL" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "CHECK_PASSWORD" });
  };

  const ClgChangeHandler = (event) => {
    setClg(event.target.value);
  };

  const validateClgHandler = () => {
    setCldValid(enteredClg.length > 3);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    cxt.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          type="email"
          label="E-MAIL"
          isVaild={emailState.isVaild}
          value={emailState.value}
          ChangeHandler={emailChangeHandler}
          ValidHandler={validateEmailHandler}
        />
        <Input
          type="input"
          label="College Name"
          isVaild={ClgIsValid}
          value={enteredClg}
          ChangeHandler={ClgChangeHandler}
          ValidHandler={validateClgHandler}
        />
        <Input
          type="password"
          label="Password"
          isVaild={passwordState.isVaild}
          value={passwordState.value}
          ChangeHandler={passwordChangeHandler}
          ValidHandler={validatePasswordHandler}
        />
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
