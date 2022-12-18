import React, { Component } from "react";
import styles from "./Textarea.module.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class Textarea extends Component {
  render() {
    return (
      <label className={styles.label}>
        <div className={styles.title}>
          <div>{this.props.label}</div>
          <div className={styles.counter}>
            {this.props.value?.length > 600 ? 0 : 600 - this.props.value.length}
            /600
          </div>
        </div>
        <textarea
          placeholder={this.props.placeholder}
          className={styles.textarea}
          rows="7"
          value={this.props.value}
          onChange={this.props.onChange}
          name={this.props.name}
        />
        <ErrorMessage error={this.props.error ? this.props.error : ""} />
      </label>
    );
  }
}

export default Textarea;
