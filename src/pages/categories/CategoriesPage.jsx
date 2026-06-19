import React, { useState } from "react";
import { useCategories } from "../../hooks/categories/useCategories";
import { useDeleteCategory } from "../../hooks/categories/useDeleteCategory";
import { Button, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import CreateUpdateCategoryModal from "../../components/categories/CreateUpdateCategoryModal";

const CategoriesPage = () => {
    const { data, isLoading, isSuccess, hasNextPage, fetchNextPage } =
        useCategories();

    const { mutateAsync: deleteCategoryMutation } = useDeleteCategory();

    const onCategoryDelete = async (id) => {
        const res = await deleteCategoryMutation(id);
        toast(res.message);
    };

    const [showModal, setShowModal] = useState(false);
    const openModal = () => setShowModal(true);
    const closeModal = () => {
        setShowModal(false);
        setSelectedCategory(null);
    };

    const [selectedCategory, setSelectedCategory] = useState(null);
    const onUpdateCategory = (category) => {
        setSelectedCategory(category);
        openModal();
    };

    return (
        <div className="p-4">
            {isLoading && !isSuccess ? (
                <>Loading...</>
            ) : (
                <div className="text-center">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1>Categories</h1>

                        <Button onClick={openModal}>Create New</Button>
                    </div>
                    {data?.pages?.[0]?.data?.total > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.pages?.map((page) =>
                                    page?.data?.data?.map((item) => (
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    className="mx-2"
                                                    onClick={() =>
                                                        onUpdateCategory(item)
                                                    }
                                                >
                                                    Update
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    onClick={() =>
                                                        onCategoryDelete(
                                                            item.id,
                                                        )
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
                        <p>No categories yet</p>
                    )}
                    {hasNextPage && (
                        <Button onClick={fetchNextPage}>More</Button>
                    )}
                </div>
            )}
            <CreateUpdateCategoryModal
                category={selectedCategory}
                show={showModal}
                handleClose={closeModal}
            />
        </div>
    );
};

export default CategoriesPage;
