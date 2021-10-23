import React from "react";
import "./tailwind.css";

export default function index({ children, labelCorner = () => {}, ...props }) {
  return (
    <div className="flex justify-between">
      <label
        htmlFor={props.htmlFor}
        className="block text-sm font-normal text-gray-900 dark:text-gray-200"
      >
        {children}
      </label>
      {labelCorner()}
    </div>
  );
}
