import { useContext as useReactContext, createContext } from 'react';

export const Context = createContext();

export default function useContext() { return useReactContext(Context); } 