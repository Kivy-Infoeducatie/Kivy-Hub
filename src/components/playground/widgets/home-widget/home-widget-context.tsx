import { createContext, ReactNode, useContext, useState } from 'react';

interface HomeWidgetContextValue {
  isAIMode: boolean;
  setIsAIMode: (value: boolean) => void;
  selectedIngredient: string | null;
  setSelectedIngredient: (value: string | null) => void;
}

const homeWidgetContext = createContext<HomeWidgetContextValue | null>(null);

export function useHomeWidget() {
  const ctx = useContext(homeWidgetContext);

  if (!ctx) {
    throw new Error('useHomeWidget must be used within a HomeWidgetProvider');
  }

  return ctx;
}

export function HomeWidgetProvider({ children }: { children: ReactNode }) {
  const [isAIMode, setIsAIMode] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(
    null
  );

  return (
    <homeWidgetContext.Provider
      value={{
        isAIMode,
        setIsAIMode,
        selectedIngredient,
        setSelectedIngredient
      }}
    >
      {children}
    </homeWidgetContext.Provider>
  );
}
