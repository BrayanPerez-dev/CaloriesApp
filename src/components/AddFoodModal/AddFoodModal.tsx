import { Button, Icon, Input } from "@rneui/themed";
import React, { FC, useEffect, useState } from "react";
import { Modal } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import FormItem from "../FormItem";
import useFoodStorage from "../../hooks/useFoodStorage";

type AddFoodModalProps = {
  onClose: (shouldUpdate?:boolean) => void;
  visible: boolean;
};

const AddFoodModal: FC<AddFoodModalProps> = ({ onClose, visible }) => {
  const [calories, setCalories] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const { onSaveFood } = useFoodStorage();
  useEffect(() => {
    setCalories("");
    setName("");
    setPortion("");
  }, [visible]);

  const handleAddPress = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion,
      });
      onClose(true);
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={()=>onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={()=>onClose()}
              type="clear"
            />
          </View>
          <FormItem
            legend="KCAL"
            value={calories}
            onChangeText={(text: string) => setCalories(text)}
          />
          <FormItem
            legend="Nombre"
            value={name}
            onChangeText={(text: string) => setName(text)}
          />
          <FormItem
            legend="Porcion"
            value={portion}
            onChangeText={(text: string) => setPortion(text)}
          />
          <View style={styles.buttonContainer}>
            <Button
              title={"Add"}
              radius={"lg"}
              color={"#4ecb71"}
              disabled={
                calories.trim() === "" ||
                name.trim() === "" ||
                portion.trim() === ""
              }
              icon={<Icon name="add" color="#fff" />}
              onPress={handleAddPress}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    alignItems: "flex-end",
  },
  buttonContainer: {
    alignItems: "flex-end",
  },
});
export default AddFoodModal;
