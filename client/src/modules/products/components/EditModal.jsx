import {Modal} from "../index.js";
import {useProducts} from "../index.js";
import styles from "./EditModal.module.css";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useRef} from "react";
import LoadingBar from "react-top-loading-bar";


const schema = Yup.object().shape({
    name: Yup.string().required("لطفا فیلد های خالی را پر کنید"),
    quantity: Yup.number().typeError("لطفا اعداد لاتین وارد کنید").required("لطفا فیلد های خالی را پر کنید"),
    price: Yup.number().typeError("لطفا اعداد لاتین وارد کنید").required("لطفا فیلد های خالی را پر کنید"),
})


function EditModal() {

    const {editModal, closeEditModal, updateProductById, selectProduct} = useProducts();
    const loadingBar = useRef(null);
    const queryClient = useQueryClient();


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {},
    });


    const editHandler = (data) => {
        closeEditModal();
        loadingBar.current?.continuousStart();
        updateProductById.mutate({id: selectProduct.id, data}, {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"]);
                reset();
                loadingBar.current?.complete();
            },
            onError: (error) => {
                loadingBar.current?.complete();
                if (import.meta.env.MODE === "development") {
                    console.error("failed to update:", error);
                }
            }
        })
    }


    useEffect(() => {
        if (editModal && selectProduct) {
            reset(selectProduct);
        }
    }, [editModal, selectProduct, reset]);


    return (
        <>
            <LoadingBar
                ref={loadingBar}
                height={3}
                color="linear-gradient(90deg, #833ab4, #b32525, #ff0000, #fcb945)"
                waitingTime={600}
            />
            <form onSubmit={handleSubmit(editHandler)} className={styles.container}>
                {editModal && (
                    <Modal size="large" onClose={() => closeEditModal()}>
                        <p className={styles.title}>ویرایش اطلاعات</p>
                        <div className={styles.nameBox}>
                            <p className={styles.productName}>نام کالا</p>
                            <input
                                {...register("name")}
                                type="text"
                                name="name"
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                        <div className={styles.quantityBox}>
                            <p className={styles.quantityTitle}>تعداد موجودی</p>
                            <input
                                {...register("quantity")}
                                type="number"
                                name="quantity"
                            />
                            {errors.quantity && <span>{errors.quantity.message}</span>}
                        </div>
                        <div className={styles.priceBox}>
                            <p className={styles.priceTitle}>قیمت</p>
                            <input
                                {...register("price")}
                                type="number"
                                name="price"
                            />
                            {errors.price && <span>{errors.price.message}</span>}
                        </div>
                        <div className={styles.btnBox}>
                            <button type="button" className={styles.cancelBtn} onClick={() => {
                                reset();
                                closeEditModal()
                            }}>انصراف
                            </button>
                            <button type="submit" className={styles.createBtn}>ثبت اطلاعات جدید</button>
                        </div>
                    </Modal>
                )}
            </form>
        </>
    );
}

export default EditModal;