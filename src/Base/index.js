import React from "react";
import LoaderIcon from "../loaderIcon";
import "../tailwind.css";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = function Button({
  type = "button",
  onClick = () => {},
  loaderIcon = <LoaderIcon />,
  disable,
  children,
  busy = false,
  busyText = "Processing..",
  ...props
}) {
  const alignmentStyles =
    props.alignmentStyles ||
    "flex justify-center items-center font-normal text-sm focus:outline-none rounded shadow-sm";

  const fontStyles = props.fontStyles || "font-sans";

  const colorStyles =
    props.colorStyles ||
    "bg-blue-500 hover:bg-blue-700 text-white disabled:opacity-50";

  const paddingStyles = props.paddingStyles || "px-4 py-2";

  const borderStyles = props.borderStyles || "border border-transparent";

  const widthStyles = props.widthStyles || "";
  const disabledStyles = props.disabledStyles || "disabled:opacity-50";

  return (
    <button
      type={type}
      className={classNames(
        disabledStyles,
        alignmentStyles,
        fontStyles,
        colorStyles,
        paddingStyles,
        borderStyles,
        widthStyles
      )}
      onClick={onClick}
      disabled={disable || busy}
    >
      {busy && (
        <>
          {busyText}
          {loaderIcon}
        </>
      )}
      {!busy && children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
};

export default Button;
