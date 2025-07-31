'use client';

import TripForm from '../components/tripForm/tripForm';
import { useAuthContext } from '@/context/authContext';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
    const { isAuthenticated } = useAuthContext();
    const [error] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            alert("You don't have access to this action. Login first");
            router.back();
        }
    }, [isAuthenticated]);

    if (error) {
        return (
            <div className={styles.ctPage}>
                <h2>{error}</h2>
                <button onClick={() => router.back()} className={styles.btCancel}>
                    Volver
                </button>
            </div>
        );
    }

    return (

        <TripForm />

    );
}
