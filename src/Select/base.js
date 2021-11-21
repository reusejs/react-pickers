import React from "react";
import useOutsideClicker from "../useOutsideClicker";
import useSelect from "../useSelect";
import { ArrowSmDownIcon } from "@heroicons/react/solid";
import { classNames } from "@reusejs/react-utils";

const LabelCloseComponent = () => {
  return "Close";
};

const LabelClearComponent = () => {
  return "Clear";
};

const NoDataComponent = () => {
  return <div className="h-32 flex justify-center items-center">No Data</div>;
};

const Index = ({
  id,
  OptionsRenderer,
  SelectedDataRenderer = null,
  SearchRenderer = null,
  disabled = false,
  onChange,
  multiple = false,
  dataSource,
  defaultSelected = [],
  errorText = undefined,
  ...props
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
    <div
      className={classNames(
        props.componentWrapperClasses || "",
        disabled ? props.disabledStyles || "pointer-events-none opacity-50" : ""
      )}
    >
      {/* Begin Label */}
      <div
        className={classNames(
          props.labelWrapperClasses || "flex justify-between"
        )}
      >
        <label
          htmlFor={id}
          className={classNames(
            props.labelTextClasses ||
              "block text-sm font-normal text-gray-900 dark:text-gray-200"
          )}
        >
          {props.label || "Select an Option"}
        </label>
        {selected.length > 0 && !open && (
          <span
            className={classNames(
              props.clearTextClasses ||
                "text-sm text-gray-900 cursor-pointer dark:text-white"
            )}
            onClick={() => setSelected([])}
          >
            {props.clearText || <LabelClearComponent />}
          </span>
        )}

        {open && (
          <span
            className={classNames(
              props.closeTextClasses ||
                "text-sm text-gray-900 cursor-pointer dark:text-white"
            )}
            onClick={() => setOpen(false)}
          >
            {props.closeComponent || <LabelCloseComponent />}
          </span>
        )}
      </div>
      {/* End Label */}

      {/* Begin Picker */}
      <div className={classNames(props.pickerWrapperClasses || "mt-1")}>
        {open === false && (
          <div
            className={classNames(
              props.closedPickerClasses ||
                "relative block w-full rounded-md sm:text-sm py-2 px-3 cursor-pointer dark:bg-black bg-white focus:ring-blue-500 focus:border-blue-500",
              errorText === undefined
                ? props.noErrorClasses ||
                    "border border-gray-400 dark:border-gray-50 text-black dark:text-white"
                : "",
              errorText !== undefined
                ? props.withErrorClasses ||
                    "border border-red-600 dark:border-red-200 text-red-900 dark:text-red-200 placeholder-red-300"
                : ""
            )}
            onClick={() => setOpen(true)}
          >
            <SelectedDataRenderer selected={selected} />
            {props.suffixIcon || (
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ArrowSmDownIcon className="w-5 h-5 text-gray-400" />
              </span>
            )}
          </div>
        )}

        {open === false && errorText !== "" && (
          <p className="mt-2 text-sm text-red-600">{errorText}</p>
        )}

        {open === true && (
          <div className="relative" ref={visRef}>
            <SearchRenderer
              query={query}
              onSearch={(v) => {
                setQuery(v);
              }}
              cancelSearch={() => setOpen(false)}
            />

            <div
              className={classNames(
                props.optionsWrapperClasses ||
                  "absolute z-50 block w-full overflow-auto bg-white border border-gray-300 rounded-md shadow dark:bg-black max-h-32 dark:border-gray-700"
              )}
            >
              {options.length > 0 && (
                <>
                  {options.map((option) => (
                    <div
                      onClick={() => {
                        addOrRemove(multiple, option);
                      }}
                      key={`option${option.value}`}
                    >
                      <OptionsRenderer value={option} selected={selected} />
                    </div>
                  ))}
                </>
              )}

              {options.length === 0 && (
                <>
                  {props.noDataComponent || (
                    <NoDataComponent query={query} options={options} />
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {/* End Element */}
    </div>
  );
};

export default Index;
