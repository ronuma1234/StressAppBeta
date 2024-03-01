import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'


//The parameters, or variables, exported from the Home page are handled here by user request, and then are sent back to the home page
const Settings = (props) => {
    const playMusicSetting = props.route.params.playMusic;
    const playVibrationSetting = props.route.params.playVibration;
    const playSoundsSetting = props.route.params.playSounds;
    const backgroundNumSetting = props.route.params.backgroundNum;
    const soundNumSetting = props.route.params.soundNum;

    const changePlayMusic = () => {
        playMusicSetting.current = playMusicSetting.current === false ? true : false;
        props.navigation.setParams({ playMusic: playMusicSetting });
    }

    const changePlayVibration = () => {
        playVibrationSetting.current = playVibrationSetting.current === false ? true : false;
        props.navigation.setParams({ playVibration: playVibrationSetting });
    }

    const changePlaySounds = () => {
        playSoundsSetting.current = playSoundsSetting.current === false ? true : false;
        props.navigation.setParams({ playSounds: playSoundsSetting });
    }

    const changeBackgroundNum = () => {
        if (backgroundNumSetting.current >= 2) {
            backgroundNumSetting.current = 0;
        }
        else {
            backgroundNumSetting.current += 1;
        }

        props.navigation.setParams({ backgroundNum: backgroundNumSetting });
    }

    const changeSoundNum = () => {
        if (soundNumSetting.current >= 4) {
            soundNumSetting.current = 0;
        }
        else {
            soundNumSetting.current += 1;
        }

        props.navigation.setParams({ soundNum: soundNumSetting });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Feather name="chevron-left" color="#000" size={25} />
                </TouchableOpacity>
            </View>
            <View style={styles.cont1}>
                <Text style={styles.title}>SETTINGS</Text>
            </View>
            <View style={styles.cont2}>
                <TouchableOpacity onPress={() => changePlayMusic()}>
                    <Text style={styles.text}>{playMusicSetting.current ? "STOP MUSIC" : "PLAY MUSIC"}</Text>
                </TouchableOpacity>
                <FontAwesome name="music" size={24} color="black"/>
            </View>
            <View style={styles.cont2}>
                <TouchableOpacity onPress={() => changePlayVibration()}>
                    <Text style={styles.text}>{playVibrationSetting.current ? "STOP VIBRATIONS" : "PLAY VIBRATIONS"}</Text>
                </TouchableOpacity>
                <Feather name="bell" size={24} color="black" />
            </View>
            <View style={styles.cont2}>
                <TouchableOpacity onPress={() => changePlaySounds()}>
                    <Text style={styles.text}>{playSoundsSetting.current ? "STOP SOUNDS" : "PLAY SOUNDS"}</Text>
                </TouchableOpacity>
                <Entypo name="sound" size={24} color="black" />
            </View>
            <View style={styles.cont2}>
                <TouchableOpacity onPress={() => changeBackgroundNum()}>
                    <Text style={styles.text}>CHANGE BACKGROUND</Text>
                </TouchableOpacity>
                <AntDesign name="picture" size={24} color="black" />
            </View>
            <View style={styles.cont2}>
                <TouchableOpacity onPress={() => changeSoundNum()}>
                    <Text style={styles.text}>CHANGE SOUND</Text>
                </TouchableOpacity>
                <MaterialCommunityIcons name="playlist-music" size={24} color="black" />
            </View>


        </View>
    )
}

export default Settings

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    title: {
        fontSize: 40,
        fontFamily: "Montserrat_700Bold",
        marginTop: 30,
        fontWeight: 'bold'
    },
    text: {
        fontFamily: "Montserrat_600SemiBold",
        fontSize: 20,
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "cornsilk"
    },
    cont1: {
        alignItems: "center",
        justifyContent: "center",
        height: "35%",
        width: "100%"
    },
    cont2: {
        flexDirection: "row",
        alignItems: "center",
        width: "80%",
        justifyContent: "space-between",
        marginTop: 40
    },
})