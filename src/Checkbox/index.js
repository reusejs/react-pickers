import { useState, useEffect } from "react";
import React from "react";
import CheckboxBase from "./base";
import TextInput from "../textInput";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import "../tailwind.css";

export default function Default(props) {
  return (
    <CheckboxBase
      SelectedDataRenderer={SelectedDataRenderer}
      OptionsRenderer={OptionsRenderer}
      SearchRenderer={SearchRenderer}
      optionsWrapperClasses="space-y-4"
      {...props}
    />
  );
}

const OptionsRenderer = ({ value, selected, props }) => {
  const [found, setFound] = useState(false);

  useEffect(() => {
    let localFound = selected.some((current) => current.value === value.value);
    setFound(localFound === false ? false : true);
  }, [selected]);

  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={value.value}
          name={props.name}
          type="checkbox"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
          checked={found === true}
          onChange={() => {}}
        />
      </div>
      <div className="ml-3 text-sm">
        <label
          htmlFor={value.value}
          className="ml-3 block text-sm font-medium text-gray-700"
        >
          {value.label}
        </label>
      </div>
    </div>
  );
};

const SearchRenderer = ({ query, onSearch, cancelSearch }) => {
  return (
    <div>
      <TextInput
        defaultValue={query}
        placeholder="Type someting..."
        onChange={(e) => {
          onSearch(e);
        }}
      />

      <span
        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
        onClick={() => {
          cancelSearch();
        }}
      >
        <XIcon className="w-5 h-5 text-gray-400" />
      </span>
    </div>
  );
};

const SelectedDataRenderer = ({ selected }) => {
  const [text, setText] = useState("None Selected");

  useEffect(() => {
    if (selected.length > 0) {
      let tempText = selected.map((val) => val.label).join("; ");
      setText(tempText);
    } else {
      setText("None Selected");
    }
  }, [selected]);

  return <>{text}</>;
};
