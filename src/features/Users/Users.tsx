import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../app/store';
import { fetchUsers, seleсtUsers, seleсtUsersStatus } from './usersSlice';
import styles from "./Users.module.css"
import { Link } from 'react-router-dom';

const Users = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(seleсtUsers);
    const status = useSelector(seleсtUsersStatus);
    useEffect(() => {
        let ignore = false;
        if (status === "idle" && !ignore) {
            dispatch(fetchUsers())
        }
        return () => {
            ignore = true;
        };
    }, [dispatch, status])


    // const userList = users.map((user) => <li key={user.id}>{user.name} - {user.email}</li>)

    return (
        <>
            {status === "loading" && <div>Loading...</div>}
            {status === "succeeded" && 
            <div className={styles.usersWrapper}>
                {users.map((user) =>
                    <Link to={String(user.id)}>
                        <div key={user.id} className={styles.user}>
                            {user.name} - {user.email}
                        </div>
                    </Link>)}
            </div>}
        </>
    )
}

export default Users