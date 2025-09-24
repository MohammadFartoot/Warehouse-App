import {Modal} from "../index.js";
import styles from "./AddModal.module.css";
import {useProducts} from "../index.js";
import {useQueryClient} from "@tanstack/react-query";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useRef} from "react";
import LoadingBar from "react-top-loading-bar";


const schema = Yup.object().shape({
    name: Yup.string().required("لطفا فیلد های خالی را پر کنید"),
    quantity: Yup.number().typeError("لطفا اعداد لاتین وارد کنید").required("لطفا فیلد های خالی را پر کنید"),
    price: Yup.number().typeError("لطفا اعداد لاتین وارد کنید").required("لطفا فیلد های خالی را پر کنید"),
})

function AddModal() {

    const {addProduct, addModal, closeAddModal} = useProducts();
    const loadingBar = useRef(null);
    const queryClient = useQueryClient();

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({resolver: yupResolver(schema)});


    const submitHandler = (data) => {
        closeAddModal();
        loadingBar.current?.continuousStart();
        addProduct.mutate(data, {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"]);
                reset();
                loadingBar.current?.complete();
            },
            onError: (error) => {
                loadingBar.current?.complete();
                if (import.meta.env.MODE === "development") {
                    console.error("failed to add:", error);
                }
            }
        })
    }


    return (
        <>
            <LoadingBar
                ref={loadingBar}
                height={3}
                color="linear-gradient(90deg, #833ab4, #b32525, #ff0000, #fcb945)"
                waitingTime={600}
            />
            <form onSubmit={handleSubmit(submitHandler)} className={styles.container}>
                {addModal && (
                    <Modal size="large" onClose={() => closeAddModal()}>
                        <p className={styles.title}>ایجاد محصول جدید</p>
                        <div className={styles.nameBox}>
                            <p className={styles.productName}>نام کالا</p>
                            <input
                                {...register("name")}
                                type="text"
                                placeholder="نام کالا"
                                name="name"
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                        <div className={styles.quantityBox}>
                            <p className={styles.quantityTitle}>تعداد موجودی</p>
                            <input
                                {...register("quantity")}
                                type="number"
                                placeholder="تعداد"
                                name="quantity"
                            />
                            {errors.quantity && <span>{errors.quantity.message}</span>}
                        </div>
                        <div className={styles.priceBox}>
                            <p className={styles.priceTitle}>قیمت</p>
                            <input
                                {...register("price")}
                                type="number"
                                placeholder="قیمت"
                                name="price"
                            />
                            {errors.price && <span>{errors.price.message}</span>}
                        </div>
                        <div className={styles.btnBox}>
                            <button className={styles.cancelBtn} onClick={() => closeAddModal(reset())}>انصراف</button>
                            <button type="submit" className={styles.createBtn}>ایجاد</button>
                        </div>
                    </Modal>
                )}
            </form>
        </>
    );
}

export default AddModal;