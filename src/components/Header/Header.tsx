import { useNavigation } from '@react-navigation/native'
import { Button, Icon } from '@rneui/themed'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const staticInfo = {
    name: 'Brayan Perez',
    uri: 'https://avatars.githubusercontent.com/u/63213959?v=4'
}
const Header = () => {
    const {canGoBack,goBack} = useNavigation()
  return (
    <View style={styles.container}>
        {canGoBack()? (
            <View style={styles.arrowContainer}>
                <Button icon={<Icon name='arrow-back' size={24}/>}  type='clear' onPress={()=> goBack()} /> 
                </View>
        ):undefined}
        <View style={styles.leftContainer}>
             <Text style={styles.name}>{`Hello ${staticInfo.name}`} </Text>
             <Text style={styles.subtitle}>Welcomen back to your goal </Text>
        </View>
        <View style={styles.rigtContainer}>
             <Image source={{uri:staticInfo.uri}} style={styles.profileImage} />
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row'
    },
    leftContainer:{
     flex:1,
     justifyContent:'center'
    },
    rigtContainer:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'center'
    },
    name:{
       fontSize:14,
       fontWeight: 'bold'
    },
    subtitle:{
      fontSize:12,
      color: '#808080'
    },
    profileImage:{
      width:40,
      height:40,
      borderRadius:24,
    },
    arrowContainer:{
      marginLeft: -12
    }
})
export default Header