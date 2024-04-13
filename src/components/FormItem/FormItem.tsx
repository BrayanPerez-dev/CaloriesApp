import { Input } from "@rneui/base";
import React, { FC } from "react";
import { Text } from "react-native";
import { StyleSheet, View } from "react-native";

type FormItem = {
    legend:string,
    value:string
    onChangeText:(text:string) => void
}
const FormItem:FC<FormItem> = ({legend,value,onChangeText}) => {
  return (
    <View style={styles.formItem}>
      <View style={styles.inputContainer}>
        <Input value={value} onChangeText={onChangeText} />
      </View>
      <View style={styles.legendContainer}>
        <Text style={styles.legend}>{legend}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    formItem:{
        flexDirection:'row',
        alignItems:'center'
      },
      inputContainer:{
        flex:2,
      },
      legendContainer:{
        flex:1,
      },
      legend:{
        fontWeight:'500'
      }
});

export default FormItem;
