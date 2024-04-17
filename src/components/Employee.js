import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import { getStorage, ref as storeRef, deleteObject } from 'firebase/storage';
import { app } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
    const [empData, setEmpData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const db = getDatabase(app);
        const empRef = ref(db, 'Employee');
        onValue(empRef, (snapshot) => {
            const data = snapshot.val();
            console.log('#Data', data);
            setEmpData(data);
        });
    }, []);

    const moveToTrash = (key) => {
        const db = getDatabase(app);
        const storage = getStorage(app);
        const fileRef = storeRef(storage, `images/${key}`);
        deleteObject(fileRef).then(res => {
            const empRef = ref(db, 'Employee/' + key);
            remove(empRef);
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div>
            <h1>Employee List</h1>
            <hr />
            {empData && (
                <>
                    {Object.entries(empData).map(([key, value]) => {
                        return (
                            <ul key={key}>
                                <li><img src={value.EmployeeProfileImage} width="100px" /> </li>
                                <li>{value.EmployeeName} </li>
                                <li><button onClick={() => { navigate('/updateEmp', { state: [key, value] }); }}>Update</button>
                                    <button onClick={() => { moveToTrash(key) }}>Trash</button></li>
                            </ul>
                        )
                    })}
                </>
            )
            }
        </div>
    )
}

export default Employee