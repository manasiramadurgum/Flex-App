import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import { Header } from 'react-native-elements';
import {Button} from 'react-native-paper';
import { Dimensions } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default class Flex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {item: 0, sec: 20, next:false, done: false};
    }

    actions = ["Do jumping jacks until the timer runs out.", 
               "Swing your arms in and out until the timer runs out",
               "Raise your arms above your head and roll your wrists",
               "Pull your shoulders down and back and roll you shoulders", 
               "Concentrate on something 20ft away for 20 seconds"];

    componentDidMount() {
        this._isMounted = true;
        this.interval = setInterval(() => this.tick(), 1000);
    }

    tick() {
        let sec = this.state.sec;
        sec--;
        if (sec == -1) {
          clearInterval(this.interval);
          const isDone = (this.state.item === 4);
          this.setState({sec:20, next:true, done: isDone});
          return;
        }
        this.setState({sec: sec});
    }

    handleClick = () => {
        if (!this.state.next || this.state.done) {
            this.props.hide();
            if (this.state.done) {
                this.props.complete();
            }
        } else {
            this.setState({item: this.state.item + 1, next: false});
            this.interval = setInterval(() => this.tick(), 1000);
        }
    }

    render() {
        const fill = ((20 - this.state.sec) / 20) * 100;
        let text = this.state.next ? "Next" : "Quit";
        text = this.state.done ? "Done" : text;
        
        return ( 
            <View style={styles.screen}>
                <Header
                    backgroundColor='#FFFFFF'
                    outerContainerStyles={styles.header}
                    containerStyles={styles.shadow}
                    centerComponent={{ text: 'FLEX TIME', style: {fontSize:20, color: '#6200ee', fontWeight:'bold'}}}
                />
                <View
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height}
                    backgroundColor='#f5f5f5'
                    style={{overflow:'hidden', alignItems:'center'}}
                >
                    <View style={styles.card}
                        width={Dimensions.get('window').width * 0.8}
                        height={Dimensions.get('window').width * 0.8}
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
                                        <Text style={styles.title}>{this.state.sec}</Text>
                                    </View>
                                )
                            }
                        </AnimatedCircularProgress>
                    </View>
                    <View style={styles.card}
                        width={Dimensions.get('window').width * 0.8}
                        height={Dimensions.get('window').width * 0.4}>
                        <Text style={styles.label}>{this.actions[this.state.item]}</Text>
                        <Button  
                            mode='contained' 
                            width={Dimensions.get('window').width*0.6} 
                            style={styles.button}
                            onPress={this.handleClick}
                        >
                            {text}
                        </Button>
              
                    </View>
                </View>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    
    header: {
        paddingTop: Constants.statusBarHeight,
        paddingBottom: 20,
        height:100,
    },
    card: {
        marginTop: 40,
        alignItems:'center',
        //justifyContent:'center',
        backgroundColor:'#FFF',
        shadowOffset:{  width: 0,  height: 0,  },
        shadowColor: '#A9A9A9',
        shadowOpacity: 1.0,
        shadowRadius:10,
        borderRadius:10,
        padding: 20,
        textAlign:'center',
      },
      label: {
        fontSize:20,
        textAlign:'center',
        padding:15,
      },
      title: {
        fontSize: 50,
        alignSelf:'center',
      },

});