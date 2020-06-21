import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Progress extends React.Component {

    render = () => {
        const expToNextLevel = Math.floor(10*(Math.pow(1.1, this.props.level - 1)));
        const fill = (this.props.exp / expToNextLevel) * 100

        return (
            <View 
                height={Dimensions.get('window').width*0.8}
                width={Dimensions.get('window').width*0.8}
                style={styles.card}
            >
                <AnimatedCircularProgress
                size={Dimensions.get('window').width*0.6}
                width={15}
                prefill={0}
                fill={fill}
                tintColor='#6200ee'
                backgroundColor='#DCDCDC'	
                style={{margin: Dimensions.get('window').width*0.05}}
                >
                {
                    () => (
                    <View>
                        <Text style={styles.label}>LEVEL</Text>
                        <Text style={styles.title}> {this.props.level} </Text>
                        <Text style={styles.label}>EXP: {this.props.exp} / {expToNextLevel}</Text>
                    </View>
                    )
                }
                </AnimatedCircularProgress>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFF',
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: '#A9A9A9',
        shadowOpacity: 1.0,
        shadowRadius:10,
        borderRadius:10,
      },
      title: {
        fontSize: 50,
        alignSelf:'center',
      },
      label: {
        fontSize:20,
        alignSelf:'center',
        padding:5,
      },
});