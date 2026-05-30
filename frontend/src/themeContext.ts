import { createContext } from "react";

export type ColorModeContextType = {
  mode: "light" | "dark";
  toggleColorMode: () => void;
};

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: "light",
  toggleColorMode: () => undefined
});
