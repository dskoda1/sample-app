import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = () => (
  <div>
    Please <Link to="/auth">login</Link> to see your workouts!
  </div>
);

export default LoggedOutView;
