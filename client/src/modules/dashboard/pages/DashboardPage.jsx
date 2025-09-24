import {useTitle} from "../../../core/index.js";
import {useRedirect} from "../../auth/index.js";
import styles from "./DashboardPage.module.css"
import verify from "../images/verify.png"
import user from "../images/user-3.png"
import home from "../images/building-2.png"
import logOut from "../images/logout.png"


function DashboardPage() {

    useTitle("حساب کاربری");

    const userName = localStorage.getItem("username");

    const navigate = useRedirect();
    const navigateHandler = () => {
        navigate("/products/products-page");
    }

    const logOutHandler = () => {
        localStorage.removeItem("username");
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/accounts/sign-in", {replace: true});
    }

    return (
        <div className={styles.container}>
            <div className={styles.welcomeContainer}>
                <p className={styles.welcomeTitle}> ❤️ عزیز️ {userName} سلام </p>
            </div>
            <div className={styles.menuContainer}>
                <img className={styles.verify} src={verify} alt="verify-icon"/>
                <p className={styles.owner}>{userName}</p>
                <span></span>
                <div className={styles.accountBox}>
                    <p className={styles.account}>حساب کاربری </p>
                    <img className={styles.accountIcon} src={user} alt="user-icon"/>
                </div>
                <div className={styles.homeBox} onClick={() => navigateHandler()}>
                    <p className={styles.home}>خانه</p>
                    <img className={styles.homeIcon} src={home} alt="home-icon"/>
                </div>
                <div className={styles.logOutBox} onClick={() => logOutHandler()}>
                    <p className={styles.logOut}>خروج</p>
                    <img className={styles.logOutIcon} src={logOut} alt="log-out-icon"/>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;