import {
  HomeMenu,
  setHomeMenuFn
} from '@/components/playground/widgets/home-widget/home-widget-types';
import { useEffect, useRef, useState } from 'react';
import { useTimerWidget } from '@/components/playground/widgets/timer-widget/timer-widget-context';
import { v4 as uuid } from 'uuid';
import { TimerStack } from '@/components/playground/widgets/timer-widget/timer-widget-types';
import { useScreenContext } from '@/lib/core/screens/screen-context';
import { useRecipeWidget } from '@/components/playground/widgets/recipe-widget/recipe-widget-context';
import {
  chickenDish,
  healthy,
  pizza,
  salad,
  soup
} from '@/components/playground/widgets/recipe-widget/recipes';
import { useSpeechRecognition } from '@/components/playground/widgets/speech-widget/speech-widget-context';

export function useMenu() {
  const { addTimer, stacks } = useTimerWidget();
  const { setSelectedScreen } = useScreenContext();
  const { recipe, setRecipe } = useRecipeWidget();
  const { startListening, setOnResult } = useSpeechRecognition();

  const recipeRef = useRef(recipe);

  useEffect(() => {
    recipeRef.current = recipe;
  }, [recipe]);


  console.log('recipe', recipe);

  const stacksRef = useRef<TimerStack[]>([]);

  useEffect(() => {
    stacksRef.current = stacks;
  }, [stacks]);

  // Function to transform API response to RecipeWidgetProps
  const transformApiRecipeToWidget = (apiRecipe: any) => {
    // Transform ingredients array from API format
    const ingredients = apiRecipe.ingredients?.map((ing: any) => {
      const parts = [];
      if (ing.quantity) parts.push(ing.quantity);
      if (ing.unit) parts.push(ing.unit);
      if (ing.name) parts.push(ing.name);
      return parts.join(' ');
    }) || [];

    return {
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Default food image
      title: apiRecipe.name,
      author: 'Food.com',
      steps: apiRecipe.steps || [],
      ingredients: ingredients,
      cookTime: apiRecipe.cooking_time ? `${apiRecipe.cooking_time} min` : 'N/A',
      nutritionalInfo: {
        calories: apiRecipe.calories || 0,
        protein: apiRecipe.protein || 0,
        carbs: apiRecipe.carbohydrates || 0,
        fat: apiRecipe.total_fat || 0
      },
      weight: apiRecipe.serving_size || 'N/A'
    };
  };

  // Function to transform current recipe to API format
  const transformWidgetRecipeToApi = (widgetRecipe: any) => {
    return {
      name: widgetRecipe.title,
      ingredients: widgetRecipe.ingredients || [],
      steps: widgetRecipe.steps || []
    };
  };

  // Function to call recipe action API
  const callRecipeActionApi = async (prompt: string) => {
    try {
      const currentRecipeForApi = transformWidgetRecipeToApi(recipeRef.current);
      const response = await fetch('http://localhost:8000/recipes/action', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          current_recipe: currentRecipeForApi
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const apiRecipe = await response.json();
      console.log('API Response:', apiRecipe);
      
      // Transform and set the new recipe
      const transformedRecipe = transformApiRecipeToWidget(apiRecipe);
      setRecipe(transformedRecipe);
      
    } catch (error) {
      console.error('Error calling recipe API:', error);
    }
  };

  const mainMenu: HomeMenu = {
    items: [
      {
        icon: <i className='fa fa-timer text-6xl' />,
        fn(setHomeMenu: setHomeMenuFn) {
          setHomeMenu(timerMenu);
        }
      },
      {
        icon: <i className='fa fa-ruler text-6xl' />,
        fn() {
          setSelectedScreen('measure');
        }
      },
      {
        icon: <i className='fa fa-knife text-6xl' />,
        fn(setHomeMenu: setHomeMenuFn) {
          setHomeMenu(cutterMenu);
        }
      },
      {
        icon: <i className='fa fa-brain text-6xl' />,
        fn(setHomeMenu: setHomeMenuFn) {
          // Directly start listening and call API when done
          setOnResult((text: string) => {
            console.log('Speech recognized:', text);
            callRecipeActionApi(text);
          });
          startListening();
        }
      },
      {
        icon: <i className='fa fa-gears text-6xl' />,
        fn() {
          setSelectedScreen('calibration');
        }
      }
    ],
    showBack: false
  };

  const timerMenu: HomeMenu = {
    items: [
      {
        text: '5m',
        fn() {
          addTimer(
            {
              id: uuid(),
              title: 'Timer',
              totalTime: 60 * 5
            },
            stacksRef.current?.[0]?.id ?? undefined
          );

          setHomeMenu(mainMenu);
        }
      },
      {
        text: '15m',
        fn(setHomeMenu: setHomeMenuFn) {
          addTimer(
            {
              id: uuid(),
              title: 'Timer',
              totalTime: 60 * 15
            },
            stacksRef.current?.[0]?.id ?? undefined
          );

          setHomeMenu(mainMenu);
        }
      },
      {
        text: '30m',
        fn(setHomeMenu: setHomeMenuFn) {
          addTimer(
            {
              id: uuid(),
              title: 'Timer',
              totalTime: 60 * 30
            },
            stacksRef.current?.[0]?.id ?? undefined
          );

          setHomeMenu(mainMenu);
        }
      },
      {
        text: '1h',
        fn(setHomeMenu: setHomeMenuFn) {
          addTimer(
            {
              id: uuid(),
              title: 'Timer',
              totalTime: 60 * 60
            },
            stacksRef.current?.[0]?.id ?? undefined
          );

          setHomeMenu(mainMenu);
        }
      }
    ],
    text: 'Timer',
    icon: <i className='fa fa-timer text-6xl' />,
    showBack: true,
    backFn(setHomeMenu: setHomeMenuFn) {
      setHomeMenu(mainMenu);
    }
  };

  const cutterMenu: HomeMenu = {
    items: [
      {
        icon: <i className='fa-regular fa-circle text-6xl' />,
        fn() {
          setSelectedScreen('circle-cut');
        }
      },
      {
        icon: <i className='fa-regular fa-rectangle text-6xl' />,
        fn() {
          setSelectedScreen('rectangle-cut');
        }
      }
    ],
    text: 'Cutter',
    icon: <i className='fa fa-knife text-6xl' />,
    showBack: true,
    backFn(setHomeMenu: setHomeMenuFn) {
      setHomeMenu(mainMenu);
    }
  };

  const recipeMenu: HomeMenu = {
    items: [
      {
        icon: <i className='fa fa-drumstick text-6xl' />,
        fn() {
          setRecipe(chickenDish);
        }
      },
      {
        icon: <i className='fa fa-salad text-6xl' />,
        fn() {
          setRecipe(salad);
        }
      },
      {
        icon: <i className='fa fa-soup text-6xl' />,
        fn() {
          setRecipe(soup);
        }
      },
      {
        icon: <i className='fa fa-pizza text-6xl' />,
        fn() {
          setRecipe(pizza);
        }
      },
      {
        icon: <i className='fa fa-avocado text-6xl' />,
        fn() {
          setRecipe(healthy);
        }
      }
    ],
    text: 'Recipes',
    icon: <i className='fa fa-book text-6xl' />,
    showBack: true,
    backFn(setHomeMenu: setHomeMenuFn) {
      setHomeMenu(mainMenu);
    }
  };

  const [homeMenu, setHomeMenu] = useState<HomeMenu>(mainMenu);

  return { homeMenu, setHomeMenu, mainMenu };
}
