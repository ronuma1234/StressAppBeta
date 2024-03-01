import React from 'react'
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome5 } from '@expo/vector-icons'


const Animation = (props) => {
   

    //The code below simply returns what the user will see when they are welcomed to the app
    return (
        <View style={styles.cont1}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.title}>Welcome to Destress</Text>
            </SafeAreaView>
            <SafeAreaView style={styles.middleView}>
                <FontAwesome5 name="smile-beam" size={50} color='#088395'/>
            </SafeAreaView>
            <SafeAreaView>
                <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                    <Text style={styles.subtitle}>Click here to begin</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

export default Animation



//The code below tweaks how the things presented will look like
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        textAlign: "center",
        fontSize: 50,
        fontWeight: "bold",
        marginTop: 30,
        color: '#088395'
    },
    subtitle: {
        textAlign: "center",
        fontSize: 20,
        marginTop: 30,
        color:'crimson'
    },
    canvas: {
        height: 275,
        width: 275,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "center",
        width: "70%",
        height: "35%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    middleView: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "center",
        width: "70%",
        height: "10%",
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    cont1: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: `#00ffff`
    },
})

