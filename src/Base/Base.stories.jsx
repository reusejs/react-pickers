import React from 'react';
import LoaderIcon from "../loaderIcon";
import Base from './index';

export default {
    title: 'Buttons/Base',
    component: Base,
    argTypes: {
        onClick: {
            type: { name: 'string', required: true },
            description: "Callback function to the button click",
            table: null,
            control: {
                type: null,
            },
        },
        type: {
            description: "Type of the button",
            table: {
                type: null,
                defaultValue: { summary: 'button' },
            },
            options: ['button', 'submit'],
            control: {
                type: 'inline-radio',
            },
        },
        busy: {
            description: "To show loader for the button",
            defaultValue: false,
            table: null,
            control: {
                type: 'boolean',
            },
        },
        busyText: {
            description: "Text to be shown when button is busy",
            defaultValue: "Processing..",
            table: {
                type: null,
                defaultValue: { summary: 'Processing..' },
            },
            control: {
                type: 'text',
            },
        },
        loaderIcon: {
            description: "A react component to override default loader icon",
            defaultValue: <LoaderIcon />,
            table: null,
            control: {
                type: null,
            },
        },
        alignmentStyles: {
            description: "List of tailwind classes to control alignment",
            table: {
                type: 'string',
                defaultValue: { summary: 'flex justify-center items-center font-normal text-sm focus:outline-none rounded shadow-sm' },
            },
            control: {
                type: 'text',
            },
        },
        fontStyles: {
            description: "List of tailwind classes to control font",
            table: {
                type: 'string',
                defaultValue: { summary: 'font-sans' },
            },
            control: {
                type: 'text',
            },
        },
        colorStyles: {
            description: "List of tailwind classes to control color",
            table: {
                type: 'string',
                defaultValue: { summary: 'bg-blue-500 hover:bg-blue-700 text-white disabled:opacity-50' },
            },
            control: {
                type: 'text',
            },
        },
        paddingStyles: {
            description: "List of tailwind classes to control padding",
            table: {
                type: 'string',
                defaultValue: { summary: 'px-4 py-2' },
            },
            control: {
                type: 'text',
            },
        },
        borderStyles: {
            description: "List of tailwind classes to control border",
            table: {
                type: 'string',
                defaultValue: { summary: 'border border-transparent' },
            },
            control: {
                type: 'text',
            },
        },
        widthStyles: {
            description: "List of tailwind classes to control width",
            table: {
                type: 'string',
                defaultValue: { summary: '' },
            },
            control: {
                type: 'text',
            },
        },
        disabledStyles: {
            description: "List of tailwind classes to control when button is disabled",
            table: {
                type: 'string',
                defaultValue: { summary: 'disabled:opacity-50' },
            },
            control: {
                type: 'text',
            },
        }
    }
};

const Template = (args) => <Base {...args}>Hello</Base>;

export const Default = Template.bind({});

Default.args = {
    onClick: () => {
        alert("I am clicked")
    }
};

export const BusyButton = Template.bind({});

BusyButton.args = {
    busy: true,
    busyText: "I am Busy.."
};

export const Disabled = Template.bind({});

Disabled.args = {
    disable: true,
    onClick: () => {
        alert("I can't be clicked")
    }
};

