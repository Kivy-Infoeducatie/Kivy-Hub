import { MenuItems } from '@/components/playground/widgets/home-widget/menu-items';
import MainSelectable from '@/components/playground/widgets/home-widget/main-selectable';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMenu } from '@/components/playground/widgets/home-widget/use-menu';
import { cn } from '@/lib/utils';
import { useRecipeWidget } from '@/components/playground/widgets/recipe-widget/recipe-widget-context';
import { useHomeWidget } from '@/components/playground/widgets/home-widget/home-widget-context';
import { motion } from 'framer-motion';
import {
  HomeItem,
  HomeMenu
} from '@/components/playground/widgets/home-widget/home-widget-types';
import { useInteractionContext } from '@/components/playground/contexts/interaction-context';
import { LockIcon } from 'lucide-react';

const ingredientMocks: Record<string, string[]> = {
  'Avocado Toast with Lemon': [
    'Avocado',
    'Lemon',
    'Tomato',
    'Sourdough',
    'Red Onion',
    'Olive Oil',
    'Chili Flakes',
    'Sea Salt'
  ],
  'Honey Garlic Chicken Thighs': [
    'Chicken',
    'Honey',
    'Garlic',
    'Soy Sauce',
    'Ginger',
    'Rice Vinegar',
    'Green Onion',
    'Sesame Oil'
  ],
  'Mediterranean Quinoa Salad': [
    'Quinoa',
    'Cucumber',
    'Feta',
    'Olives',
    'Cherry Tomato',
    'Red Onion',
    'Parsley',
    'Lemon Juice'
  ],
  'Creamy Tomato Basil Soup': [
    'Tomato',
    'Basil',
    'Cream',
    'Onion',
    'Garlic',
    'Vegetable Broth',
    'Butter'
  ],
  'Classic Margherita Pizza': [
    'Tomato Sauce',
    'Mozzarella',
    'Basil',
    'Dough',
    'Olive Oil',
    'Parmesan',
    'Garlic'
  ]
};

const ingredientAlternatives: Record<string, string[]> = {
  Avocado: ['Hummus', 'Ricotta', 'Mashed Peas', 'Baba Ganoush', 'Labneh'],
  Lemon: ['Lime', 'White Vinegar', 'Yuzu', 'Sumac', 'Citric Acid'],
  Tomato: [
    'Roasted Pepper',
    'Tomatillo',
    'Sun-Dried Tomato',
    'Passata',
    'Red Pepper Spread'
  ],
  Sourdough: ['Whole Wheat', 'Gluten-Free Toast', 'Rye', 'Pita', 'Rice Cakes'],
  'Red Onion': ['Shallot', 'Scallion', 'Chive', 'White Onion', 'Leek'],
  'Olive Oil': ['Avocado Oil', 'Grapeseed Oil', 'Sunflower Oil', 'Butter'],
  'Chili Flakes': ['Paprika', 'Aleppo Pepper', 'Hot Sauce', 'Cayenne'],
  'Sea Salt': ['Kosher Salt', 'Flaky Salt', 'Miso', 'Soy Sauce'],
  Chicken: ['Turkey', 'Tofu', 'Mushrooms', 'Seitan', 'Pork'],
  Honey: ['Maple Syrup', 'Agave', 'Brown Sugar', 'Date Syrup', 'Molasses'],
  Garlic: ['Shallot', 'Garlic Powder', 'Chive', 'Roasted Garlic', 'Leek'],
  'Soy Sauce': [
    'Tamari',
    'Coconut Aminos',
    'Miso',
    'Fish Sauce',
    'Worcestershire'
  ],
  Ginger: ['Galangal', 'Ginger Powder', 'Lemongrass'],
  'Rice Vinegar': ['Apple Cider Vinegar', 'White Wine Vinegar', 'Lime Juice'],
  'Green Onion': ['Chive', 'Leek', 'Shallot', 'Red Onion'],
  'Sesame Oil': ['Tahini', 'Toasted Sesame', 'Peanut Oil'],
  Quinoa: ['Couscous', 'Bulgur', 'Farro', 'Barley', 'Brown Rice'],
  Cucumber: ['Zucchini', 'Celery', 'Radish', 'Green Apple'],
  Feta: ['Goat Cheese', 'Ricotta Salata', 'Tofu Feta', 'Halloumi'],
  Olives: ['Capers', 'Pickled Peppers', 'Sun-Dried Tomato', 'Anchovies'],
  'Cherry Tomato': ['Grape Tomato', 'Plum Tomato', 'Roasted Pepper'],
  Parsley: ['Cilantro', 'Mint', 'Dill', 'Basil'],
  'Lemon Juice': ['Lime Juice', 'White Vinegar', 'Yuzu'],
  Basil: ['Oregano', 'Parsley', 'Tarragon', 'Mint', 'Thyme'],
  Cream: ['Coconut Milk', 'Greek Yogurt', 'Cashew Cream', 'Half-and-Half'],
  Onion: ['Shallot', 'Leek', 'Chive', 'Green Onion'],
  'Vegetable Broth': ['Chicken Broth', 'Miso Broth', 'Water + Bouillon'],
  Butter: ['Olive Oil', 'Ghee', 'Vegan Butter', 'Coconut Oil'],
  'Tomato Sauce': ['Crushed Tomato', 'Pesto', 'White Sauce', 'Arrabbiata'],
  Mozzarella: ['Burrata', 'Provolone', 'Vegan Mozzarella', 'Scamorza'],
  Dough: ['Flatbread', 'Naan', 'Cauliflower Crust', 'Tortilla'],
  Parmesan: ['Pecorino', 'Grana Padano', 'Nutritional Yeast', 'Asiago']
};

