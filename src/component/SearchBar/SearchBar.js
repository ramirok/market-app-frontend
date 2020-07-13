import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  useInputData,
  useClickOutsideListenerRef,
} from "../../utils/customHooks";
import { capitalizeName } from "../../utils/helpers";
import ProductModal from "../UI/Modal/ProductModal/ProductModal";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import classes from "./SearchBar.module.css";

// SVG imports
import { ReactComponent as Spinner } from "../../assets/spinner.svg";

const SearchBar = () => {
  // ref for useClickOutside hook
  const wrapperRef = useRef(null);

  // cleans suggestions if clicked outside
  useClickOutsideListenerRef(
    wrapperRef,
    useCallback(() => setSuggestions([]), [])
  );

  // Data for product modal
  const [modalData, setModalData] = useState({});

  // loading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // open state for modal
  const [isOpen, setIsOpen] = useState(false);

  // customHook useInputData returns: type, value, onChange handler
  const search = useInputData("text");

  // suggestions to the search
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // if user has typed, fetch suggestions
    if (search.value.length > 0) {
      setIsLoading(true);
      fetch(`http://localhost:3001/products/autosuggest?q=${search.value}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setIsLoading(false);
        });
    } else {
      setSuggestions([]);
    }
  }, [search.value]);

  const searchHandler = () => {
    // fetch suggestions when search button clicked
    if (search.value.length > 0) {
      setIsLoading(true);
      fetch(`http://localhost:3001/products/autosuggest?q=${search.value}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {/* Renders modal when is open = true */}
      {isOpen && (
        <ProductModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalData={modalData}
        />
      )}
      <div className={classes.SearchBarContainer} ref={wrapperRef}>
        <input className={classes.SearchBar} {...search} />
        <div className={classes.SuggestionContainer}>
          {/* Shows first 6 suggestions */}
          {suggestions.slice(0, 7).map((el) => (
            <div
              key={el.name}
              className={classes.Suggestion}
              onClick={() => {
                setModalData(el);
                setIsOpen(true);
              }}
            >
              {capitalizeName(el.name)}
            </div>
          ))}
        </div>
        {/* Button shows spinner if isLoading=true */}
        <Button
          text={
            isLoading ? (
              <Spinner
                stroke="#ffffff"
                strokeWidth="5"
                style={{
                  position: "absolute",
                  transform: "translate(-50%,-50%)",
                  height: "3.5rem",
                  width: "3.5rem",
                }}
              />
            ) : (
              "Search"
            )
          }
          classFromProps={isLoading ? classes.ButtonLoading : classes.Button}
          onClick={searchHandler}
        />
        <NavBar />
      </div>
    </>
  );
};

export default SearchBar;
