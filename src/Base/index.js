import React, { useState, useEffect } from "react";
import useOutsideClicker from "../useOutsideClicker";
import useSelect from "../useSelect";
import TextInput from "../textInput";
import FormLabel from "../formLabel";
import { XIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// https://codesandbox.io/s/react-select-dropdown-bwlor?file=/src/SearchSelect.js
// https://codesandbox.io/s/elegant-pine-9hjpb?file=/src/SearchSelect/index.js

const Index = ({
  id,
  label,
  value,
  onChange,
  multiple = false,
  dataSource,
  OptionRenderer,
  ShowSelected = null,
  placeholder = "Type someting...",
  defaultSelected = [],
  disabled = false,
  DropDownArrow,
}) => {
  const {
    open,
    setOpen,
    query,
    setQuery,
    options,
    addOrRemove,
    selected,
    setSelected,
  } = useSelect(onChange, dataSource, defaultSelected);

  const visRef = useOutsideClicker(() => {
    setOpen(false);
  });

  return (
    <div style={disabled ? { pointerEvents: "none", opacity: "0.5" } : {}}>
      <FormLabel
        htmlFor={id}
        labelCorner={() => {
          if (selected.length && !open) {
            return (
              <span
                className="text-sm text-gray-900 cursor-pointer dark:text-white"
                onClick={() => setSelected([])}
              >
                Clear
              </span>
            );
          } else if (open) {
            return (
              <span
                className="text-sm text-gray-900 cursor-pointer dark:text-white"
                onClick={() => setOpen(false)}
              >
                Close
              </span>
            );
          } else {
            return <></>;
          }
        }}
      >
        {label}
      </FormLabel>

      {/* Start Element */}
      <div className="mt-1">
        {/* Start Default */}
        {open === false && (
          <div
            className={classNames(
              "relative block w-full rounded-md sm:text-sm border py-2 px-3 cursor-pointer",
              "border-gray-300 dark:border-gray-700 text-black dark:text-white",
              {
                "dark:bg-black bg-white focus:ring-blue-500 focus:border-blue-500": true,
              }
            )}
            onClick={() => setOpen(true)}
          >
            <ShowSelected selected={selected} />
            {DropDownArrow}
          </div>
        )}
        {/* End Default */}

        {open === true && (
          <div className="relative" ref={visRef}>
            {/* Start Input */}
            <div>
              <TextInput
                autoFocus={true}
                placeholder={placeholder}
                defaultValue={(value && value.label) || query}
                onChange={(e) => {
                  setQuery(e);
                }}
              />
              <div className={` ${!open ? "arrow" : null}`} />
            </div>
            {/* End Input */}

            {/* Start Dropdown */}
            <div className="absolute z-50 block w-full overflow-auto bg-white border border-gray-300 rounded-md shadow dark:bg-black max-h-32 dark:border-gray-700">
              {options.map((option) => (
                <div
                  onClick={() => {
                    addOrRemove(multiple, option);
                  }}
                  key={`option${option.value}`}
                >
                  <OptionRenderer value={option} selected={selected} />
                </div>
              ))}
            </div>
            {/* End Dropdown */}
          </div>
        )}
      </div>
      {/* End Element */}
    </div>
  );
};

export default Index;
