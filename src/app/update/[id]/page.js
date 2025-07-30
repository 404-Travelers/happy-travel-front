'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TripsService } from "@/services/tripsService";
import { useAuthContext } from '@/context/authContext';
import TripForm from "@/app/components/tripForm/tripForm";
import '@/app/globals.css';

export default function UpdateTripPage({ params }) {
    const { isAuthenticated, username } = useAuthContext();
    const { id } = params;
    const [trip, setTrip] = useState(null);
    const [error, setError] = useState("");
    const [denied, setDenied] = useState(false);
    const router = useRouter();
    const api = TripsService();

    useEffect(() => {
        if (!id) return;
        api.getTripById(id)
            .then(res => setTrip(res.data))
            .catch(err => {
                console.error(err);
                setError("Destino no encontrado");
                setTrip(null);
            });
    }, [id]);

    const isOwner = isAuthenticated && username === trip?.user?.username;

    useEffect(() => {
        if (trip && !isOwner) {
            alert("You don't have access to perform this action");
            setDenied(true);
            router.back();
        }
    }, [trip, isOwner, router]);

    if (error) {
        return (
            <div className="ctPage">
                <h2>{error}</h2>
                <button onClick={() => router.back()} className="btCancel">Volver</button>
            </div>
        );
    }
    if (!trip) {
        return (
            <div className="ctTrips">
                <h3 className="txtError">Cargando destino...</h3>
            </div>
        );
    }
    if (denied) return null; // Prevent rendering form if access denied

    return (
        <TripForm id={id} initialData={trip} />
    );
}
