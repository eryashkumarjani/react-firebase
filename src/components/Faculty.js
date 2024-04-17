import React, { useEffect, useState } from 'react';
import { app } from '../Firebase';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Faculty = () => {
    const [facultyData, setFacultyData] = useState([]);

    const navigate = useNavigate();

    const getFacultyData = async () => {
        const db = getFirestore(app);
        const collectionRef = collection(db, 'Faculty');
        const docSnap = await getDocs(collectionRef);
        const data = docSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));
        console.log("FacultyData", data);
        setFacultyData(data);
    }

    useEffect(() => {
        getFacultyData();
    }, []);

    const moveToTrash = async (id) => {
        const db = getFirestore(app);
        const docRef = doc(db, 'Faculty', id);
        try {
            await deleteDoc(docRef);
            getFacultyData();
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Faculty List</h1>
            <hr />
            {facultyData && (
                facultyData.map((faculty) => {
                    return (
                        <div key={faculty.id}>
                            <label >{faculty.FacultyNo} - {faculty.FacultyName}</label> - &nbsp;
                            <button onClick={() => moveToTrash(faculty.id)}> Trash</button> - &nbsp;
                            <button onClick={() => { navigate('/updateFcty', { state: faculty }); }}>Update</button> <br />
                            <br />
                        </div>
                    )
                })
            )}
        </div>
    )
}

export default Faculty