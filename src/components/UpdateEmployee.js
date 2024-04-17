import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getDatabase, ref, update } from 'firebase/database';
import { getStorage, ref as storeRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../Firebase';

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [eNo, setEno] = useState(location.state[0]);
    const [eName, setEname] = useState(location.state[1].EmployeeName);
    const [file, setFile] = useState();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    // console.log("#Location Data", location);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (file) {
            const db = getDatabase(app);

            const storage = getStorage(app);
            const fileRef = storeRef(storage, `images/${location.state[0]}`);
            await uploadBytes(fileRef, file);
            const imageURL = await getDownloadURL(fileRef);

            const empRef = ref(db, 'Employee/' + location.state[0]);
            update(empRef, { EmployeeName: eName, EmployeeProfileImage: imageURL }).then(res => {
                setEno('');
                setEname('');
                setFile();
                navigate('/EmpList');
            }).catch(err => {
                console.log(err);
            })
        } else {
            const db = getDatabase(app);
            const empRef = ref(db, 'Employee/' + location.state[0]);
            update(empRef, { EmployeeName: eName }).then(res => {
                setEno('');
                setEname('');
                setFile();
                navigate('/EmpList');
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            <h1>Update Employee</h1>
            <form onSubmit={submitHandler}>
                <input type='number' placeholder='Enter Employee ID' value={eNo} onChange={(e) => { setEno(e.target.value) }} disabled /><br />
                <input type='text' placeholder='Enter Employee Name' value={eName} onChange={(e) => { setEname(e.target.value) }} /><br />
                <input type='file' placeholder='Upload Profile Photo' onChange={handleFileChange} /><br />
                <button type='submit'> Update</button>
            </form>
        </div>
    )
}

export default UpdateEmployee