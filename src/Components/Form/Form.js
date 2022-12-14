import React, { Component } from "react";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import styles from "./Form.module.css";
import Button from "../Button/Button";

class Form extends Component {
  render() {
    const inputs = [
      {
        label: "Имя",
        placeholder: "Введите Ваше имя",
      },
      {
        label: "Фамилия",
        placeholder: "Введите Вашу фамилию",
      },
      {
        label: "Дата рождения",
        placeholder: "Введите Вашу дату рождения",
      },
      {
        label: "Телефон",
        placeholder: "Введите Ваш номер телефона",
      },
      {
        label: "Сайт",
        placeholder: "Введите адрес Вашего сайта",
      },
    ];
    const textareas = [
      {
        label: "О себе",
        placeholder: "Введите информацию о себе",
      },
      {
        label: "Стек технологий",
        placeholder: "Введите Ваш стек технологий",
      },
      {
        label: "Описание последнего проекта",
        placeholder: "Опишите Ваш последний проект",
      },
    ];
    return (
      <div className={styles.form}>
        <h1 className={styles.title}>Создание анкеты</h1>
        <div className={styles.information}>
          <div className={styles.person}>
            {inputs.map((input) => {
              return (
                <Input
                  label={input.label}
                  placeholder={input.placeholder}
                  key={input.label}
                />
              );
            })}
          </div>
          <div className={styles.additional}>
            {textareas.map((textarea) => {
              return (
                <Textarea
                  label={textarea.label}
                  placeholder={textarea.placeholder}
                  key={textarea.label}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button name={"Сохранить"} />
          <Button name={"Отмена"} />
        </div>
      </div>
    );
  }
}

export default Form;
