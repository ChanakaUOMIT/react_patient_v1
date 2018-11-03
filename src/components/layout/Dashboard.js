import React from 'react';
import Sidebar from './Sidebar';
import Doctors from '../doctors/Doctors';

export default () => {
  return (
    <div className="row">
        <div className="col-md-10">
            <Doctors />
        </div>

        <div className="col-md-2">
            <Sidebar />
        </div>
      
    </div>
  )
}
