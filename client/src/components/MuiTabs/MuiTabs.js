// @flow

import * as React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

import TabContainer from './TabContainer';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 'auto',
    },
});

type TabContent = {
    title: string,
    body: React.Node,
    key: string,
};

type MuiTabsProps = {
    classes: {
        root: string,
    },
    theme: {
        direction: string,
    },
    tabs: Array<TabContent>,
    fullWidth: boolean,
    scrollable: boolean,
    centered: boolean,
    index?: number,
};

type MuiTabsState = {
    value: number
};

class MuiTabs extends React.Component<MuiTabsProps, MuiTabsState> {
    constructor(props) {
        super(props);
        this.state = {
            value: props.index || 0
        };
    }

    static defaultProps = {
        fullWidth: true,
        scrollable: false,
        centered: true,
        index: null,
    }
  
    handleChange = (event, value) => {
      this.setState({ value });
    };
  
    handleChangeIndex = index => {
      this.setState({ value: index });
    };
  
    render() {
        const { 
            classes, 
            theme,
            fullWidth,
            scrollable,
            centered,
        } = this.props;
        const tabs = this.props.tabs || [];
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth={fullWidth}
                        centered={centered}
                        scrollable={scrollable}
                        scrollButtons={scrollable ? "auto" : ""}
                        >
                        {tabs.map(({title, key}) => <Tab label={title} key={key} />)}
                    </Tabs>
                </AppBar>
                    <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                    >
                    {tabs.map(({body, key}) => (
                        <TabContainer key={key} direction={theme.direction}>
                            {body}
                        </TabContainer>
                        )
                    )}
                </SwipeableViews>
            </div>
        );
    }
}
  
export default withStyles(styles, { withTheme: true })(MuiTabs);