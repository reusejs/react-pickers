import { useEffect, useRef } from "react";

export default function useOutsideClicker(callback) {
  const visRef = useRef(null);

  const handleClickOutside = (event) => {
    if (visRef.current && !visRef.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return visRef;
}
