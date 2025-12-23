import {Modal} from "../index.js";
import styles1 from "./DeleteModal.module.css";
import close from "../images/Close.svg";
import {useProducts} from "../index.js";
import {useQueryClient} from "@tanstack/react-query";


function DeleteModal() {

    const {deleteModal, closeDeleteModal, selectProductId, deleteProductById,} = useProducts();
    const queryClient = useQueryClient();

    const deleteHandler = () => {

        if (!selectProductId) return;

        deleteProductById.mutate(selectProductId, {
            onSuccess: () => {
                queryClient.invalidateQueries(["products"]);
                closeDeleteModal();
            },
            onError: (error) => {
                if (import.meta.env.MODE === "development") {
                    console.error("failed to delete:", error);
                }
            }
        });
    }

    return (
        <div>
            {deleteModal && (
                <Modal size="medium" onClose={() => closeDeleteModal()}>
                    <img className={styles1.glassIcon} src={close} alt="close-icon"/>
                    <h3 className={styles1.text}>آیا از حذف این محصول مطمئنید؟</h3>
                    <div className={styles1.BtnContainer}>
                        <button className={styles1.cancelBtn} onClick={() => closeDeleteModal()}>لغو</button>
                        <button className={styles1.deleteBtn} onClick={() => deleteHandler()}>حذف</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default DeleteModal;