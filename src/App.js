import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import './App.css';
import AddEmployee from './components/AddEmployee';
import Employee from './components/Employee';
import UpdateEmployee from './components/UpdateEmployee';

const myRouter = createBrowserRouter([
  {
    path: '', Component: Dashboard, children: [
      { path: '', Component: Employee },
      { path: 'addEmp', Component: AddEmployee },
      { path: 'updateEmp', Component: UpdateEmployee },
      { path: 'EmpList', Component: Employee }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={myRouter} />
  );
}

export default App;
