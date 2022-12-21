import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onChangeText = (value) => {
    const { name } = this.props;
    this.props.onChangeValue(name, value);
  }

  onFocusChange = () => {
    this.setState({ isFocused: true });
  }

  render() {
    const { placeholder, keyboardType, label, style, value, disabled } = this.props;
    return (
      <View style={{ margin: 10 }}>
        <Text style={styles.tx}>{label}</Text>
        <TextInput
          {...style}
          style={styles.in}
          onChangeText={(text) => this.onChangeText(text)}
          underlineColorAndroid="transparent"
          onFocus={this.onFocusChange}
          placeholderTextColor='#bcbcbc'
          placeholder={placeholder}
          keyboardType={keyboardType != null ? keyboardType : "default"}
          onBlur={this.onBlur}
          autoCorrect={false}
          value={value}
          editable={disabled ? !disabled : true} 
          selectTextOnFocus={disabled ? !disabled : true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  in: {
    borderColor: '#E4E4E4',
    borderRadius: 10,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 10,
  },
  tx: {
    color: "#333",
    marginBottom: 5
  }
})

export default InputText;
