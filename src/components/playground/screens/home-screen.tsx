import { useTimerWidget } from '@/components/playground/widgets/timer-widget/timer-widget-context';
import { HandTrackingVideo } from '@/components/playground/dev/hand-tracking-video';
import { HomeWidget } from '@/components/playground/widgets/home-widget/home-widget';
import { StartCameraWidget } from '@/components/playground/widgets/start-camera-widget';
import { TimerWidgetStack } from '@/components/playground/widgets/timer-widget/timer-widget-stack';
import { cn } from '@/lib/utils';
import RecipeWidget from '@/components/playground/widgets/recipe-widget/recipe-widget';
import {
  HomeWidgetProvider,
  useHomeWidget
} from '@/components/playground/widgets/home-widget/home-widget-context';

function HomeScreenContent({ active }: { active: boolean }) {
  const { stacks } = useTimerWidget();
  const { isAIMode } = useHomeWidget();

  return (
    <div className={cn(!active && 'hidden')}>
      {/*{!isAIMode && <HandTrackingVideo />}*/}
      <HomeWidget />
      {!isAIMode && <StartCameraWidget />}
      {!isAIMode && <RecipeWidget />}
      {!isAIMode &&
        stacks.map((stack) => (
          <TimerWidgetStack key={stack.id} timers={stack.timers} />
        ))}
    </div>
  );
}

export function HomeScreen({ active }: { active: boolean }) {
  return (
    <HomeWidgetProvider>
      <HomeScreenContent active={active} />
    </HomeWidgetProvider>
  );
}
