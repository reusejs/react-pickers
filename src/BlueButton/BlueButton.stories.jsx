import React from 'react';

import Blue from './index';

export default {
    title: 'Buttons/Blue',
    component: Blue,
};

const Template = (args) => <Blue {...args}>Hello</Blue>;

export const Default = Template.bind({});

Default.args = {
    busy: false,
    busyText: "Processing..",
    disable: false,
};