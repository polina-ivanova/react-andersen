import React, { useState } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { ENTER_NAME } from "../../constants";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");

  const signIn = (): void => {
    const action = login(name);
    dispatch(action);
    navigate("/todo");
  };

  return (
    <div className={styles.form}>
      <Input placeholder={ENTER_NAME} value={name} onChange={setName} />
      <Link to={"/todo"}>
        <Button name={"Sign in"} type={"submit"} onClick={signIn} />
      </Link>
    </div>
  );
}
