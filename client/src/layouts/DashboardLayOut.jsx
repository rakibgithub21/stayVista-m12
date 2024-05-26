
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';

const DashboardLayOut = () => {
    return (
        <div>
            {/* sidebar */}
            <div className='relative md:flex '>
                <Sidebar></Sidebar>
            </div>
            
            <div className='flex-1 md:ml-64'>
                <div className="p-5">
                  <Outlet></Outlet>
              </div>
            </div>
            {/* outlet */}
        </div>
    );
};

export default DashboardLayOut;