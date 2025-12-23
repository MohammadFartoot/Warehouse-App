import {useTitle, useTheme} from "../../../core/index.js";
import styles from "./ProductsPage.module.css"
import search from "../images/search-normal.svg"
import user from "../images/Felix-Vogel-4.svg"
import setting from "../images/setting-3.svg"
import moon from "../images/moon-5.png"
import sun from "../images/sun-3.png"
import {AddModal, DeleteModal, EditModal, ProductsList} from "../index.js";
import {useProducts} from "../index.js";
import {useRedirect} from "../../auth/index.js";


function ProductsPage() {

    const {theme, themeHandler} = useTheme();
    const {openAddModal, setSearchValue} = useProducts();
    const userName = localStorage.getItem("username");


    useTitle("بوتواستارت | صفحه محصولات");
    const navigate = useRedirect();

    const searchHandler = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }


    return (
        <>
            <div className={styles.header}>
                <input
                    type="text"
                    placeholder="جستجو کالا"
                    onChange={searchHandler}
                />
                <img className={styles.search} src={search} alt="search-icon"/>
                <div className={styles.dashboardBox} onClick={() => navigate("/dashboard")}>
                    <img className={styles.user} src={user} alt="user-icon"/>
                    <span></span>
                    <h4>{userName}</h4>
                    <p>مدیر</p>
                </div>
            </div>
            <div
                className={styles.toggleSwitch}
                onClick={themeHandler}>
                <div className={styles.circleButton}>
                    {theme === "dark"
                        ?
                        <img className={styles.moon} src={moon} alt="moon-icon"/>
                        :
                        <img className={styles.sun} src={sun} alt="sun-icon"/>}
                </div>
            </div>
            <div className={styles.manageBox}>
                <div className={styles.btnBox}>
                    <button className={styles.add} onClick={() => openAddModal()}>افزودن محصول</button>
                </div>
                <div className={styles.titleBox}>
                    <p className={styles.title}>مدیریت کالا</p>
                    <img className={styles.setting} src={setting} alt="setting-icon"/>
                </div>
            </div>
            <ProductsList/>
            <AddModal/>
            <EditModal/>
            <DeleteModal/>

        </>
    );
}

export default ProductsPage;