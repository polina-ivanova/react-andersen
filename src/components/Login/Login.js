import React, { useState } from "react";
import Input from "../Input/Input";
import styles from "./Login.module.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const signIn = () => {
    const action = login(name);
    dispatch(action);
    navigate("/todo");
  };

  return (
    <div className={styles.form}>
      <Input placeholder={"Enter your name"} value={name} onChange={setName} />
      <Button
        name={"Sign in"}
        type={"submit"}
        component={Link}
        to={"/todo"}
        onClick={signIn}
      />
    </div>
  );
}
