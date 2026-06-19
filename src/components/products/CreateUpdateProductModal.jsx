import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../../hooks/products/useCreateProduct";
import { useCategories } from "../../hooks/categories/useCategories";
import { toast } from "react-toastify";
import { useUpdateProduct } from "../../hooks/products/useUpdateProduct";

const CreateUpdateProductModal = ({ product, show, handleClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
            category_id: "",
            description: "",
            price: "",
        },
    });

    const { mutateAsync: createProductMutation } = useCreateProduct();
    const { mutateAsync: updateProductMutation } = useUpdateProduct();

    const onSubmit = async (data) => {
        var res = null;
        if (!product) {
            res = await createProductMutation(data);
        } else {
            res = await updateProductMutation({ id: product.id, data: data });
        }
        toast(res.message);
        reset({
            name: "",
            category_id: "",
            description: "",
            price: "",
        });
        handleClose();
    };

    const { data: categoriesList } = useCategories();

    useEffect(() => {
        if (product) {
            reset({
                name: product.name || "",
                category_id: product.category_id || product.category?.id || "",
                description: product.description || "",
                price: product.price || "",
            });
        } else {
            reset({
                name: "",
                category_id: "",
                description: "",
                price: "",
            });
        }
    }, [product, reset]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {product ? `Update product: ${product.name}` : "Create new"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
                    <Form.Group className="mb-3 text-start" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            {...register("name", {
                                required: "name is required",
                            })}
                        />
                        {errors.name && (
                            <p className="text-danger">{errors.name.message}</p>
                        )}
                    </Form.Group>
                    <Form.Group
                        className="mb-3 text-start"
                        controlId="category_id"
                    >
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                            aria-label="Category"
                            {...register("category_id", {
                                required: "Category is required",
                            })}
                        >
                            {categoriesList?.pages?.map((page) =>
                                page?.data?.data?.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                )),
                            )}
                        </Form.Select>
                        {errors.category_id && (
                            <p className="text-danger">
                                {errors.category_id.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group
                        className="mb-3 text-start"
                        controlId="description"
                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter description"
                            {...register("description", {
                                required: "Description is required",
                            })}
                        />
                        {errors.description && (
                            <p className="text-danger">
                                {errors.description.message}
                            </p>
                        )}
                    </Form.Group>
                    <Form.Group className="mb-3 text-start" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter price"
                            {...register("price", {
                                required: "Price is required",
                            })}
                        />
                        {errors.price && (
                            <p className="text-danger">
                                {errors.price.message}
                            </p>
                        )}
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        {product ? "Update" : "Create"}
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateUpdateProductModal;
