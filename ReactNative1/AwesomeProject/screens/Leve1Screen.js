import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function Leve1Screen() {
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}>

            <OptionButton
                icon="ios-chatboxes"
                label="Ask a question on the forums"
                onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}
                isLastOption />
            <View style={{flex: 1, flexDirection: "row"}}>
                <View style={{flex: 1,flexDirection: "column"}}>
                    <Text style={{fontSize: 50}}>
                        test
                    </Text>
                    <View
                        style={{fontSize: 50,borderBottomColor: 'black',borderBottomWidth: 5}}></View>
                    <Text style={{fontSize: 50}}>
                        test
                    </Text>
                </View>
                <View style={{flex: 1, width:50, padding:10, alignContent: "center"}}>
                    <Text style={{fontSize: 50}}>=</Text>
                </View>
                <View
                    style={{flex: 1,flexDirection: "column"}}>
                    <Text style={{fontSize: 50}}>
                        2
                    </Text>
                    <View
                        style={{fontSize: 50,borderBottomColor: 'black',borderBottomWidth: 5}}></View>
                    <Text style={{fontSize: 50}}>
                        2
                    </Text>
                </View>
            </View>

            <Button
                title="Next"
                color="#f194ff"
                onPress={() => Alert.alert('Button with adjusted color pressed')} />

        </ScrollView>
    );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
    return (
        <RectButton
            style={[
                styles.option, isLastOption && styles.lastOption
            ]}
            onPress={onPress}>
            <View style={{
                flexDirection: 'row'
            }}>
                <View style={styles.optionIconContainer}>
                    <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
                </View>
                <View style={styles.optionTextContainer}>
                    <Text style={styles.optionText}>{label}</Text>
                </View>
            </View>
        </RectButton>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    contentContainer: {
        paddingTop: 15
    },
    optionIconContainer: {
        marginRight: 12
    },
    option: {
        backgroundColor: '#fdfdfd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: 0,
        borderColor: '#ededed'
    },
    lastOption: {
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    optionText: {
        fontSize: 15,
        alignSelf: 'flex-start',
        marginTop: 1
    }
});
