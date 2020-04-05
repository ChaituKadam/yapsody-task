import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator,
  Alert
} from 'react-native';

export default class SignIn extends Component{

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            loading:false
        }
    }

    componentDidMount=async()=>{
        this.setState({loading:true})
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        if(isLoggedIn!=null){
            this.props.navigation.navigate('TaskList');
        }
        this.setState({loading:false})
    }

    goToSignUp(){
        this.props.navigation.navigate('SignUp');
    }

    async signIn(){
        this.setState({loading:true})
        const credentials = await AsyncStorage.getItem('credentials');
        let credentialArray = JSON.parse(credentials);
        const {email,password} = this.state;
        if(email!='' && password!=''){
            if(credentialArray!=null){
                let user = credentialArray.filter(item=>{
                    return (item.username == email && item.password == password)
                 })
                 if(user.length!=0){
                     AsyncStorage.setItem('isLoggedIn','loggedIn');
                     this.props.navigation.navigate('TaskList')
                     this.setState({email:'',password:''})
                 }
                 else{
                     Alert.alert("Username or password is wrong")
                 }
            }
            else{
                Alert.alert("Username or password is wrong")
            }
        }
        else{
            Alert.alert("Fill All the fields")
        }
        this.setState({loading:false})
    }

    render(){
        const {email,password} = this.state;
        if(this.state.loading){
            return(
                <View style={styles.loadingStyle}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }
        return (
            <View
              style={[styles.background, styles.container]}
            >
              <View style={styles.container} />
              <View style={styles.wrapper}>
                <Text style={{fontSize:30, alignSelf:'center', color: "#ff8000", fontWeight: 'bold',backgroundColor:'rrgb(255, 255, 153)'}}>TaskToDo</Text>
                <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Email Address"
                    value={email}
                    onChangeText={(val)=>{this.setState({email:val})}}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.inputWrap}>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry
                    value={password}
                    onChangeText={(val)=>{this.setState({password:val})}}
                    style={styles.input}
                    underlineColorAndroid="transparent"
                    onSubmitEditing={()=>{this.signIn()}}
                  />
                </View>
                <TouchableOpacity onPress={()=>{this.signIn()}}>
                  <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign In</Text>
                  </View>
                </TouchableOpacity>
                <Text style={styles.bottomText}>
                    Don't have an account? <Text style={styles.signUpText} onPress={()=>this.goToSignUp()}>Sign Up</Text>
                </Text>
              </View>
              <View style={styles.container} />
            </View>
          );
    }
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#FFF'
    },
    background: {
      width: null,
      height: null
    },
    wrapper: {
      paddingHorizontal: 15,
    },
    inputWrap: {
      flexDirection: "row",
      marginVertical: 10,
      height: 40,
      backgroundColor: "transparent",
      borderColor:'#cccccc',
      borderWidth:2,
    },
    input: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: '#FFF'
    },
    button: {
      borderRadius:10,
      backgroundColor: "rgb(255, 194, 102)",
      paddingVertical: 15,
      marginVertical: 15,
      alignItems: "center",
      justifyContent: "center"
    },
    buttonText: {
      color: "black",
      fontSize: 18
    },
    bottomText:{
        alignSelf:'center',
        fontSize:18,
        color:'gray'
    },
    loadingStyle:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    signUpText:{
        textDecorationLine: 'underline',
        color:'#ff8000'
    }
  });