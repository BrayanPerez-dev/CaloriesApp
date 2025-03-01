import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "../types";
import { isToday } from "date-fns";

const MY_FOOD_KEY = "@MyFood:Key";
const MY_TODAY_FOOD_KEY = "@MyTodayFood:Key";

const useFoodStorage = () => {
  const saveInfoToStorage = async (storageKey: string, meal: Meal) => {
    try {
      const currentSavedFood = await AsyncStorage.getItem(storageKey);

      if (currentSavedFood !== null) {
        const currentSavedFoodParsed = [...JSON.parse(currentSavedFood)];
        currentSavedFoodParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSavedFoodParsed)
        );

        return Promise.resolve();
      }
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveFood = async ({ calories, name, portion }: Meal) => {
    try {
      await saveInfoToStorage(MY_FOOD_KEY, { calories, name, portion });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetFoods = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods);
        return Promise.resolve(parsedFoods);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const handleGetTodayFood = async () => {
    try {
      const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY);

      if (foods !== null) {
        const parsedFoods = JSON.parse(foods) as Meal[];
        return Promise.resolve(parsedFoods.filter((meal) => meal.date && isToday(new Date(meal.date))));
      }
      return []
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleSaveTodayFood = async ({ calories, name, portion }: Meal) => {
    try {
      await saveInfoToStorage(MY_TODAY_FOOD_KEY, {
        calories,
        name,
        portion,
        date: new Date().toISOString(),
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const handleRemoveTodayFood = async (index:number) => {
   try {
    const todayFood = await handleGetTodayFood()
    const filterItem = todayFood?.filter((_,itemIndex)=> itemIndex !== index)
    await AsyncStorage.setItem(MY_TODAY_FOOD_KEY,JSON.stringify(filterItem))
    return Promise.resolve();

   } catch (error) {
    return Promise.reject(error);

   }
  }
  return {
    onSaveFood: handleSaveFood,
    onGetFoods: handleGetFoods,
    onSaveTodayFood: handleSaveTodayFood,
    onGetTodayFood: handleGetTodayFood,
    onDeleteTodayFood: handleRemoveTodayFood
  };
};

export default useFoodStorage;
