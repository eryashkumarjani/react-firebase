import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ width: '20%', backgroundColor: 'lightblue', height: '100vh', padding: '2rem' }}>
                <Link to="/addEmp" style={{ color: 'black', display: 'block' }}> Add Employee</Link>
                <Link to="/EmpList" style={{ color: 'black', display: 'block' }}> Employee List</Link>
            </div>
            <div style={{ width: '80%', height: '100vh', padding: '2rem' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard