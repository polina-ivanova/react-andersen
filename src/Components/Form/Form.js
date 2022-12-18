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
      username: "",
      surname: "",
      date: "",
      site: "",
      phone: "",
      about: "",
      stack: "",
      description: "",
      usernameError: "",
      surnameError: "",
      dateError: "",
      siteError: "",
      phoneError: "",
      aboutError: "",
      stackError: "",
      descriptionError: "",
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
        const nameError = name + "Error";
        if (value && value.trim()[0]?.toUpperCase() !== value.trim()[0]) {
          this.setState({
            [nameError]:
              name === "username"
                ? "Имя должно начинаться с заглавной буквы"
                : "Фамилия должна начинаться с заглавной буквы",
          });
        } else {
          this.setState({
            [nameError]: "",
          });
        }
        this.setState({
          [name]: value.trim(),
        });
        break;
      case "date":
        if (value.length > 0) {
          this.setState({
            dateError: "",
          });
        }
        this.setState({
          date: value,
        });
        break;
      case "phone":
        if (/[a-zа-яё]/i.test(value[0])) {
          return this.setState({
            phone: "",
            phoneError: "Номер телефона должен состоять только из цифр",
          });
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
        this.setState({ phone: formatted, phoneError: "" });
        break;
      case "site":
        const http = "https://";
        if (http.length >= value.length && !http.startsWith(value)) {
          return this.setState({
            siteError: "Адрес сайта должен начинаться с https://",
          });
        }
        this.setState({ site: value.trim(), siteError: "" });
        break;
      case "about":
      case "stack":
      case "description":
        const textareaError = name + "Error";
        if (value && value.length >= 600) {
          return this.setState({
            [name]: value,
            [textareaError]: "Превышен лимит символов в поле",
          });
        }
        this.setState({ [name]: value, [textareaError]: "" });
        break;
    }
  };

  onSubmit(event) {
    event.preventDefault();
    if (this.state.username === "") {
      this.setState({
        usernameError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.surname === "") {
      this.setState({
        surnameError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.date === "") {
      this.setState({
        dateError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.phone === "") {
      this.setState({
        phoneError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.site === "") {
      this.setState({
        siteError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.about.trim() === "") {
      this.setState({
        aboutError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.stack.trim() === "") {
      this.setState({
        stackError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (this.state.description.trim() === "") {
      this.setState({
        descriptionError: "Поле пустое. Заполните, пожалуйста",
      });
    }
    if (
      this.state.username.trim() === "" ||
      this.state.surname.trim() === "" ||
      this.state.date === "" ||
      this.state.phone.trim() === "" ||
      this.state.site.trim() === "" ||
      this.state.about.trim() === "" ||
      this.state.stack.trim() === "" ||
      this.state.description.trim() === "" ||
      this.state.usernameError ||
      this.state.surnameError ||
      this.state.dateError ||
      this.state.phoneError ||
      this.state.siteError ||
      this.state.aboutError ||
      this.state.stackError ||
      this.state.descriptionError
    )
      return;
    this.showModal();
  }

  onReset() {
    this.setState({
      username: "",
      surname: "",
      date: "",
      site: "",
      phone: "",
      usernameError: "",
      surnameError: "",
      dateError: "",
      siteError: "",
      phoneError: "",
      textareaAbout: "",
      textareaAboutError: "",
      about: "",
      aboutError: "",
      stack: "",
      stackError: "",
      description: "",
      descriptionError: "",
    });
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
        value: this.state.username,
        onChange: this.onChange,
        error: this.state.usernameError,
      },
      {
        label: "Фамилия",
        placeholder: "Введите Вашу фамилию",
        name: "surname",
        type: "text",
        value: this.state.surname,
        onChange: this.onChange,
        error: this.state.surnameError,
      },
      {
        label: "Дата рождения",
        placeholder: "Введите Вашу дату рождения",
        name: "date",
        type: "date",
        value: this.state.date,
        onChange: this.onChange,
        error: this.state.dateError,
      },
      {
        label: "Телефон",
        placeholder: "Введите Ваш номер телефона",
        name: "phone",
        type: "text",
        value: this.state.phone,
        onChange: this.onChange,
        error: this.state.phoneError,
      },
      {
        label: "Сайт",
        placeholder: "Введите адрес Вашего сайта",
        name: "site",
        type: "text",
        value: this.state.site,
        onChange: this.onChange,
        error: this.state.siteError,
      },
    ];
    const textareas = [
      {
        label: "О себе",
        placeholder: "Введите информацию о себе",
        value: this.state.about,
        onChange: this.onChange,
        error: this.state.aboutError,
        name: "about",
      },
      {
        label: "Стек технологий",
        placeholder: "Введите Ваш стек технологий",
        value: this.state.stack,
        onChange: this.onChange,
        error: this.state.stackError,
        name: "stack",
      },
      {
        label: "Описание последнего проекта",
        placeholder: "Опишите Ваш последний проект",
        value: this.state.description,
        onChange: this.onChange,
        error: this.state.descriptionError,
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
