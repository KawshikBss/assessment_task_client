import React, { useState } from "react";
import { useProducts } from "../../hooks/products/useProducts";
import { Button, Table } from "react-bootstrap";
import { useDeleteProduct } from "../../hooks/products/useDeleteProduct";
import { toast } from "react-toastify";
import CreateUpdateProductModal from "../../components/products/CreateUpdateProductModal";

const ProductsPage = () => {
    const { data, isLoading, isSuccess, hasNextPage, fetchNextPage } =
        useProducts();

    const { mutateAsync: deleteProductMutation } = useDeleteProduct();

    const onProductDelete = async (id) => {
        const res = await deleteProductMutation(id);
        toast(res.message);
    };

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    const [selectedProduct, setSelectedProduct] = useState(null);
    const onUpdateProduct = (product) => {
        setSelectedProduct(product);
        openModal();
    };

    return (
        <div className="p-4">
            {isLoading && !isSuccess ? (
                <>Loading...</>
            ) : (
                <div className="text-center">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Products</h1>

                        <Button onClick={openModal}>Create New</Button>
                    </div>
                    {data?.pages?.[0]?.data?.total > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.pages?.map((page) =>
                                    page?.data?.data?.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.category.name}</td>
                                            <td>{item.description}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    className="mx-2"
                                                    onClick={() =>
                                                        onUpdateProduct(item)
                                                    }
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        onProductDelete(item.id)
                                                    }
                                                >
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    )),
                                )}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No products yet</p>
                    )}
                    {hasNextPage && (
                        <Button onClick={fetchNextPage}>More</Button>
                    )}
                </div>
            )}
            <CreateUpdateProductModal
                product={selectedProduct}
                show={showModal}
                handleClose={closeModal}
            />
        </div>
    );
};

export default ProductsPage;
