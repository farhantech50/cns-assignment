import { createContext, useContext, useState } from "react";

export const TableUpdateContext = createContext();

export const useTableUpdateContext = () => {
  return useContext(TableUpdateContext);
};

export const TableUpdateContextProvider = ({ children }) => {
  const [tableUpdate, setTableUpdate] = useState(false);

  return (
    <TableUpdateContext.Provider
      value={{
        tableUpdate,
        setTableUpdate,
      }}
    >
      {children}
    </TableUpdateContext.Provider>
  );
};
