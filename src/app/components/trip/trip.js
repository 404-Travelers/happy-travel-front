import { useAuthContext } from '@/context/authContext';
import styles from './trip.module.css';
import Image from 'next/image';
import Link from 'next/link';
import edit from '../../../../public/Edit-icon.svg';
import { usePathname } from 'next/navigation';
import DeleteTripButton from '../buttons/deleteTripButton';

function Trip({ trip }) {

  const { country, city, description, image, user: tripUser } = trip;
  const { isAuthenticated, username, role } = useAuthContext();
  const pathname = usePathname();
  const isOwner = isAuthenticated && username?.toLowerCase() === tripUser?.username?.toLowerCase();
  const isOwnerOrAdmin = isAuthenticated && ((username?.toLowerCase() === tripUser?.username?.toLowerCase() || role?.toLowerCase() === '[role_admin]'));
  const showEdit = isOwner && pathname == '/auth';
  const showDelete = isOwnerOrAdmin && pathname == '/auth';

  return (
    <div className={styles.ctTrip}>
      <Link href={`/destinations/${trip.id}`}>
        <div className={styles.ctImg}>
          {image ? (
            <Image
              src={image}
              alt={country}
              width={600}
              height={400}
              className={styles.imgTrip}
              priority
            />
          ) : (
            <div className={styles.imgTripFallback}>No image available</div>
          )}
        </div>


        <div className={styles.ctTxt}>
          <div>
            <h6>{country}</h6>
            <p>{city}</p>
          </div>
          <div>
            {showEdit &&

              <Link href={`/update/${trip.id}`}>
                <Image
                  src={edit}
                  height={40}
                  width={40}
                  alt='edit destination'
                />
              </Link>
            }
            {showDelete &&

              <DeleteTripButton id={trip.id} trip={trip} />

            }
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Trip