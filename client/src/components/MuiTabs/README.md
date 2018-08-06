# MuiTabs Component

This module contains a simplified reusable tabs component based on the [Material UI Tabs](https://material-ui.com/demos/tabs/) component family. The component takes a list of objects describing the content of each tab:

```javascript
import * as React from 'react';

type TabContent = {
    title: string,
    body: React.Node,
    key: string,
};
```

It can be used as simply as the following:

```javascript
render() {
    return (
        <MuiTabs tabs={[
            {
                title: "I'm a Tab!",
                key: "tab1",
                body: (
                    <div>
                        Your super awesome content here!
                    </div>
                )  
            },
        ]}
        />
    );
};
```

It also supports the following optional props with the defaults listed:

- `fullWidth`: Defaults `true`.
- `centered`: Defaults `true`; will expand out width of tabs to match available space
- `scrollable`: Defaults `false`

For more information on these properties see the [Material UI Tabs](https://material-ui.com/demos/tabs/) documentation.