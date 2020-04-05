import React, { PureComponent } from "react";
import {AsyncStorage,SafeAreaView,TouchableOpacity,Text,StyleSheet} from 'react-native';

export default  class CustomDrawer extends PureComponent {

  async logout(){
      this.props.navigation.navigate('SignIn');
      await AsyncStorage.removeItem('isLoggedIn');
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={()=>this.logout()} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'rrgb(255, 255, 153)'
    },
    buttonContainer:{
        padding:10,
        position:'absolute',
        bottom:20,
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'rgb(255, 194, 102)',
        flexDirection:'row'
    },
    buttonText:{
        marginVertical:5,
        fontSize:16,
        fontWeight:'bold',
        color:'black'
    }
  });