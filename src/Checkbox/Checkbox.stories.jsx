import React from 'react';
import Checkbox from './index';

const fetchContinents = (q = "") => {

    let continents = ['Africa', 'Antarctica', 'Asia', 'Oceania', 'Europe', 'North America', 'South America'];
    continents = continents.map((c) => {
        return {
            value: c.toLowerCase(),
            label: c
        }
    })

    if (q != "") {
        continents = continents.filter((c) => {
            if (c.value.search(q.toLocaleLowerCase()) > -1) {
                return c
            }
        })
    }

    return continents;
}

export default {
    title: 'Pickers/Checkbox',
    component: Checkbox,
};

const Template = (args) => <div className="w-64"><Checkbox {...args} /></div>

export const Single = Template.bind({});

Single.args = {
    label: 'Select Continent',
    dataSource: (q) => {
        return fetchContinents(q);
    },
    onChange: (v) => {
        console.log(v)
    },
    name: "continent"
};

export const SingleSelected = Template.bind({});

SingleSelected.args = {
    label: 'Select Continent',
    dataSource: (q) => {
        return fetchContinents(q);
    },
    defaultSelected: [
        { 'label': 'Asia', "value": 'asia' }
    ],
    onChange: (v) => {
        console.log(v)
    },
    name: "continent"
};

export const MultiSelect = Template.bind({});

MultiSelect.args = {
    label: 'Select Continent',
    dataSource: (q) => {
        return fetchContinents(q);
    },
    onChange: (v) => {
        console.log(v)
    },
    multiple: true
};


export const MultiSelected = Template.bind({});

MultiSelected.args = {
    label: 'Select Continent',
    dataSource: (q) => {
        return fetchContinents(q);
    },
    defaultSelected: [
        { 'label': 'Europe', "value": 'europe' },
        { 'label': 'Asia', "value": 'asia' }
    ],
    onChange: (v) => {
        console.log(v)
    },
    multiple: true
};
