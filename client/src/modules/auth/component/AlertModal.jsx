import {useAuth, useRedirect} from "../index.js";
import {Modal} from "../../products/index.js";
import multiply from "../images/multiply.svg"
import styles from "./AlertModal.module.css"

function AlertModal() {

    const {alertModal, closeAlertModal} = useAuth();
    const navigate = useRedirect();

    const closeHandler = () => {
        closeAlertModal();
        navigate("/products/products-page")
    }

    const loginHandler = () => {
        closeAlertModal();
        navigate("/accounts/sign-in", {replace: true});
    }

    return (
        <>
            {alertModal && (
                <Modal size="small" onClose={() => closeHandler()}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <p className={styles.alertTitle}>
                                دسترسی شما به پنل شخصی مجاز نیست
                            </p>
                            <img className={styles.alertIcon} src={multiply} alt="multiply-icon"/>
                        </div>
                        <button className={styles.button} onClick={() => loginHandler()}>
                            وارد شوید
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default AlertModal;