import notFound from "../../assets/404page-1.png"
import styles from "./Pnf.module.css"
import {Link} from "react-router-dom";

function PageNotFound() {
    return (
        <div className={styles.container}>
            <img src={notFound} alt="Error 404" />
            <h1>
                به نظر می رسد گم شده اید
            </h1>
            <h4>
                !صفحه ای که به دنبال آن هستید در دسترس نیست
            </h4>
            <Link to="/accounts/sign-in" className={styles.link}>
                بازگشت به صفحه اصلی
            </Link>
        </div>
    );
}

export default PageNotFound;