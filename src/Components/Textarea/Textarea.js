import React, { Component } from "react";
import styles from "./Textarea.module.css";

class Textarea extends Component {
  render() {
    return (
      <>
        {" "}
        <label className={styles.label}>
          {this.props.label}
          <br />
          <textarea
            placeholder={this.props.placeholder}
            className={styles.textarea}
            rows="7"
          />
        </label>
      </>
    );
  }
}

export default Textarea;
