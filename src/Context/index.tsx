import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react';

type ContextValue = {
  listItems: string[];
  setListItems: Dispatch<SetStateAction<string[]>>;
};

type Props = {
  children: ReactNode;
};

export const Context = createContext<ContextValue>({
  listItems: [],
  setListItems: () => null,
});

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [listItems, setListItems] = useState<string[]>([]);

  const value: ContextValue = {
    listItems,
    setListItems,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
