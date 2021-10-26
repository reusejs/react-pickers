import React from "react";
import useSelect from "../useSelect";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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
  ...props
}) => {
  const { options, addOrRemove, selected } = useSelect(
    onChange,
    dataSource,
    defaultSelected
  );

  const componentWrapperClasses = props.componentWrapperClasses || "";
  const labelWrapperClasses =
    props.labelWrapperClasses || "flex justify-between";
  const disabledStyles =
    props.disabledStyles || "pointer-events-none opacity-50";

  const labelTextClasses =
    props.labelTextClasses ||
    "block text-sm font-normal text-gray-900 dark:text-gray-200";

  const pickerWrapperClasses = props.pickerWrapperClasses || "mt-4";

  const optionsWrapperClasses =
    props.optionsWrapperClasses ||
    "absolute z-50 block w-full overflow-auto bg-white border border-gray-300 rounded-md shadow dark:bg-black max-h-32 dark:border-gray-700";

  return (
    <div
      className={classNames(
        componentWrapperClasses,
        disabled ? disabledStyles : ""
      )}
    >
      {/* Begin Label */}
      <div className={labelWrapperClasses}>
        <label htmlFor={id} className={labelTextClasses}>
          {props.label || "Select an Option"}
        </label>
      </div>
      {/* End Label */}

      {/* Begin Picker */}
      <div className={pickerWrapperClasses}>
        <div className={optionsWrapperClasses}>
          {options.length > 0 && (
            <>
              {options.map((option) => (
                <div
                  onClick={() => {
                    addOrRemove(multiple, option);
                  }}
                  key={`option${option.value}`}
                >
                  <OptionsRenderer
                    value={option}
                    selected={selected}
                    props={props}
                  />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {/* End Element */}
    </div>
  );
};

export default Index;
