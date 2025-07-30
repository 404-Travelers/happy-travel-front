'use client'

import { useEffect, useState } from 'react';
import Trips from '../components/trips/trips';
import styles from '../page.module.css';
import { TripsService } from '@/services/tripsService';
import { useAuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";


function Page() {

  const [tripsAuth, setTripsAuth] = useState();
  const api = TripsService();
  const { isAuthenticated } = useAuthContext();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/')
  }

  useEffect(() => {
    api.getMyTrips().then(res => {
      setTripsAuth(res.data)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <div className={styles.main}>
      <Trips trips={tripsAuth} />
    </div>

  )
}

export default Page