import styles from "./Modal.module.css";
import Button from "../Button/Button";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show
    ? styles.modal + " " + styles.show
    : styles.modal + " " + styles.hide;

  return (
    <div className={showHideClassName}>
      <section className={styles.modalMain}>
        {children}
        <Button type="button" onClick={handleClose} name={"Закрыть"} />
      </section>
    </div>
  );
};
export default Modal;
