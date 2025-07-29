"use client";

import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import Image from "next/image";
import del from "../../../../public/Delete-icon.svg";
import { useAuthContext } from "@/context/authContext";

export default function DeleteTripButton({ id, trip }) {
    const { isAuthenticated, username, role } = useAuthContext();
    const router = useRouter();
    const api = TripsService();

    const isOwnerOrAdmin =
        isAuthenticated &&
        (username?.toLowerCase() === trip?.user?.username?.toLowerCase() ||
            role?.toLowerCase() === "[role_admin]");

    async function handleDelete() {
        if (!isOwnerOrAdmin)
            return alert("You don't have access to perform this action");
        const confirmed = window.confirm(
            "Are you sure you want to delete this destination?"
        );
        if (!confirmed) return;

        try {
            await api.deleteTrip(id);
            alert("Destination deleted successfully!");
            router.push("/auth");
        } catch (err) {
            console.error(err);
            alert("Failed to delete destination.");
        }
    }

    return (
        <button
            onClick={handleDelete}
            aria-label="Delete Destination"
            style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
            }}
        >
            <Image src={del} height={40} width={40} alt="delete destination" />
        </button>
    );
}
