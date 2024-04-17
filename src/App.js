import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import AddEmployee from './components/AddEmployee';
import Employee from './components/Employee';
import UpdateEmployee from './components/UpdateEmployee';
import AddFaculty from './components/AddFaculty';
import UpdateFaculty from './components/UpdateFaculty';
import Faculty from './components/Faculty';

const myRouter = createBrowserRouter([
  {
    path: '', Component: Dashboard, children: [
      { path: '', Component: Employee },
      { path: 'addEmp', Component: AddEmployee },
      { path: 'updateEmp', Component: UpdateEmployee },
      { path: 'EmpList', Component: Employee },
      { path: 'addFcty', Component: AddFaculty },
      { path: 'updateFcty', Component: UpdateFaculty },
      { path: 'fctyList', Component: Faculty },
    ]
  }
])

function App() {
  return (
    <RouterProvider router={myRouter} />
  );
}

export default App;
