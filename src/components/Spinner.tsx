import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RotationGestureHandler } from 'react-native-gesture-handler';

export default function Spinner() {
    const [anguleRotate, setAnguleRotate] = useState<number>(0)

    // useEffect(() => {
    //         // while (anguleRotate <= 360) {
    //         //     setTimeout(() => {
    //         //         setAnguleRotate(anguleRotate+ 36)
    //         //         if (anguleRotate == 360) {
    //         //             setAnguleRotate(0)
    //         //         }
    //         //     }, 50)
    //         }
    // },[anguleRotate]);

    return (
        <View style={styles.container}>
            <View style={styles.spinner}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },

    spinner: {
        width: 60,
        height: 60,

        margin: 'auto',

        borderWidth: 8,
        borderStyle: 'solid',
        borderTopColor: 'rgba(0, 0, 0, .1)',
        borderEndColor: 'rgba(0, 0, 0, .1)',
        borderBottomColor: 'rgba(0, 0, 0, .1)',
        borderLeftColor: '#15C3D6',
        borderRadius: 30,

    }
});
        // .spinner {
            
        
        //     border: 8px solid ;
            
        //     border-radius: 50%;
        
        //     animation: spin 1.2s linear infinite;
        // }
        
        // @keyframes spin {
        //     to { transform: rotate(360deg); }
        // }
