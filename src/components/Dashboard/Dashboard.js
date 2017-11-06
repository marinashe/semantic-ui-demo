import React from 'react';
import { Button } from 'semantic-ui-react';

const Dashboard = () => (
  <div>
    Async Loaded Dashboard Page
    <Button>
      Click Here
    </Button>
    <Button primary>Primary</Button>
  </div>
);
Dashboard.displayName = 'Dashboard';


export default Dashboard;
