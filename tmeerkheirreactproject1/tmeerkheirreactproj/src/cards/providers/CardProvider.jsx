import { node } from "prop-types";
import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";


const CardContext = createContext();

export default function CardProvider({ children }) {
  const [card, setCard] = useState(null);
  

  const value = useMemo(
    () => ({ card, setCard }),
    [card]
  );

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
}


CardProvider.propTypes = {
  children: node.isRequired,
};
