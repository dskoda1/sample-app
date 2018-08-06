// @flow

import * as React from 'react';
import Typography from '@material-ui/core/Typography';

type TabContainerProps = {
    children: React.Node,
    direction: string,
}

const TabContainer = (props: TabContainerProps) => {
    return (
      <Typography component="div" dir={props.direction} style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}
  
export default TabContainer;
