import React from 'react';
import Classes from './styles';
import ConnectLists from '../Lists/container';

const Dashboard = () => (
  <div className={ Classes.root }>
    <ConnectLists />
  </div>
);
Dashboard.displayName = 'Dashboard';


export default Dashboard;
