import React, { createContext, useState } from "react";
/**
 * creates a react context instance
 */
export const HeaderContext = createContext();

/**
 *creates provider for header context to 
 share the values state among children of 
 provider 
 */
export const HeaderProvider = props => {
  const [values, setValues] = useState({
    searchTerm: "",
    searchType: ""
  });
  return (
    <HeaderContext.Provider value={[values, setValues]}>
      {props.children}
    </HeaderContext.Provider>
  );
};
