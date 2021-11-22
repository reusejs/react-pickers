import React from "react";
import "./tailwind.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function index({ children, labelCorner = () => {}, ...props }) {
  return (
    <div className="flex justify-between">
      <label
        htmlFor={props.htmlFor}
        className={classNames(
          props.formLabelClasses ||
            "block text-sm font-normal text-gray-900 dark:text-gray-200",
          props.errorText === undefined ? "text-gray-900 dark:text-white" : "",
          props.errorText !== undefined ? "text-red-600 dark:text-red-200" : ""
        )}
        // className="block text-sm font-normal text-gray-900 dark:text-gray-200"
      >
        {children}
      </label>
      {labelCorner()}
    </div>
  );
}
