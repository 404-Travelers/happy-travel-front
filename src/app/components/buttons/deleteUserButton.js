"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import del from "../../../../public/Delete-icon.svg";
import { useAuthContext } from "@/context/authContext";
import { UsersService } from "@/services/usersService";

export default function DeleteUserButton({ id, userUsername }) {
    const { isAuthenticated, username, role } = useAuthContext();
    const router = useRouter();
    const api = UsersService();

    const isOwnerOrAdmin =
        isAuthenticated &&
        (username === userUsername ||
            role.toLowerCase() === "[role_admin]");

    async function handleDelete() {
        if (!isOwnerOrAdmin)
            return alert("You don't have access to perform this action");
        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );
        if (!confirmed) return;

        try {
            const response = await api.deleteUserAdmin(id);
            alert(response.data);
            router.back();
        } catch (err) {
            console.error(err);
            alert("Failed to delete user.");
        }
    }

    return (
        <button
            onClick={handleDelete}
            aria-label="Delete User"
            style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
            }}
        >
            <Image src={del} height={40} width={40} alt="delete user" />
        </button>
    );
}
