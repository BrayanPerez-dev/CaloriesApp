import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon } from "@rneui/themed";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Meal, RootStackParamList } from "../../types";
import useFoodStorage from "../../hooks/useFoodStorage";
import TodayCalories, { TodayCaloriesProp } from "../../components/TodayCalories";
import TodayMeals from "../../components/TodayMeals";
const totalCaloriesPerday = 2000
const Home = () => {
  const [todayFood, setTodayFood] = useState<Meal[]>([]);
  const [todayStatistics,setTodayStatistic] = useState<TodayCaloriesProp>({
    total:2000,consumed: 0,remaining:0,percentaje:0
  })
  const { onGetTodayFood } = useFoodStorage();
  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
  
  const calculeTodayStatistics = (meals:Meal[]) => {
    try {
      const caloriesConsumed = meals.reduce((acum,curr)=> acum + Number(curr.calories),0)
      const remaininigCalories = totalCaloriesPerday - caloriesConsumed
      const percentaje = (caloriesConsumed / totalCaloriesPerday) * 100
      setTodayStatistic({
        consumed:caloriesConsumed,
        percentaje,
        remaining:remaininigCalories
      })
    } catch (error) {
      console.error(error);
    }
  }
  const loadTodayFood = useCallback(async () => {
    try {
      const response = await onGetTodayFood();
      calculeTodayStatistics(response)
      setTodayFood(response);
    } catch (error) {
      setTodayFood([]);
      console.error(error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTodayFood().catch(null);
    }, [loadTodayFood])
  );
  const handleAddCaloriesPress = () => {
    navigate("AddFood");
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.caloriesContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.caloriesLegend}>Calories</Text>
        </View>
        <View style={styles.rightContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color={"#fff"} />}
            radius={"lg"}
            color={"#4ecb71"}
            onPress={handleAddCaloriesPress}
          />
        </View>
      </View>
      <TodayCalories {...todayStatistics} />
      <TodayMeals food={todayFood} onCompleteAddRemove={loadTodayFood}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: "#fff",
    flex: 1,
  },
  caloriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  caloriesLegend: {
    fontSize: 20,
  },
});

export default Home;
