import React, { Component } from "react";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: "",
        surname: "",
        date: "",
        site: "",
        phone: "",
        about: "",
        stack: "",
        description: "",
      },
      formError: {
        username: "",
        surname: "",
        date: "",
        site: "",
        phone: "",
        about: "",
        stack: "",
        description: "",
      },
      modal: false,
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    switch (name) {
      case "username":
      case "surname":
        if (value && value.trim()[0]?.toUpperCase() !== value.trim()[0]) {
          this.setState((state) => ({
            formError: {
              ...state.formError,
              [name]:
                name === "username"
                  ? "Имя должно начинаться с заглавной буквы"
                  : "Фамилия должна начинаться с заглавной буквы",
            },
          }));
        } else {
          this.setState((state) => ({
            formError: {
              ...state.formError,
              [name]: "",
            },
          }));
        }
        this.setState((state) => ({
          form: {
            ...state.form,
            [name]: value.trim(),
          },
        }));
        break;
      case "date":
        if (value.length > 0) {
          this.setState((state) => ({
            formError: {
              ...state.formError,
              date: "",
            },
          }));
        }
        this.setState((state) => ({
          form: {
            ...state.form,
            date: value,
          },
        }));
        break;
      case "phone":
        if (/[a-zа-яё]/i.test(value[0])) {
          return this.setState((state) => ({
            form: { ...state.form, phone: "" },
            formError: {
              ...state.formError,
              phone: "Номер телефона должен состоять только из цифр",
            },
          }));
        }
        const phone = value
          .replace(/[^\d]/g, "")
          .match(/(\d)(\d{0,4})(\d{0,2})(\d{0,2})/);
        let formatted;
        if (Array.isArray(phone)) {
          formatted = phone
            .slice(1, 5)
            .filter((item) => !!item)
            .join("-");
        }
        this.setState((state) => ({
          form: { ...state.form, phone: formatted },
          formError: { ...state.formError, phone: "" },
        }));
        break;
      case "site":
        const http = "https://";
        if (http.length >= value.length && !http.startsWith(value)) {
          return this.setState((state) => ({
            formError: {
              ...state.formError,
              site: "Адрес сайта должен начинаться с https://",
            },
          }));
        }
        this.setState((state) => ({
          form: {
            ...state.form,
            site: value.trim(),
          },
          formError: {
            ...state.formError,
            site: "",
          },
        }));
        break;
      case "about":
      case "stack":
      case "description":
        if (value && value.length >= 600) {
          return this.setState((state) => ({
            form: {
              ...state.form,
              [name]: value,
            },
            formError: {
              ...state.formError,
              [name]: "Превышен лимит символов в поле",
            },
          }));
        }
        this.setState((state) => ({
          form: { ...state.form, [name]: value },
          formError: { ...state.formError, [name]: "" },
        }));
        break;
    }
  };

  onSubmit(event) {
    let formValid = true;
    event.preventDefault();
    const fields = Object.entries(this.state.form);
    fields.forEach(([key, value]) => {
      if (value.trim() === "") {
        formValid = false;
        this.setState((state) => ({
          formError: {
            ...state.formError,
            [key]: "Поле пустое. Заполните, пожалуйста",
          },
        }));
      }
    });
    if (
      !Object.values(this.state.form).every(Boolean) ||
      Object.values(this.state.formError).some(Boolean) ||
      !formValid
    ) {
      return;
    }
    this.showModal();
  }

  onReset() {
    const keys = Object.keys(this.state.form);
    const form = keys.reduce((acc, key) => {
      acc = { ...acc, [key]: "" };
      return acc;
    }, {});
    const formError = { ...form };
    this.setState(() => ({ form, formError }));
  }

  showModal = () => {
    this.setState({ modal: true });
  };

  hideModal = () => {
    this.setState({ modal: false });
    this.onReset();
  };

  render() {
    const inputs = [
      {
        label: "Имя",
        placeholder: "Введите Ваше имя",
        name: "username",
        type: "text",
        value: this.state.form.username,
        onChange: this.onChange,
        error: this.state.formError.username,
      },
      {
        label: "Фамилия",
        placeholder: "Введите Вашу фамилию",
        name: "surname",
        type: "text",
        value: this.state.form.surname,
        onChange: this.onChange,
        error: this.state.formError.surname,
      },
      {
        label: "Дата рождения",
        placeholder: "Введите Вашу дату рождения",
        name: "date",
        type: "date",
        value: this.state.form.date,
        onChange: this.onChange,
        error: this.state.formError.date,
      },
      {
        label: "Телефон",
        placeholder: "Введите Ваш номер телефона",
        name: "phone",
        type: "text",
        value: this.state.form.phone,
        onChange: this.onChange,
        error: this.state.formError.phone,
      },
      {
        label: "Сайт",
        placeholder: "Введите адрес Вашего сайта",
        name: "site",
        type: "text",
        value: this.state.form.site,
        onChange: this.onChange,
        error: this.state.formError.site,
      },
    ];
    const textareas = [
      {
        label: "О себе",
        placeholder: "Введите информацию о себе",
        value: this.state.form.about,
        onChange: this.onChange,
        error: this.state.formError.about,
        name: "about",
      },
      {
        label: "Стек технологий",
        placeholder: "Введите Ваш стек технологий",
        value: this.state.form.stack,
        onChange: this.onChange,
        error: this.state.formError.stack,
        name: "stack",
      },
      {
        label: "Описание последнего проекта",
        placeholder: "Опишите Ваш последний проект",
        value: this.state.form.description,
        onChange: this.onChange,
        error: this.state.formError.description,
        name: "description",
      },
    ];

    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <h1 className={styles.title}>Создание анкеты</h1>
        <div className={styles.information}>
          <div className={styles.person}>
            {inputs.map((input) => (
              <Input
                key={input.label}
                label={input.label}
                placeholder={input.placeholder}
                name={input.name}
                type={input.type}
                value={input.value}
                onChange={input.onChange}
                error={input.error}
              />
            ))}
          </div>
          <div className={styles.additional}>
            {textareas.map((textarea) => {
              return (
                <Textarea
                  key={textarea.label}
                  label={textarea.label}
                  placeholder={textarea.placeholder}
                  value={textarea.value}
                  error={textarea.error}
                  onChange={textarea.onChange}
                  name={textarea.name}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.buttons}>
          <Button name={"Сохранить"} type={"submit"} />
          <Button name={"Отмена"} type={"reset"} onClick={this.onReset} />
        </div>
        <Modal show={this.state.modal} handleClose={this.hideModal}>
          {[...inputs, ...textareas].map((item) => (
            <p key={item.label}>
              {item.label}: {item.value}
            </p>
          ))}
        </Modal>
      </form>
    );
  }
}

export default Form;
