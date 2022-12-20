import React, { useState } from "react";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import styles from "./Form.module.css";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import {
  EMPTY_ERROR,
  FORM_INITIAL_STATE,
  HTTP,
  NAME_ERROR,
  PHONE_ERROR,
  SITE_ERROR,
  SURNAME_ERROR,
  TEXTAREA_ERROR,
  TEXTAREA_LENGTH,
} from "../../constants";

export default function Form() {
  const [form, setForm] = useState(FORM_INITIAL_STATE);
  const [formError, setFormError] = useState(FORM_INITIAL_STATE);
  const [modal, setModal] = useState(false);

  const onChangeName = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const isUppercase = value.trim()[0]?.toUpperCase() !== value.trim()[0];
    if (value && isUppercase) {
      setFormError((state) => ({
        ...state,
        [name]: name === "username" ? NAME_ERROR : SURNAME_ERROR,
      }));
    } else {
      setFormError((state) => ({ ...state, [name]: "" }));
    }
    setForm((state) => ({ ...state, [name]: value }));
  };

  const onChangeDate = (event) => {
    const value = event.target.value;
    if (value.length > 0) {
      setFormError({ ...formError, date: "" });
    }
    setForm({ ...form, date: value });
  };

  const onChangePhone = (event) => {
    const value = event.target.value;
    if (/[a-zа-яё]/i.test(value[0])) {
      setForm({ ...form, phone: "" });
      setFormError({ ...formError, phone: PHONE_ERROR });
    } else {
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
      setForm({ ...form, phone: formatted });
      setFormError({ ...formError, phone: "" });
    }
  };

  const onChangeSite = (event) => {
    const value = event.target.value;
    if (HTTP.startsWith(value) || HTTP.length < value.length) {
      setFormError({ ...formError, site: "" });
      setForm({ ...form, site: value.trim() });
    } else {
      setFormError({ ...formError, site: SITE_ERROR });
      setForm({ ...form, site: value });
    }
  };

  const onChangeTextarea = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((state) => ({ ...state, [name]: value }));
    if (value && value.length >= TEXTAREA_LENGTH) {
      setFormError((state) => ({ ...state, [name]: TEXTAREA_ERROR }));
    } else {
      setFormError((state) => ({ ...state, [name]: "" }));
    }
  };

  const onSubmit = (event) => {
    let formValid = true;
    event.preventDefault();
    const fields = Object.entries(form);
    fields.forEach(([key, value]) => {
      if (value.trim() === "") {
        formValid = false;
        setFormError((state) => ({
          ...state,
          [key]: EMPTY_ERROR,
        }));
      }
    });
    if (
      !Object.values(form).every(Boolean) ||
      Object.values(formError).some(Boolean) ||
      !formValid
    ) {
      return;
    }
    showModal();
  };

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
    onReset();
  };

  const onReset = () => {
    setForm(FORM_INITIAL_STATE);
    setFormError(FORM_INITIAL_STATE);
  };

  const inputs = [
    {
      label: "Имя",
      placeholder: "Введите Ваше имя",
      name: "username",
      type: "text",
      value: form.username,
      onChange: onChangeName,
      error: formError.username,
    },
    {
      label: "Фамилия",
      placeholder: "Введите Вашу фамилию",
      name: "surname",
      type: "text",
      value: form.surname,
      onChange: onChangeName,
      error: formError.surname,
    },
    {
      label: "Дата рождения",
      placeholder: "Введите Вашу дату рождения",
      name: "date",
      type: "date",
      value: form.date,
      onChange: onChangeDate,
      error: formError.date,
    },
    {
      label: "Телефон",
      placeholder: "Введите Ваш номер телефона",
      name: "phone",
      type: "text",
      value: form.phone,
      onChange: onChangePhone,
      error: formError.phone,
    },
    {
      label: "Сайт",
      placeholder: "Введите адрес Вашего сайта",
      name: "site",
      type: "text",
      value: form.site,
      onChange: onChangeSite,
      error: formError.site,
    },
  ];
  const textareas = [
    {
      label: "О себе",
      placeholder: "Введите информацию о себе",
      value: form.about,
      onChange: onChangeTextarea,
      error: formError.about,
      name: "about",
    },
    {
      label: "Стек технологий",
      placeholder: "Введите Ваш стек технологий",
      value: form.stack,
      onChange: onChangeTextarea,
      error: formError.stack,
      name: "stack",
    },
    {
      label: "Описание последнего проекта",
      placeholder: "Опишите Ваш последний проект",
      value: form.description,
      onChange: onChangeTextarea,
      error: formError.description,
      name: "description",
    },
  ];

  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
        <Button name={"Отмена"} type={"reset"} onClick={onReset} />
      </div>
      <Modal show={modal} handleClose={hideModal}>
        {[...inputs, ...textareas].map((item) => (
          <p key={item.label}>
            {item.label}: {item.value}
          </p>
        ))}
      </Modal>
    </form>
  );
}
