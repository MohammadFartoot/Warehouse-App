import {useTitle} from "../../../core/index.js";
import styles from "./SignIn.module.css";
import Union from "../images/Union.png";
import {Link} from "react-router-dom";
import {useRedirect, useLogin} from "../index.js";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";


const Schema = yup.object().shape({
    username: yup.string().required("لطفا مشخصات خود را به صورت کامل وارد کنید"),
    password: yup.string().required("لطفا مشخصات خود را به صورت کامل وارد کنید")
})

function SignIn() {

    const {mutate: login} = useLogin();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(Schema),
        defaultValues: {username: "", password: ""}
    })

    useTitle("بوتواستارت | ورود");
    const navigate = useRedirect();

    const submitHandler = (data) => {

        const formData = {
            username: data.username,
            password: data.password,
        }

        login(formData, {
            onSuccess: () => {
                localStorage.setItem("username", data.username);
                navigate("/products/products-page");
                reset();
            }
        });
    }

    return (
        <div>
            <p className={styles.title}>
                بوت کمپ بوتواستارت
            </p>
            <div className={styles.formBox}>
                <img src={Union} alt="Union-logo"/>
                <p>
                    فرم ورود
                </p>
                <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
                    <div className={styles.field}>
                        <input className={styles.userInput}
                               type="text"
                               placeholder= " "
                               {...register("username")}
                        />
                        <label className={styles.userLabel}>
                            نام کاربری
                        </label>
                    </div>
                    {errors.username && <span>{errors.username.message}</span>}
                    <div className={styles.field}>
                        <input className={styles.passInput}
                               type="password"
                               placeholder= " "
                               {...register("password")}
                        />
                        <label className={styles.passLabel}>
                            رمز عبور
                        </label>
                    </div>
                    {errors.password && <span>{errors.password.message}</span>}
                    <button type="submit">
                        ورود
                    </button>
                </form>
                <Link to="/accounts/sign-up" className={styles.link}>
                    !ایجاد حساب کاربری
                </Link>
            </div>
        </div>
    );
}

export default SignIn;