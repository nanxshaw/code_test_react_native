import React, { Component } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import Button from '../Component/Button';
import ImagePicker from 'react-native-image-crop-picker';
import InputText from '../Component/InputText';
import { ADD_PRODUCT, UPDATE_PRODUCT } from '../Redux/actions/action';
import RestApi from '../RestApi/RestApi';
import DatePicker from 'react-native-date-picker'
import { CheckBox } from '@rneui/themed';

class FormProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      qty: null,
      isActive: null,
      picture: null,
      expiredAt: null,
      date: new Date(),
      isOpenDate: false,
    };
  }

  componentDidMount() {
    const { type, item } = this.props.route.params;
    if (type == 'edit')
      this.setState({
        id: item.id,
        name: item.name,
        qty: item.qty,
        isActive: item.isActive,
        picture: item.picture,
        expiredAt: item.expiredAt,
      })
  }

  onChangeValue = (name, value) => {
    this.setState({ [name]: value })
  }

  openPhotos = async () => {
    await ImagePicker.openPicker({
      mediaType: "photo",
      compressImageQuality: 0.5,
      compressImageMaxHeight: 600,
      compressImageMaxWidth: 800,
      width: 800,
      height: 600,
      includeBase64: true
    }).then((image) => {
      let picture = 'data:image/jpeg;base64,' + image.data;
      this.setState({
        picture
      })
    });
  }

  save = () => {
    const { id, name, qty, picture, expiredAt, isActive } = this.state;
    const { product } = this.props;
    const { type } = this.props.route.params;
    if (picture != null && picture != '')
      if (name != null && name != '')
        if (qty != null && qty != '')
          if (expiredAt != null && expiredAt != '')
            if (isActive == true) {
              let data = {
                id: type == 'add' ? product.length : id,
                name,
                qty,
                picture,
                expiredAt,
                isActive
              }

              if (type == 'add') {
                this.props.add_product(data).then(() => {
                  this.props.navigation.pop();
                });
              } else {
                this.props.update_product(data).then(() => {
                  this.props.navigation.pop();
                });
              }
            } else {
              Alert.alert('Notice', 'IsActive not checked!');
            }
          else
            Alert.alert('Notice', 'ExpiredAt is Empty!');
        else
          Alert.alert('Notice', 'Qty is Empty!');
      else
        Alert.alert('Notice', 'Name is Empty!');
    else
      Alert.alert('Notice', 'Picture is Empty!');
  }

  render() {
    const { id, name, qty, picture, expiredAt, isActive, isOpenDate, date } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={{ margin: 10 }}>
            <TouchableOpacity activeOpacity={.7} onPress={() => this.openPhotos()} >
              <Image source={picture != null ? { uri: picture } : require('../../assets/add_border.png')} style={styles.img} />
            </TouchableOpacity>
          </View>
          <InputText
            label='id (disable)'
            name='id'
            disabled={true}
            value={id}
            onChangeValue={this.onChangeValue}
          />
          <InputText
            label='name'
            name='name'
            value={name}
            onChangeValue={this.onChangeValue}
          />
          <InputText
            placeholde="Name"
            label='qty'
            name='qty'
            value={qty}
            keyboardType="numeric"
            onChangeValue={this.onChangeValue}
          />
          <Text style={styles.tx}>Expired At</Text>
          <Button onPress={() => this.setState({ isOpenDate: true })} type={'btn_out'} label={expiredAt != null ? expiredAt.toString() : "Expired At"} />
          <DatePicker
            modal
            open={isOpenDate}
            date={date}
            onConfirm={(date) => {
              this.setState({
                isOpenDate: false,
                expiredAt: date
              })
            }}
            onCancel={() => {
              this.setState({
                isOpenDate: false
              })
            }}
          />
          <CheckBox
            title='Active'
            checked={isActive}
            onPress={() => this.setState({ isActive: !isActive })}
          />
          <Button onPress={this.save} type={'btn'} label="Simpan" />
          <Button onPress={() => this.props.navigation.pop()} type={'btn_out'} label="Back" />

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFF"
  },
  form_image: {
    marginBottom: 10,
    borderBottomColor: "#CCCCCC",
    borderBottomWidth: 1
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10
  },
  tx: {
    color: "#333",
    marginLeft: 10
  }
})

const mapStateToProps = state => ({
  product: state.product
});

const mapDispatchToProps = (dispatch) => ({
  add_product: async (body) => {
    await RestApi.ApiPost("https://63a15c34e3113e5a5c52f5e4.mockapi.io/products", body).then((res) => {
      if (res.status == 200 || res.status == 201) {
        dispatch(ADD_PRODUCT(res.data));
        Alert.alert('Notice', 'Success');
      }
    });
  },
  update_product: async (body) => {
    await RestApi.ApiPut("https://63a15c34e3113e5a5c52f5e4.mockapi.io/products/" + body.id, body).then((res) => {
      if (res.status == 200 || res.status == 201) {
        dispatch(UPDATE_PRODUCT(res.data));
        Alert.alert('Notice', 'Success');
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FormProduct);