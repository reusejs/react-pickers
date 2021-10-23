import React from 'react';

import Gray from './index';

export default {
    title: 'Buttons/Gray',
    component: Gray,
};

const Template = (args) => <Gray {...args}>Hello Mr. Gray</Gray>;

export const Default = Template.bind({});

Default.args = {
    busy: false,
    busyText: "Processing..",
    disable: false,
};