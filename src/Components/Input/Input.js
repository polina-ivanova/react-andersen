import React, { Component } from "react";
import styles from "./Input.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class Input extends Component {
  render() {
    return (
      <label className={styles.label}>
        {this.props.label}
        <br />
        <input
          className={styles.input}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          type={this.props.type}
          pattern={this.props.pattern}
          name={this.props.name}
        />
        <ErrorMessage error={this.props.error ? this.props.error : ""} />
      </label>
    );
  }
}

export default Input;
