import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Header } from 'react-native-elements';
import { Auth } from 'aws-amplify';


import Progress from './Progress.js';
import Controls from './Controls.js';
import Flex from './Flex.js';



export default class Home extends React.Component {
    _isMounted = false;
    email = "null";

    constructor(props) {
        super(props);
        this.state = {level: 1, exp: 1, mVisible:false};
    }

    async componentDidMount() {
        this._isMounted = true;
        await Auth.currentCredentials(); 
        const info = await Auth.currentUserInfo();
        this.email = info.attributes.email;
        const exists = await this.checkDocExists();
        if (exists) {
            console.log('exists');
            const data = await this.getUserDoc();
            if (this._isMounted) {
                this.setState({level: data.level, exp: data.exp});
            }
            
        } else {
            this.createNewDoc();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async createNewDoc() {
        const fb = this.props.fb;
        await fb.collection('users').doc(this.email).set({
            level: 1,
            exp: 1,
        });
    }

    async checkDocExists() {
        const fb = this.props.fb;
        const userRef = await fb.collection('users').doc(this.email);
        console.log(this.email);
        const userDoc = await userRef.get();
        if (userDoc.exists) {
            return true;
        } else {
            return false;
        }
    }


    async getUserDoc() {
        const fb = this.props.fb;
        const userRef = fb.collection('users').doc(this.email);
        const userDoc = await userRef.get()
            .catch(err => {
                console.log('Error getting document', err);
            }
        );
        return userDoc.data();
    }

    async updateUserDoc(level, exp) {
        const fb = this.props.fb;
        await fb.collection('users').doc(this.email).set({
            level: level,
            exp: exp,
        });
    }

    modalTrue = () => {
        this.setState({mVisible: true});
    }

    modalFalse = () => {
        this.setState({mVisible: false});
    }

    onComplete = () => {
        const expToNextLevel = Math.floor(10*(Math.pow(1.1, this.state.level - 1)));
        let exp = this.state.exp + 10;
        let level = this.state.level;
        if (exp >= expToNextLevel) {
            level++;
            exp -= expToNextLevel;
        }
        this.setState({level: level, exp: exp});
    }

    render = () => {
        return (
            
                <View style={styles.container}>
                    <Progress 
                        level={this.state.level}
                        exp={this.state.exp}
                    />
                    <Controls fTrue={this.modalTrue} />
                    <Modal visible={this.state.mVisible} presentationStyle='fullScreen'>
                        <Flex hide={this.modalFalse} complete={this.onComplete}/>
                    </Modal>
                </View>
            
        );
    }
}

const styles = StyleSheet.create({
    
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
      alignItems: 'center',
      //padding: 50,
      overflow: 'hidden',
    },
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
    modal: {
        backgroundColor: '#ff0000',
    }
  });
  