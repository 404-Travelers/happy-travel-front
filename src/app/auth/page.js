'use client'

import { useEffect, useState } from 'react';
import Trips from '../components/trips/trips';
import styles from '../page.module.css';
import { TripsService } from '@/services/tripsService';

function Page() {

  const [tripsAuth, setTripsAuth] = useState();
  const api = TripsService();

  useEffect(() => {
    api.getMyTrips().then(res => {
      setTripsAuth(res.data)
    }).catch(error => {
      console.log(error);
    })
  }, [])

  return (
    <div className={styles.main}>
      <Trips trips={tripsAuth}/>
    </div>
    
  )
}

export default Page