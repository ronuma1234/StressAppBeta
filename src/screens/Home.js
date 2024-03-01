import 'react-native-gesture-handler';
import { GestureHandlerRootView, Gesture, GestureDetector } from 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';

import { spline } from '@georgedoescode/spline';
import {
    Canvas,
    LinearGradient,
    Path,
    useClockValue,
    useComputedValue,
    useValueEffect,
    useValue,
    vec,
} from '@shopify/react-native-skia';

import { createNoise2D } from 'simplex-noise';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { EvilIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';


function createPoints() {
    const points = [];
    // below creates the required amount of points
    const numPoints = 6;
    // used to equally space each point around the circle
    const angleStep = (Math.PI * 2) / numPoints;
    // the radius of the circle
    const rad = 110;

    for (let i = 1; i <= numPoints; i++) {
        // the coordinates of the current point
        const theta = i * angleStep;

        const x = 130 + Math.cos(theta) * rad;
        const y = 130 + Math.sin(theta) * rad;

        // below adds point object to 'points'
        points.push({
            x: x,
            y: y,
            
            originX: x,
            originY: y,
            
            noiseOffsetX: Math.random() * 1000,
            noiseOffsetY: Math.random() * 1000,
        });
    }

    return points;
}

//this function below is used to map noise to a point, between a certain range
function map(
    n: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}


const colourPalette = [
    ['#0A4D68', '#088395', '#05BFDB', 'cyan'],
    ['#FFACAC', '#FFBFA9', '#FFEBB4', '#FBFFB1'],
    ['#F0FF42','#82CD47','#54B435','#379237'],
];



const Home = ( props ) => {
    const clock = useClockValue();
    const points = useValue(createPoints());
    const hueNoiseOffset = useValue(0);
    const noise = createNoise2D();
    const noiseStep = 0.005;
    const touchedFlag = useValue(false);
    const timer = useValue(0);
    const playMusic = useValue(true);
    const playVibration = useValue(true);
    const playSounds = useValue(true);
    const backgroundNum = useValue(0);
    const soundNum = useValue(0);
    const [sound, setSound] = useState();
    const [backMusic, setBackMusic] = useState(new Audio.Sound());
    const [isPlaying, setIsPlaying] = useState(false);

    //The code below is responsible for morphing the spline object
    const animate = () => {
        const newPoints = [];

        for (let i = 0; i < points.current.length; i++) {
            const point = points.current[i];

            // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
            const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
            const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
            // mapping the noise between 20 poisitions of the point
            const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
            const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);

            // update the point's current coordinates
            point.x = x;
            point.y = y;

            // progress the point's x, y values through "time"
            point.noiseOffsetX += noiseStep;
            point.noiseOffsetY += noiseStep;

            newPoints.push(point);
        }

        points.current = newPoints;
    };

    //The code below reverts the effect of the animate() function, and morphs the spline back to its original form
    const deAnimate = () => {
        const newPoints = [];

        for (let i = 0; i < points.current.length; i++) {
            
            const point = points.current[i];

            if (point.x > point.originX) {
                point.x -= 0.3
            }
            if (point.x < point.originX) {
                point.x += 0.3
            }
            if (point.y > point.originY) {
                point.y -= 0.3
            }
            if (point.y < point.originY) {
                point.y += 0.3
            }
            newPoints.push(point); 
        }

        points.current = newPoints;
    };

    //The timer that goes off when the object is touched
    useValueEffect(clock, () => {
        if (touchedFlag.current == true) {
            timer.current += 1;
        }
        else {
            timer.current = 0;
        }
    });


    //The path that will be returned to the screen
    const path = useComputedValue(() => {
        if (touchedFlag.current == true) {
            if (timer.current <= 100) {
                animate();
            }
            else if (timer.current > 100 && timer.current <= 200) {
                deAnimate();
            }
            else {
                touchedFlag.current = false;
                timer.current=0;
            }

        }
        else {
            timer.current = 0;
        }
        
        return spline(points.current, 1, true);
    }, [clock]); 

    //The function below randomly moves the colour gradient around the ball
    const colourNoise = useComputedValue(() => {
        hueNoiseOffset.current += noiseStep / 2;
        const hueNoise = noise(hueNoiseOffset.current, hueNoiseOffset.current);
        const newValue = map(hueNoise, -1, 1, 0, 360);
        return vec(256, newValue);
    }, [clock]);


    //The code below handles what happens after the tap gesture on the spline object
    const gesture = Gesture.Tap()
        .onStart(() => {
            if (playVibration.current == true) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }
            if (playSounds.current == true) {
                playSound();
            }
            
            if (touchedFlag.current == true) {
                timer.current=0;
            }
            else {
                touchedFlag.current = true;
            }
        });

    //The code below handles the button sound played when the function is called
    async function playSound() {
        //Add any new sound to array below
        const soundOptions = [
            require('../sounds/ButtonSound1.mp3'),
            require('../sounds/ButtonSound2.mp3'),
            require('../sounds/ButtonSound3.mp3'),
            require('../sounds/ButtonSound4.mp3'),
            require('../sounds/ButtonSound5.mp3')
        ];
        const { sound } = await Audio.Sound.createAsync(soundOptions[soundNum.current]);
        setSound(sound);
        console.log('playing sound');

        await sound.playAsync();
        await sound.setIsLoopingAsync(false)
    };

    useEffect(() => {
        return sound
            ? () => {
                console.log('unloading sound');
            }
            : undefined;
    }, [sound]);


    
    //The code below handles whether to mute the background music or not, by user request
    useValueEffect(clock, () => {
        if (playMusic.current == false) {
            backMusic.setIsMutedAsync(true);
        }
        else {
            backMusic.setIsMutedAsync(false);
        }
    }); 

    //The function below handles the background music played in the app
    async function playBackMusic() {
        await backMusic.loadAsync(require('../sounds/BackgroundAudio.mp3'));

        setBackMusic(backMusic);

        await backMusic.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        await backMusic.setIsLoopingAsync(true); //turns on the looping for the sound
        
        await Audio.setAudioModeAsync({
            staysActiveInBackground: true,
            interruptionModeAndroid: 1,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: true,
            allowsRecordingIOS: true,
            interruptionModeIOS: 0,
            playsInSilentModeIOS: true,
        });

        if (isPlaying == false) {
            console.log("Playing Sound");
            await backMusic.playAsync();
            setIsPlaying(true);
            return;
        }
        if (isPlaying == true) {
            console.log("pausing now..");
            await backMusic.pauseAsync();
            await backMusic.unloadAsync();
            setIsPlaying(false);
            return;
        }
    };

    
    playBackMusic();

    //the code below return what will be seen on the user's screen
    return (

        <View style={styles.mainContainer} backgroundColor={colourPalette[backgroundNum.current][3]}>
            <SafeAreaView style={styles.header}>
                <TouchableOpacity onPress={() => props.navigation.navigate("Settings", { playMusic, playSounds, playVibration, backgroundNum, soundNum })}>
                    <EvilIcons name="gear" color="#000" size={25} />
                </TouchableOpacity>
            </SafeAreaView>
            <GestureHandlerRootView style={styles.container}>
                <GestureDetector gesture={gesture}>
                    <Canvas
                        style={styles.canvas}
                        
                    >
                        <Path path={path} color={colourPalette[backgroundNum.current][2]} >
                            <LinearGradient
                                        start={vec(0, 0)}
                                        end={colourNoise}
                                colors={[colourPalette[backgroundNum.current][1], colourPalette[backgroundNum.current][0]]}
                             />
                        </Path>

                    </Canvas>
                </GestureDetector>
            </GestureHandlerRootView>
        </View>
        
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    canvas: {
        height: 275,
        width: 275,
    },
    header: {
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        width: "90%",
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    
});

export default Home;



