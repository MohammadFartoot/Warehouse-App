import styles from "./SignUp.module.css";
import Union from "../images/Union.png"
import {Link} from "react-router-dom";
import {useTitle} from "../../../core/index.js";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Question from "../images/question.png"
import {useRegister, useRedirect} from "../index.js";


const userSchema = yup.object().shape({
        username: yup
            .string()
            .required("نام کاربری را وارد کنید")
            .matches(/^[a-zA-Z0-9_\u0600-\u06FF]{3,20}$/, "نام کاربری را وارد کنید"
            ),
        password: yup
            .string()
            .required("رمز عبور را وارد کنید")
            .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "رمز عبور باید حداقل ۸ کاراکتر باشد")
            .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),

        password_confirmation: yup
            .string()
            .oneOf([yup.ref('password'), null], "تکرار رمز عبور باید با رمز عبور برابر باشد")
            .required("تکرار رمز عبور الزامی است ")
    }
)


function SignUp() {

    const {mutate: registering} = useRegister();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(userSchema),
        defaultValues: {name: "", password: "", password_confirmation: "",}
    });

    useTitle("بوتواستارت | ثبت نام");
    const navigate = useRedirect();

    const submitHandler = (data) => {
        const formData = {
            username: data.username,
            password: data.password,
            password_confirmation: data.password_confirmation,
        };

        registering(formData, {
            onSuccess: () => {
                reset();
                navigate("/products/products-page");
            },
        });
    };

    return (
        <>
            <p className={styles.title}>
                بوت کمپ بوتواستارت
            </p>
            <div className={styles.formBox}>
                <img src={Union} alt="Union"/>
                <p>
                    فرم ثبت نام
                </p>
                <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
                    <div className={styles.field}>
                        <input className={styles.userInput}
                               type="text"
                               name="username"
                               placeholder=" "
                               {...register("username")}
                        />
                        <label className={styles.userLabel}>
                            نام کاربری
                        </label>
                        <div className={styles.nameWrapper}>
                            <img className={styles.nameAlert} src={Question} alt="alert logo"/>
                            <p className={styles.nameText}>
                                نام کاربری فقط می تواند شامل حروف فارسی، انگلیسی، اعداد و بین ۳ تا ۲۰ کاراکتر باشد
                            </p>
                        </div>
                    </div>
                    {errors.username && <span>{errors.username.message}</span>}
                    <div className={styles.field}>
                        <input className={styles.passInput}
                               type="password"
                               name="password"
                               placeholder=" "
                               {...register("password")}
                        />
                        <label className={styles.passLabel}>
                            رمز عبور
                        </label>
                        <div className={styles.passwordWrapper}>
                            <img className={styles.passwordAlert} src={Question} alt="alert logo"/>
                            <p className={styles.passwordText}>
                                رمز عبور باید حداقل یک حرف بزرگ، یک عدد و یک کاراکتر خاص داشته باشد
                            </p>
                        </div>
                    </div>
                    {errors.password && <span>{errors.password.message}</span>}
                    <div className={styles.field}>
                        <input className={styles.rptInput}
                               type="password"
                               name="password_confirmation"
                               placeholder=" "
                               {...register("password_confirmation")}
                        />
                        <label className={styles.rptLabel}>
                            تکرار رمز عبور
                        </label>
                    </div>
                    {errors.password_confirmation && <span>{errors.password_confirmation.message}</span>}
                    <button type="submit">
                        ثبت نام
                    </button>
                </form>
                <Link to="/accounts/sign-in" className={styles.link}>
                    حساب کاربری دارید؟
                </Link>
            </div>
        </>
    );
}


export default SignUp;