function ingredientItems(
  ingredients: string[],
  onSelect: (ingredient: string) => void,
  onAddNew: () => void,
  onDelete: (ingredient: string) => void
): HomeItem[] {
  const items = ingredients.map((ingredient) => ({
    icon: (
      <span className='text-center text-xl font-semibold text-black'>
        {ingredient}
      </span>
    ),
    fn() {
      onSelect(ingredient);
    },
    secondaryFn() {
      onDelete(ingredient);
    }
  }));

  items.push({
    icon: (
      <span className='text-center text-xl font-semibold text-black'>
        + new ingredient
      </span>
    ),
    fn() {
      onAddNew();
    },
    secondaryFn() {}
  });

  return items;
}

function alternativesItems(
  alternatives: string[],
  onSelect: (alternative: string) => void
): HomeItem[] {
  return alternatives.map((alternative) => ({
    icon: (
      <span className='text-center text-xl font-semibold text-black'>
        {alternative}
      </span>
    ),
    fn() {
      onSelect(alternative);
    }
  }));
}

export function HomeWidget() {
  const { homeMenu, setHomeMenu } = useMenu();
  const { recipe } = useRecipeWidget();
  const { isAIMode, setSelectedIngredient } = useHomeWidget();

  const [isOpen, setIsOpen] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [aiMenu, setAiMenu] = useState<HomeMenu>({ items: [] });
  const [aiView, setAiView] = useState<'ingredients' | 'alternatives'>(
    'ingredients'
  );
  const [aiAction, setAiAction] = useState<'replace' | 'add'>('replace');
  const [ingredientList, setIngredientList] = useState<string[]>([]);

  const ingredients = useMemo(() => {
    return (
      ingredientMocks[recipe.title] ?? ['Salt', 'Pepper', 'Olive Oil', 'Garlic']
    );
  }, [recipe.title]);

  useEffect(() => {
    setIngredientList(ingredients);
  }, [ingredients]);

  const createIngredientMenu = useCallback(
    (list: string[]): HomeMenu => ({
      items: ingredientItems(
        list,
        (ingredient) => {
          setAiAction('replace');
          setSelectedIngredient(ingredient);
          setAiView('alternatives');
          setAiMenu({
            items: alternativesItems(
              ingredientAlternatives[ingredient] ?? [
                'Alternative A',
                'Alternative B',
                'Alternative C'
              ],
              (alternative) => {
                setIngredientList((prev) => {
                  const next = prev.map((item) =>
                    item === ingredient ? alternative : item
                  );
                  setAiMenu(createIngredientMenu(next));
                  return next;
                });
                setSelectedIngredient(null);
                setAiView('ingredients');
                setAiAction('replace');
              }
            )
          });
        },
        () => {
          setAiAction('add');
          setSelectedIngredient(null);
          setAiView('alternatives');
          setAiMenu({
            items: alternativesItems(
              [
                'Mushrooms',
                'Zucchini',
                'Bell Pepper',
                'Spinach',
                'Feta',
                'Olives'
              ],
              (alternative) => {
                setIngredientList((prev) => {
                  const next = [...prev, alternative];
                  setAiMenu(createIngredientMenu(next));
                  return next;
                });
                setAiView('ingredients');
                setAiAction('replace');
              }
            )
          });
        },
        (ingredient) => {
          setIngredientList((prev) => {
            const next = prev.filter((item) => item !== ingredient);
            setAiMenu(createIngredientMenu(next));
            return next;
          });
        }
      )
    }),
    [setSelectedIngredient]
  );

  const aiIngredientMenu = useMemo<HomeMenu>(() => {
    return createIngredientMenu(ingredientList);
  }, [createIngredientMenu, ingredientList]);

  useEffect(() => {
    if (isAIMode) {
      setIsOpen(false);
      setAiView('ingredients');
      setAiAction('replace');
      setAiMenu(aiIngredientMenu);
    } else {
      setAiMenu({ items: [] });
    }
  }, [aiIngredientMenu, isAIMode]);

  useEffect(() => {
    if (!isAIMode) return;
    setSelectedIngredient(null);
    setAiView('ingredients');
    setAiAction('replace');
    setAiMenu(aiIngredientMenu);
  }, [aiIngredientMenu, isAIMode, recipe.title, setSelectedIngredient]);

  useEffect(() => {
    const widgetSize = 320;
    const edgeOffset = 48;

    const updateOffset = () => {
      if (isAIMode) {
        setOffset({ x: 0, y: 0 });
        return;
      }

      const half = widgetSize / 2;
      const targetX = window.innerWidth - edgeOffset - half;
      const targetY = window.innerHeight - edgeOffset - half;
      const baseX = window.innerWidth / 2;
      const baseY = window.innerHeight / 2;

      setOffset({ x: targetX - baseX, y: targetY - baseY });
    };

    updateOffset();

    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, [isAIMode]);

  const handleMainPress = () => {
    if (!homeMenu.showBack) {
      setIsOpen(!isOpen);
      return;
    }

    if (isAIMode && aiView === 'alternatives') {
      setSelectedIngredient(null);
      setAiView('ingredients');
      setAiAction('replace');
      setAiMenu(aiIngredientMenu);
      return;
    } else {
      homeMenu.backFn?.(setHomeMenu);
    }
  };

  const { setLocked, locked } = useInteractionContext();

  const handleTertiaryPress = () => {
    setLocked(!locked);
  };

  const aiTitle =
    aiView === 'alternatives' ? 'Select\nReplacement' : 'Select\nIngredient';

  return (
    <div
      className={cn(
        'fixed top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2'
      )}
    >
      <motion.div
        className='flex items-center justify-center'
        animate={{ x: offset.x, y: offset.y }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
      >
        <div className='relative flex h-80 w-80 items-center justify-center'>
          <MainSelectable
            title={isAIMode ? aiTitle : homeMenu.text}
            onPress={handleMainPress}
            onTertiaryPress={handleTertiaryPress}
            icon={
              locked ? (
                <LockIcon className='z-[200] size-[6rem] text-[#967976]' />
              ) : undefined
            }
            showBack={homeMenu.showBack}
          />

          {!isAIMode && (
            <MenuItems
              setHomeMenu={setHomeMenu}
              isOpen={isOpen}
              menuItems={homeMenu.items}
              setIsOpen={setIsOpen}
            />
          )}

          {isAIMode && (
            <MenuItems
              setHomeMenu={setAiMenu}
              isOpen
              menuItems={aiMenu.items}
              setIsOpen={() => undefined}
              fullCircle
            />
          )}

          <img
            src='/mesh-gradient.png'
            alt='Kivy Logo'
            className='pointer-events-none absolute z-[100] min-h-[45rem] min-w-[45rem]'
          />
        </div>
      </motion.div>
    </div>
  );
}
