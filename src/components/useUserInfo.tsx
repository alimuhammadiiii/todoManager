import {
  createContext,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useState,
  useContext,
} from "react";

export type Username = string;

export const UserContext = createContext<
  [Username | undefined, Dispatch<SetStateAction<Username | undefined>>]
>([undefined, () => {}]);

export function UserContextProvider({ children }: PropsWithChildren) {
  const userState = useState<undefined | Username>(undefined);
  return <UserContext.Provider value={userState}>{children}</UserContext.Provider>;
}

export const useDataUser = () => useContext(UserContext)?.[0];
export const useSetDataUser = () => useContext(UserContext)?.[1];
