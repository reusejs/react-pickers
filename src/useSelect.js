import React, { useEffect, useState } from "react";

export default function (
  onChange,
  dataSource,
  defaultSelected = [],
  valueKey = "value",
  defaultOpen = false,
  defaultQuery = "",
  refresh = ""
) {
  const [open, setOpen] = useState(defaultOpen);
  const [query, setQuery] = useState(defaultQuery);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(defaultSelected);

  const onTyping = async (query) => {
    let dropdownOptions = await dataSource(query);
    setOptions(dropdownOptions);
  };

  useEffect(() => {
    console.log("Refresh changed", refresh);
    onTyping();
  }, [refresh]);

  useEffect(() => {
    setSelected(defaultSelected);
  }, [defaultSelected.length]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onTyping(query);
    }, 200);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const addOrRemove = (multiple, option) => {
    if (!multiple) {
      setSelected([option]);
      onChange(option);
      setOpen(false);
    } else {
      if (!selected.some((current) => current[valueKey] === option[valueKey])) {
        if (multiple) {
          onChange([...selected, option]);
          setSelected([...selected, option]);
        }
      } else {
        let selectionAfterRemoval = selected;
        selectionAfterRemoval = selectionAfterRemoval.filter(
          (current) => current[valueKey] !== option[valueKey]
        );
        onChange([...selectionAfterRemoval]);
        setSelected([...selectionAfterRemoval]);
      }
    }
  };

  return {
    open,
    setOpen,
    query,
    setQuery,
    options,
    setOptions,
    selected,
    setSelected,
    addOrRemove,
  };
}
