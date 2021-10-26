import { useState, useEffect } from "react";
import RadioBase from "./base";
import TextInput from "../textInput";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import "../tailwind.css";

export default function Default(props) {
  return (
    <RadioBase
      OptionsRenderer={OptionsRenderer}
      optionsWrapperClasses="space-y-4"
      {...props}
      multiple={false}
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
    <div className="flex items-center">
      <input
        id={value.value}
        name={props.name}
        type="radio"
        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        checked={found === true}
        onChange={() => {}}
      />
      <label
        htmlFor={value.value}
        className="ml-3 block text-sm font-medium text-gray-700"
      >
        {value.label}
      </label>
    </div>
  );
};
