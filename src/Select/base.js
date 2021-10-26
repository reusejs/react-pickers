import React from "react";
import useOutsideClicker from "../useOutsideClicker";
import useSelect from "../useSelect";
import TextInput from "../textInput";
import FormLabel from "../formLabel";
import { ArrowSmDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

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

  const componentWrapperClasses = props.componentWrapperClasses || "";
  const labelWrapperClasses =
    props.labelWrapperClasses || "flex justify-between";
  const disabledStyles =
    props.disabledStyles || "pointer-events-none opacity-50";

  const labelTextClasses =
    props.labelTextClasses ||
    "block text-sm font-normal text-gray-900 dark:text-gray-200";

  const clearTextClasses =
    props.clearTextClasses ||
    "text-sm text-gray-900 cursor-pointer dark:text-white";

  const closeTextClasses =
    props.closeTextClasses ||
    "text-sm text-gray-900 cursor-pointer dark:text-white";

  const closedPickerClasses =
    props.closedPickerClasses ||
    "relative block w-full rounded-md sm:text-sm border py-2 px-3 cursor-pointer border-gray-300 dark:border-gray-700 text-black dark:text-white dark:bg-black bg-white focus:ring-blue-500 focus:border-blue-500";

  const pickerWrapperClasses = props.pickerWrapperClasses || "mt-1";

  const optionsWrapperClasses =
    props.optionsWrapperClasses ||
    "absolute z-50 block w-full overflow-auto bg-white border border-gray-300 rounded-md shadow dark:bg-black max-h-32 dark:border-gray-700";

  const noDataWrapperClasses =
    props.noDataWrapperClasses || "h-32 flex justify-center items-center";

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
        {selected.length > 0 && !open && (
          <span className={clearTextClasses} onClick={() => setSelected([])}>
            {props.clearText || <LabelClearComponent />}
          </span>
        )}

        {open && (
          <span className={closeTextClasses} onClick={() => setOpen(false)}>
            {props.closeComponent || <LabelCloseComponent />}
          </span>
        )}
      </div>
      {/* End Label */}

      {/* Begin Picker */}
      <div className={pickerWrapperClasses}>
        {open === false && (
          <div className={closedPickerClasses} onClick={() => setOpen(true)}>
            <SelectedDataRenderer selected={selected} />
            {props.suffixIcon || (
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ArrowSmDownIcon className="w-5 h-5 text-gray-400" />
              </span>
            )}
          </div>
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
