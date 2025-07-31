'use client'

import { TripsService } from "@/services/tripsService";
import Trips from "./components/trips/trips";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { useAuthContext } from '@/context/authContext';

export default function Home() {

  const { isAuthenticated } = useAuthContext();
  const [trips, setTrips] = useState(undefined);

  const api = TripsService();

  useEffect(() => {
    if (!isAuthenticated) {
      api.getTrips().then(res => {
        setTrips(res.data)
      }).catch(error => {
        console.error(error)
      })
    } else {
      api.getTripsOrderByAuthUser().then(res => {
        setTrips(res.data)
      }).catch(error => {
        console.error(error)
      })
    }
    
    
  }, []);

  return (
    <main className={styles.main}>
      <Trips trips={trips} />
    </main>
  );
}
