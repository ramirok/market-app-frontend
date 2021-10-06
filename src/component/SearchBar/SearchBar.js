import React, { useEffect, useState, useRef, useCallback } from "react";

import { useClickOutsideListenerRef, useForm } from "../../utils/customHooks";
import { fetchService } from "../../utils/fetchServices";
import { capitalizeName } from "../../utils/helpers";
import ProductModal from "../UI/Modal/ProductModal/ProductModal";
import Button from "../Button/Button";
import Spinner from "../UI/Spinner/Spinner";
import classes from "./SearchBar.module.css";

// SVG imports
import { ReactComponent as SearchIcon } from "../../assets/magnifying-simple.svg";

const SearchBar = () => {
  // ref for useClickOutside hook
  const wrapperRef = useRef(null);

  // only runs useClickOutside hook when runHook = true
  //will allow to click anywhere ouside of the search bar to remove suggestions
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

  // product data for modal
  const [modalData, setModalData] = useState({});

  // loading state for spinner
  const [isLoading, setIsLoading] = useState(false);

  // set suggestions fetched
  const [suggestions, setSuggestions] = useState([]);

  const searchHandler = () => {
    // fetch suggestions when search button has been clicked
    if (data.search.length > 0) {
      setIsLoading(true);
      fetchService({
        method: "get",
        url: `products/autosuggest?q=${data.search}`,
      }).then((response) => {
        setSuggestions(response);
        setIsLoading(false);
        setRunHook(true);
      });
    }
  };

  const { handleSubmit, handleChange, data } = useForm({
    onSubmit: searchHandler,

    initialValues: {
      search: "",
    },
  });

  useEffect(() => {
    // if user has typed, fetch suggestions after 500ms
    if (data.search.length > 0) {
      setIsLoading(true);
      let timer;
      timer = setTimeout(
        () =>
          fetchService({
            method: "get",
            url: `products/autosuggest?q=${data.search}`,
          }).then((response) => {
            setSuggestions(response);
            setIsLoading(false);
            setRunHook(true);
          }),
        500
      );
      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setIsLoading(false);
    }
  }, [data.search]);

  return (
    <>
      {/* renders modal when is open = true */}
      {isOpen && <ProductModal setIsOpen={setIsOpen} modalData={modalData} />}

      <div className={classes.Container} ref={wrapperRef}>
        <form className={classes.SearchBarContainer} onSubmit={handleSubmit}>
          <input
            className={classes.SearchBar}
            placeholder="Search..."
            value={data.search}
            onChange={handleChange("search")}
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

          <Button classFromProps={classes.Button} onClick={searchHandler}>
            {isLoading ? (
              <Spinner white />
            ) : (
              <SearchIcon fill="white" height="60%" width="3rem" />
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
