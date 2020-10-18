import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';

import mapMarker from '../images/mapMarker.png';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface OrphanageItem {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap() {
    const Navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<OrphanageItem[]>([]);
    
    useFocusEffect(() => {
        api.get("orphanages").then(response => {
            setOrphanages(response.data);
        })
    });

    function handleNavigateToOrphanageDetails(id: string) {
        Navigation.navigate('OrphanageDetails', {id});
    }

    function handleNavigateToCreateOrphanage() {
        Navigation.navigate('SelectMapPosition');
    }
    return (
        <View style={styles.container}>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -15.5985166,
                    longitude: -56.1076350,
                    latitudeDelta: 0.055,
                    longitudeDelta: 0.055,
                }}
            >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.5,
                                y: 0.8,
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude,
                            }}
                        >
                            <Callout tooltip onPress={() => handleNavigateToOrphanageDetails(orphanage.id) } >
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText} >{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            <View style={styles.footer} >
                <Text style={styles.footerText} >{orphanages.length} orfanatos encontrados</Text>

                <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage} >
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#26f',
        alignItems: 'center',
        justifyContent: 'center',
    },

    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center',
    },

    calloutText: {
        color: '#00B9A5',
        fontSize: 14,
        fontFamily: 'Nunito_700Bold',
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 10,
    },

    footerText: {
        color: '#8FA7B3',
        fontFamily: 'Nunito_700Bold',
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15C3D6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center',
    }
});