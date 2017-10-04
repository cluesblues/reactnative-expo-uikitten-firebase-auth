import React, { Component } from 'react';
import {
  LayoutAnimation,
  View,
  Image,
  Text,
  TextInput,
  Keyboard,
  Platform
 } from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import validator from 'validator';
import { emailResetChanged, errorSet, resetUser } from '../actions';
import Spinner from 'react-native-loading-spinner-overlay';

import ErrorMessage from './../components/ErrorMessage';
import { FormLabel, FormInput, FormValidationMessage, Button, Divider, SocialIcon, Icon } from 'react-native-elements';
import {scale, scaleModerate, scaleVertical} from './../utils/scale';


import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkStyleSheet,
  RkTheme
} from 'react-native-ui-kitten';
import {GradientButton} from './../components/';

class Reset_Screen extends Component {

  constructor(props) {

    super(props)

    this.state = {
      emailError: '',
      emailFlag: 0,
      keyboardflag: false,
      loadingState: false,
    }

    if (Platform.OS === 'android') {
      // UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

  }

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this));
  }

  componentWillUnmount () {
   this.keyboardDidShowListener.remove();
   this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    if ( true ) {  // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: true });
  }

  _keyboardDidHide () {
    if ( true ) {  // Platform.OS === 'android'
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
    this.setState({ keyboardflag: false });
  }

  static navigationOptions = {
     header: null
  }

  // Call action if the value is changed

  onemailResetChange(text) {
    this.props.emailResetChanged(text);
  }

  onButtonPress() {
    // this.setState({ loadingState: true });
    if (this.validateInput('emailReset', this.props.emailReset)) {
        this.props.resetUser({email: this.props.emailReset});
        console.log("Reset_Screen:Line 90: Email");
        this.props.navigation.navigate('welcome_screen');
    }
    // this.setState({ loadingState: false });
    Keyboard.dismiss();
  }

  // Validate the form inputs
  validateInput(inputName, inputVal) {

    console.log('profile_screen:line114:' + inputName + ' ' + inputVal);
    if (inputName == 'emailReset') {
      if (validator.isEmail(inputVal)){
        this.setState({ emailError: '' });
        this.setState({ emailFlag: 1 });
        return true;
      } else {
        this.setState({ emailError: 'Please enter a valid email address'});
        this.setState({ emailFlag: 0 });
        return false;
      }
    }

  }

  renderSpinner() {
    console.log('Profile_Screen:line171: ' + this.state.loadingState);
    if (this.state.loadingState) {
      return (
          <Spinner visible={true} color={'#FFFFFF'} size={'large'} />
      );
    }
  }

  // Display form validation errors if needed

  renderFormError(inputName) {
    if (inputName == 'email') {
      if (this.state.emailError !='') {
        return (<RkText rkType='danger'> {this.state.emailError} </RkText>);
      }
    }
    return;
  }

  onNavPress = (screenname) => {
    this.props.navigation.navigate(screenname);
  }

  render() {


    let keyboardUp_image = (this.state.keyboardflag) ? -1 : 1;
    let keyboardUp_image_content = { flex: keyboardUp_image };

    let renderIcon = () => {
        return (
          <View style={{ ...styles.imageStyle, ...keyboardUp_image_content }}>
            <Image style={styles.image} source={require('./../assets/images/cartLogo.png')}/>
            <RkText rkType='h1'>Registration</RkText>
          </View>
          );
    };

    let keyboardUp_justifyContent = (this.state.keyboardflag) ? 'flex-start' : 'space-around';
    let keyboardUp_styles_content = {justifyContent: keyboardUp_justifyContent};

    console.log('Reset_Screen:Line 157: Rendering Reset_Screen');

    return (
      <View style={{...styles.screen, ...keyboardUp_styles_content}}>
        { renderIcon() }
        <View style={styles.content}>
          <View>
            <RkTextInput
              rkType='rounded'
              placeholder='Email ( John.Doe@gmail.com )'
              value={this.props.emailReset}
              onChangeText={emailReset => this.onemailResetChange(emailReset)}
              onBlur={() => { this.validateInput('email', this.props.emailReset); }}
            />
            <View>
              { this.renderFormError('emailReset') }
            </View>

          </View>
        </View>

        <View style={{ ...styles.buttonStyle, ...keyboardUp_image_content }}>
          <GradientButton
            style={styles.save}
            rkType='large'
            text='Send reset email'
            onPress={() => {
              this.onButtonPress();
            }}/>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('login_screen')}>
                <RkText rkType='primary3'>Already have an account?</RkText>
                <RkText rkType='header6'> Sign In now </RkText>
              </RkButton>
            </View>
          </View>
        </View>


        <ErrorMessage />


      </View>

    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  imageStyle: {
    alignItems: 'center',
    marginTop: 20
  },
  buttonStyle: {
    justifyContent: 'flex-end'
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'flex-start',
    marginTop: 20
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));

const mapStateToProps = ({ auth }) => {
  const { emailReset } = auth;
  return { emailReset };
};

export default connect(mapStateToProps, {
  emailResetChanged, resetUser, errorSet
})(Reset_Screen);