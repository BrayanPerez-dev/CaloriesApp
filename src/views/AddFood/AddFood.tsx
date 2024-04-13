import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header";
import { Button, Icon, Input } from "@rneui/themed";
import AddFoodModal from "../../components/AddFoodModal";
import useFoodStorage from "../../hooks/useFoodStorage";
import { Meal } from "../../types";
import MealItem from "../../components/MealItem";

const AddFood = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { onGetFoods } = useFoodStorage();
  const [foods, setFoods] = useState<Meal[]>([]);
  const [search, setSearch] = useState<string>("");
  const loadFoods = async () => {
    try {
      const foodsResponse = await onGetFoods();
      setFoods(foodsResponse);
    } catch (error) {
      console.error(error);
    }
  };
  const onClose = async (shouldUpdate?: boolean) => {
    if (shouldUpdate) {
      Alert.alert("Comida guardad exitosamente");
      loadFoods();
    }
    setVisible(false);
  };

  useEffect(() => {
    loadFoods().catch(null);
  }, []);

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods();
      setFoods(
        result.filter((item: Meal) =>
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color={"#fff"} />}
            radius={"lg"}
            color={"#4ecb71"}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="apples,soda..."
            value={search}
            onChangeText={(text: string) => setSearch(text)}
          />
        </View>
        <Button
          title={"Search"}
          color={"#ade8af"}
          titleStyle={styles.searchBtnTitle}
          radius={"lg"}
          onPress={handleSearchPress}
        />
        <AddFoodModal visible={visible} onClose={onClose} />
      </View>
      <ScrollView style={styles.content}>
        {foods?.map((meal) => (
          <MealItem
            isAbleToAdd={true}
            key={`my-item-item-${meal.name}`}
            {...meal}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: "#fff",
  },
  legendContainer: {
    flex: 1,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  addFoodContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  addFoodLegend: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
  searchBtnTitle: {
    color: "#000",
    fontSize: 14,
  },
  content: {},
});
export default AddFood;
