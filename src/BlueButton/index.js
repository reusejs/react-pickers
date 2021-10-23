import React from "react";
import Base from "../Base";

export default (props) => {
  return (
    <Base
      colorStyles="bg-blue-600 hover:bg-blue-700 text-white"
      borderStyles="border border-transparent"
      {...props}
    />
  );
};
