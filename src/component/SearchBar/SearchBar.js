import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  useInputData,
  useClickOutsideListenerRef,
} from "../../utils/customHooks";
import { getSuggestions } from "../../utils/fetchServices";
import { capitalizeName } from "../../utils/helpers";
import ProductModal from "../UI/Modal/ProductModal/ProductModal";
import Button from "../Button/Button";
import NavBar from "../NavBar/NavBar";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./SearchBar.module.css";

const SearchBar = () => {
  // ref for useClickOutside hook
  const wrapperRef = useRef(null);

  // only runs useClickOutside hook when runHook = true
  const [runHook, setRunHook] = useState(false);

  // cleans suggestions if clicked outside
  useClickOutsideListenerRef(
    wrapperRef,
    useCallback(() => {
      setSuggestions([]);
      setRunHook(false);
    }, []),
    runHook
  );

  // open state for modal
  const [isOpen, setIsOpen] = useState(false);
  // Data for product modal
  const [modalData, setModalData] = useState({});

  // loading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // customHook useInputData returns: type, value, onChange handler
  const search = useInputData("text");

  // set suggestions fetched
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // if user has typed, fetch suggestions
    if (search.value.length > 0) {
      setIsLoading(true);
      getSuggestions(search.value).then((response) => {
        setSuggestions(response);
        setIsLoading(false);
        setRunHook(true);
      });
    } else {
      setSuggestions([]);
    }
  }, [search.value]);

  const searchHandler = () => {
    // fetch suggestions when search button clicked
    if (search.value.length > 0) {
      setIsLoading(true);
      getSuggestions(search.value).then((response) => {
        setSuggestions(response);
        setIsLoading(false);
        setRunHook(true);
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
        <input
          className={classes.SearchBar}
          {...search}
          placeholder="Search..."
        />
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

        {/* Button shows spinner if isLoading = true */}
        <Button
          text={isLoading ? <Spinner white /> : "Search"}
          classFromProps={classes.Button}
          onClick={searchHandler}
        />
        <NavBar />
      </div>
    </>
  );
};

export default SearchBar;
