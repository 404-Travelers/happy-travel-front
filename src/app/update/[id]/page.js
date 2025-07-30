// UpdateTripPage.js (or page.jsx)
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import { useAuthContext } from '@/context/authContext';
import TripForm from "@/app/components/tripForm/tripForm";
import styles from '@/app/globals.css'

export default function UpdateTripPage({ params }) {
    const { isAuthenticated, username } = useAuthContext();
    const { id } = params;
    const [trip, setTrip] = useState(null);
    const [error, setError] = useState("");
    const router = useRouter();
    const api = TripsService();

    const isOwner = isAuthenticated && username?.toLowerCase() === trip?.user?.username?.toLowerCase();


    useEffect(() => {
        if (!id) return;

        api.getTripById(id)
            .then(res => setTrip(res.data))
            .catch(err => {
                console.error(err);
                setError("Destino no encontrado");
                setTrip(null);
            });
        if (trip && !isOwner) {
            alert("You don't have access...");
            router.back();
        }
    }, [trip, isOwner, router, id]);

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

    if (!trip) {
        return (
            <div className={styles.ctTrips}>
                <h3 className={styles.txtError}>Cargando destino...</h3>

            </div>
        );
    }

    if (!isOwner) {
        return alert("You don't have access to perform this action");
    }

    return (

        <TripForm id={id} initialData={trip} />
    );
}
