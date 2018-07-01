import React from 'react';
import { StyleSheet, 
  Text, 
  View, 
  TextInput, 
  Keyboard,
  Image,
  ToastAndroid 
} from 'react-native';
import MyButton from './components/MyButton';
import backgroundImage from './assets/minions_background.jpg';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as config from './config';

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      toTranslate: '',
      translation: '',
      radio_props: [
        {label: 'Minion', value: 0 },
        {label: 'Yoda', value: 1 }
      ],
      rbIndex: 0,
    }
  }

  translate = () => {
    console.log('Translation in progress..');
    Keyboard.dismiss();

    const apiKey = config.API_KEY;
    const string = this.state.toTranslate.toLocaleLowerCase();
    const selectedApi = this.state.radio_props[this.state.rbIndex].value === 0 ? 'minion' : 'yoda';

    // let api = 'minion';
    return fetch('http://api.funtranslations.com/translate/'+selectedApi+'.json?text='+string+apiKey)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);

        var data = responseJson.contents.translated ? 
                    responseJson.contents.translated : false;
        
        if (data) {
          console.log(data);
          this.setState({translation: data});
        }
      }).catch((error) => {
        ToastAndroid.show('ERROR\n:'+JSON.stringify(error), ToastAndroid.SHORT);
        console.log(error);
      })
  }

  renderContent = () => {
    if (this.state.translation) {
      return <Text style={{fontSize: 20}}>{this.state.translation}</Text>;
    } else {
      return <Text>No translation found!</Text>
    }
  }

  

  render() {
    return (
      
      <View style={styles.container}>
        <View style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: '100%', opacity: 0.4 }}>
          <Image source={backgroundImage}
          style={{ flex: 1 ,height: null, width: null }}/>
        </View>

          <RadioForm
            radio_props={this.state.radio_props}
            initial={0}
            formHorizontal={true}
            animation={true}

            onPress={(value, index) => {this.setState({
              value:value,
              rbIndex: index
            })}}
          />
        <Text>selected: {this.state.radio_props[this.state.rbIndex].label}</Text>


        <TextInput 
            style={styles.firstTextInput} 
            value={this.state.toTranslate} 
            onChangeText={
              (toTranslate) => this.setState({toTranslate})}/>
        <MyButton translate={this.translate} />

        <View>
          {this.renderContent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  firstTextInput: {
    width: 150,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
