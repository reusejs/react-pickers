import FormLabel from "./formLabel";
import { useRef, useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function BaseInput({
  label = null,
  id = "",
  type = "text",
  placeholder = "Enter text",
  onChange,
  defaultValue = "",
  disabled = false,
  labelCorner = () => {},
  errorText = "",
  inputLeftIcon = null,
  inputRightIcon = null,
  ...props
}) {
  const myRef = useRef(null);

  return (
    <div>
      {label !== null && (
        <FormLabel htmlFor={id} labelCorner={labelCorner}>
          {label}
        </FormLabel>
      )}
      <div
        className={classNames("relative", {
          "mt-1": label !== null,
        })}
      >
        {inputLeftIcon !== null && (
          <div className="absolute inset-y-0 top-0 left-0 flex items-center pl-3 pointer-events-none">
            {inputLeftIcon}
          </div>
        )}
        <input
          ref={myRef}
          type={type}
          id={id}
          className={classNames(
            "block w-full rounded text-sm px-3 py-2",
            {
              "border-red-600 text-red-900 dark:text-red-200 placeholder-red-300":
                errorText !== "",
            },
            {
              "border-gray-300 dark:border-gray-700 text-black dark:text-white":
                errorText === "",
            },
            {
              "dark:bg-black bg-white focus:ring-blue-400 focus:border-blue-400 shadow outline-none": true,
            },
            {
              "pl-10": inputLeftIcon,
            },
            {
              "pr-10": inputRightIcon,
            }
          )}
          placeholder={placeholder}
          value={defaultValue}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
        {inputRightIcon !== null && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {inputRightIcon}
          </div>
        )}
      </div>
      {errorText !== "" && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {errorText}
        </p>
      )}
    </div>
  );
}
