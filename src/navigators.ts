import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
} from "expo-router/js-top-tabs"
import { ParamListBase, TabNavigationState } from "expo-router/react-navigation"
import { withLayoutContext } from 'expo-router'

const OriginalMaterialTopTabs = createMaterialTopTabNavigator()

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof OriginalMaterialTopTabs.Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(OriginalMaterialTopTabs.Navigator)
