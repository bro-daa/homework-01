import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import categoryService from "../../services/category.service";

const CategoryContext = React.createContext();

export const useCategories = () => {
  return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    async function getCategoriesList() {
      try {
        const { content } = await categoryService.get();
        setCategories(content);
        setLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    }
    getCategoriesList();
  }, []);

  function errorCatcher(error) {
    console.log(error);
    const { message } = error.response.data;
    setError(message);
  }

  function getCategory(id) {
    return categories.find((p) => p._id === id);
  }

  return (
    <CategoryContext.Provider value={{ isLoading, categories, getCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
