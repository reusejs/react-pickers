import { useState, useEffect } from "react";
import React from "react";
import SelectBase from "./base";
import { BaseInput as TextInput } from "@reusejs/react-text-inputs";
// import TextInput from "../textInput";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import "../tailwind.css";

export default function Default(props) {
  return (
    <SelectBase
      SelectedDataRenderer={SelectedDataRenderer}
      OptionsRenderer={OptionsRenderer}
      SearchRenderer={SearchRenderer}
      {...props}
    />
  );
}

const OptionsRenderer = ({ value, selected }) => {
  const [found, setFound] = useState(false);

  useEffect(() => {
    let localFound = selected.some((current) => current.value === value.value);
    setFound(localFound === false ? false : true);
  }, [selected]);

  return (
    <div className="relative flex flex-row items-center p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700">
      <span className="flex flex-row items-center">
        {value.avatar && (
          <img className="h-4 mr-2" src={value.avatar} alt={value.label} />
        )}
        <span className="text-sm text-gray-900 dark:text-gray-200">
          {value.label}
        </span>
      </span>
      {found === true && (
        <span className="absolute inset-y-0 right-0 flex items-center pr-4">
          <CheckIcon className="w-5 h-5 text-gray-900 dark:text-white" />
        </span>
      )}
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
