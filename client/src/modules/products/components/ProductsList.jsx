import edit from "../images/edit.svg"
import trash from "../images/trash.svg"
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useProducts} from "../index.js";
import styles from "../components/ProductList.module.css";
import ReactPaginate from "react-paginate";
import styles1 from "./Pagination.module.css"
import {useGetProducts} from "../hooks/useGetProducts.js";
import {useDebounce} from "use-debounce";


function ProductsList() {


    const {searchValue, error, openDeleteModal, openEditModal} = useProducts();

    const [page, setPage] = useState(1);
    const limit = 10;

    const [debouncedSearch] = useDebounce(searchValue, 500);

    const {data} = useGetProducts(page, limit, debouncedSearch);
    const totalPages = data?.totalPages || 0;
    const products = data?.data || [];


    useEffect(() => {

        if (error) {
            toast.error("نقص فنی در دریافت محصولات", {
                position: "top-right",
                style: {
                    fontFamily: "'Vazirmatn-Regular', 'Helvetica', 'Arial', sans-serif",
                    padding: "12px",
                }
            });
            if (import.meta.env.MODE === "development" ) {
                console.error(error);
            }
        }
    }, [error]);


    useEffect(() => {
        setPage(1);
    }, [debouncedSearch])



    return (
        <>
            <div className={styles.tableContainer}>
                <div className={styles.tableHeader}>
                    <p className={styles.productName}>نام کالا</p>
                    <p className={styles.quantity}>موجودی</p>
                    <p className={styles.price}>قیمت</p>
                    <p className={styles.productId}>شناسه کالا</p>
                </div>
            </div>
            <div className={styles.listContainer}>
                {products?.map((product) => (
                    <div className={styles.list} key={product.id}>
                        <p className={styles.nameStyle}>{product.name}</p>
                        <p className={styles.quantityStyle}>{product.quantity}</p>
                        <p className={styles.priceStyle}>{product.price}</p>
                        <p className={styles.idStyle}>{product.id}</p>
                        <div className={styles.btnContainer}>
                            <button className={styles.editBtn} onClick={() => openEditModal(product)}>
                                <img src={edit} alt="edit-icon"/>
                            </button>
                            <button className={styles.trashBtn} onClick={() => openDeleteModal(product.id)}>
                                <img src={trash} alt="trash-icon"/>
                            </button>
                        </div>
                    </div>))}
                {totalPages > 0 && (
                    <div className={styles1.PaginationContainer}>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel={null}
                            previousLabel={null}
                            onPageChange={(event) => setPage(event.selected + 1)}
                            pageRangeDisplayed={5}
                            pageCount={totalPages || 0}
                            forcePage={page - 1}
                            containerClassName={styles1.pagination}
                            pageLinkClassName={styles1.pageLink}
                            activeClassName={styles1.active}
                            breakClassName={styles1.break}
                            disabledClassName={styles1.disabled}
                        />
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductsList;