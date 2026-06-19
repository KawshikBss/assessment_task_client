import React, { useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "../../hooks/categories/useCreateCategory";
import { useCategories } from "../../hooks/categories/useCategories";
import { toast } from "react-toastify";
import { useUpdateCategory } from "../../hooks/categories/useUpdateCategory";

const CreateUpdateCategoryModal = ({ category, show, handleClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            name: "",
        },
    });

    const { mutateAsync: createCategoryMutation } = useCreateCategory();
    const { mutateAsync: updateCategoryMutation } = useUpdateCategory();

    const onSubmit = async (data) => {
        var res = null;
        if (!category) {
            res = await createCategoryMutation(data);
        } else {
            res = await updateCategoryMutation({ id: category.id, data: data });
        }
        toast(res.message);
        reset({
            name: "",
        });
        handleClose();
    };

    useEffect(() => {
        if (category) {
            reset({
                name: category.name || "",
            });
        } else {
            reset({
                name: "",
            });
        }
    }, [category, reset]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {category
                        ? `Update category: ${category.name}`
                        : "Create new"}
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
                    <Button variant="primary" type="submit">
                        {category ? "Update" : "Create"}
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

export default CreateUpdateCategoryModal;
