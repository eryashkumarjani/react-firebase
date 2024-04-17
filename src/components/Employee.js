import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
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
        const empRef = ref(db, 'Employee/' + key);
        remove(empRef);
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
                                <li>{value.EmployeeName} - <button onClick={() => { navigate('/updateEmp', { state: [key, value] }); }}>Update</button> - <button onClick={() => { moveToTrash(key) }}>Trash</button></li>
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