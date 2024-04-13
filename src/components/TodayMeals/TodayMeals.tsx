import React, { FC } from 'react'
import { Meal } from '../../types'
import { ScrollView, StyleSheet,Text,View } from 'react-native'
import MealItem from '../MealItem'
type TodayMealsProps = {
    food:Meal[]
    onCompleteAddRemove?:()=>void
}
const TodayMeals:FC<TodayMealsProps> = ({onCompleteAddRemove,food}) => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Meals</Text>
        <ScrollView style={styles.content}>
           {
            food?.map((meal,index) => <MealItem itemIndex={index} onCompleteAddRemove={onCompleteAddRemove} isAbleToAdd={false} key={`today-meal-item-${meal.name}-${index}`} {...meal} />)
           }
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 24
    },
    title:{
        fontSize:16
    },
    content:{
        marginTop: 10
    }
})
export default TodayMeals