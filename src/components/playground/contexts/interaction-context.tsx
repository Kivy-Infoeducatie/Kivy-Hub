import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react';

interface InteractionContextInterface {
  locked: boolean;
  setLocked: Dispatch<SetStateAction<boolean>>;
}

export const interactionContext =
  createContext<InteractionContextInterface | null>(null);

export function useInteractionContext() {
  return useContext(interactionContext)!;
}

export function InteractionContextProvider({
  children
}: {
  children: ReactNode;
}) {
  const [locked, setLocked] = useState<boolean>(false);

  return (
    <interactionContext.Provider
      value={{
        locked,
        setLocked
      }}
    >
      {children}
    </interactionContext.Provider>
  );
}
