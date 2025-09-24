import styles from "./Modal.module.css";

function Modal({children, onClose, size = "medium"}) {
    return (
        <div className={styles.popUp} onClick={onClose}>
            <div className={`${styles.content} ${styles[size]}`} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal;