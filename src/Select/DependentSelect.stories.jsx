import React, { useState, useRef, useImperativeHandle } from "react";
import Select from "./index";

const masterCategories = [
  { label: "Javascript", value: "javascript" },
  { label: "PHP", value: "php" },
];

const masterLibraries = [
  { label: "ReactJS", value: "react", category: "javascript" },
  { label: "NextJS", value: "next", category: "javascript" },
  { label: "Laravel", value: "laravel", category: "php" },
  { label: "Symphony", value: "symphony", category: "php" },
];

export default {
  title: "Pickers/DependentSelect",
  component: Select,
};

const Template = () => {
  const [category, setCategory] = useState([]);
  const [library, setLibrary] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  return (
    <div className="w-64">
      <div>
        <Select
          label="Select Category"
          dataSource={() => {
            return masterCategories;
          }}
          onChange={(v) => {
            setCategory([v]);
            setRefreshCounter((curr) => curr + 1);
            setLibrary([]);
          }}
        />
      </div>

      <div>
        <Select
          label="Select Library"
          refresh={refreshCounter}
          defaultSelected={library}
          dataSource={() => {
            if (category.length > 0) {
              let libraries = masterLibraries.filter(
                (l) => l.category === category[0].value
              );
              return libraries;
            } else {
              return [];
            }
          }}
          onChange={(v) => {
            console.log("v", v);
            setLibrary([v]);
          }}
        />
      </div>
    </div>
  );
};

export const Single = Template.bind({});

Single.args = {
  label: "Select Continent",
  dataSource: (q) => {
    console.log("data Source");
    return fetchContinents(q);
  },
  onChange: (v) => {
    console.log(v);
  },
};
