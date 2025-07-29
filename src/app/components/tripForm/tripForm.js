"use client";

import { useState, useEffect } from "react";
import styles from "./destinationForm.module.css";
import { TripsService } from "@/services/tripsService";

export default function tripForm({ id, initialData }) {
    const api = TripsService();
    const [form, setForm] = useState({
        country: "",
        city: "",
        description: "",
        image: "",
    });

    const [loading, setLoading] = useState(Boolean(id && !initialData));

    useEffect(() => {
        if (initialData) {
            setForm({
                country: initialData.country || "",
                city: initialData.city || "",
                description: initialData.description || "",
                image: initialData.image || "",
            });
            setLoading(false);
        }
    }, [initialData]);

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (form.country.length < 3 || form.country.length > 50) {
            alert("Country must be between 3 and 50 characters");
            return;
        }
        if (form.city.length < 3 || form.city.length > 50) {
            alert("City must be between 3 and 50 characters");
            return;
        }
        if (form.description.length > 255) {
            alert("Description must be less than 255 characters");
            return;
        }
        if (
            form.image &&
            !form.image.match(/^(https?:\/\/.*\.(png|jpg|jpeg|gif|svg))$/i)
        ) {
            alert("Image URL must be a valid image link (png, jpg, jpeg, gif, svg)");
            return;
        }

        try {
            if (id) {
                await api.updateTrip(id, form);
                alert("Destination updated successfully!");
                router.push("/auth");
            } else {
                await api.createTrip(form);
                alert("Destination created successfully!");
                setForm({ country: "", city: "", description: "", image: "" });
                router.push("/auth");
            }
        } catch (error) {
            console.error(error);
            alert(id ? "Error updating destination" : "Error creating destination");
        }
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div className={styles.ctPage}>
            <div className={styles.ctForm}>
                <form onSubmit={handleSubmit} className={styles.formCreateDestination}>
                    <h3 className={styles.txtTitle}>
                        {id ? "Update Destination" : "Create Destination"}
                    </h3>
                    <hr />
                    <label className={styles.lbInput}>
                        Country:
                        <input
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={50}
                            required
                            className={styles.inputField}
                        />
                    </label>

                    <label className={styles.lbInput}>
                        City:
                        <input
                            name="city"
                            value={form.city}
                            onChange={handleChange}
                            minLength={3}
                            maxLength={50}
                            required
                            className={styles.inputField}
                        />
                    </label>

                    <label className={styles.lbInput}>
                        Description:
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            maxLength={255}
                            className={styles.textAreaField}
                        />
                    </label>

                    <label className={styles.lbInput}>
                        Image URL:
                        <input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={styles.inputField}
                        />
                    </label>

                    <button type="submit" className={styles.submitBtn}>
                        {id ? "Update Destination" : "Create Destination"}
                    </button>
                </form>

                <div className={styles.imagePreviewContainer}>
                    {form.image &&
                        form.image.match(/^(https?:\/\/.*\.(png|jpg|jpeg|gif|svg))$/i) ? (
                        <img
                            src={form.image}
                            alt="Preview"
                            className={styles.imagePreview}
                        />
                    ) : (
                        <div
                            style={{ color: "#999", textAlign: "center", padding: "1rem" }}
                        >
                            Image preview will appear here
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
