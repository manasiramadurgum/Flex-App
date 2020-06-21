import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button } from 'react-native-paper';
import { Dimensions } from 'react-native';

export default class Controls extends React.Component {
    _isMounted = false;

    constructor(props) {
      super(props);
      this.state = {min: 1, sec: 0, disabled: true, timer:false};
    }

    componentDidMount() {
      this._isMounted = true;
    }

    componentWillUnmount() {
      this._isMounted = false;
      clearInterval(this.interval);
    }

    tick() {
      let min = this.state.min;
      let sec = this.state.sec;
      sec--;
      if (sec == -1) {
        min--;
        sec = 59;
      }
      if (min == 0 && sec == 0) {
        clearInterval(this.interval);
        this.setState({disabled: false});
      }
      this.setState({min: min, sec: sec});
    }

    toggleTimer = () => {
      if (this._isMounted) {
        if (!this.state.timer) {
          this.interval = setInterval(() => this.tick(), 1000);
          this.setState({timer:true});
        } else {
          clearInterval(this.interval);
          this.setState({min: 20, sec: 0, timer:false});
        }
      }
    }

    render = () => {
        const min = (this.state.min < 10) ? ("0" + this.state.min) : this.state.min;
        const sec = (this.state.sec < 10) ? ("0" + this.state.sec) : this.state.sec;
        const icon = this.state.timer ? 'pause' : 'play';
        const bText = this.state.timer ? 'Done working' : 'Start Working';
        const opacity = this.state.disabled ? 0.4 : 1;
        return (
          <View>
            <View
              height={Dimensions.get('window').width*0.4}
              width={Dimensions.get('window').width*0.8}
              style={styles.card}
            >
              <Button 
                icon={icon}
                mode='contained'
                width={Dimensions.get('window').width*0.6}
                style={styles.button}
                onPress={this.toggleTimer}
              >
                {bText}
              </Button>
              <Text style={styles.title}>{min}:{sec}</Text>
            </View>
            <View 
              style={styles.card}
              height={Dimensions.get('window').width*0.3}
              width={Dimensions.get('window').width*0.8}
            > 
              <Button icon='star' mode='contained' 
                width={Dimensions.get('window').width*0.6} 
                style={styles.button}
                onPress={this.props.fTrue}
              >
                Begin Flex Session
              </Button>
            </View>
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
        padding:40,
      },
      title: {
        fontSize: 50,
        alignSelf:'center',
        padding:10,
      },
      label: {
        fontSize:20,
        alignSelf:'center',
        padding:5,
      },
      button: {
        padding: 5,
      }
});