import React from 'react';

import BlueOutlineButton from './index';

export default {
    title: 'Buttons/BlueOutlineButton',
    component: BlueOutlineButton,
};

const Template = (args) => <BlueOutlineButton {...args}>Hello</BlueOutlineButton>;

export const Default = Template.bind({});

Default.args = {
    busy: false,
    busyText: "Processing..",
    disable: false,
};