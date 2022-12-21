import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import Button from '../Component/Button';
import { UPDATE_ALL_PRODUCT, UPDATE_PRODUCT } from '../Redux/actions/action';
import RestApi from '../RestApi/RestApi';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prod: []
    }
  }

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('focus', () => {
      this.props.add_product().then(() => {
        const { product } = this.props;
        this.setState({ prod: product });
      });
    })
  }

  async delete(item, index) {
    const { prod } = this.state;
    let data = {
      id: item.id,
      name: item.name,
      qty: item.qty,
      isActive: false,
      picture: item.picture,
      expiredAt: item.expiredAt,
    }
    await this.props.delete_product(data).then(() => {
      prod.splice(index, 1);
      this.setState({ prod: prod });
    });
  }

  showAlert(item, index) {
    Alert.alert(
      'Notice',
      'Hapus Data ini',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK', onPress: () => this.delete(item, index)
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { prod } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Button onPress={() => this.props.navigation.push('FormProduct', { type: 'add' })} type={'btn'} label="Add Product" />
        <View style={styles.form}>
          <View style={styles.table}>
            <View style={styles.tr}>
              <Text style={styles.tx_title}>Image</Text>
            </View>
            <View style={styles.tr}>
              <Text style={styles.tx_title}>Name</Text>
            </View>
            <View style={[styles.tr, { width: "10%" }]}>
              <Text style={styles.tx_title}>Qty</Text>
            </View>
            <View style={styles.tr}>
              <Text style={styles.tx_title}>Expired At</Text>
            </View>
            <View style={[styles.tr, { width: "30%", flexDirection: "row" }]}>
              <Text style={styles.tx_title}>Action</Text>
            </View>
          </View>
          <FlatList
            data={prod}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item, index }) => {
              if (item.isActive == true)
                return (
                  <View style={styles.table}>
                    <View style={styles.tr}>
                      <Image
                        source={{ uri: item.picture }}
                        resizeMethod='resize'
                        resizeMode='contain'
                        style={styles.img} />
                    </View>
                    <View style={styles.tr}>
                      <Text style={styles.tx}>{item.name}</Text>
                    </View>
                    <View style={[styles.tr, { width: "10%" }]}>
                      <Text style={styles.tx}>{item.qty}</Text>
                    </View>
                    <View style={styles.tr}>
                      <Text style={styles.tx}>{item.expiredAt}</Text>
                    </View>
                    <View style={[styles.tr, { width: "30%", flexDirection: "row" }]}>
                      <Button style={{ justifyContent: "center", padding: 5 }} onPress={() => this.props.navigation.push('FormProduct', { type: 'edit', item })} type={'btn_out'} icon="pen" />
                      <Button style={{ justifyContent: "center", padding: 5 }} onPress={() => this.showAlert(item, index)} type={'btn_out'} icon="trash" />
                    </View>
                  </View>
                )
              else
                return null
            }}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  img: {
    width: 50,
    height: 50
  },
  form: {
    shadowColor: '#999',
    shadowRadius: 7,
    shadowOpacity: 0.3,
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 1
    },
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
  },
  table: {
    flexDirection: "row"
  },
  tr: {
    borderColor: '#CCC',
    borderWidth: 1,
    width: "20%",
    justifyContent: "center"
  },
  btn: {
    padding: 10
  },
  tx: {
    color: "#333",
    textAlign: "center",
    fontSize: 10
  },
  tx_title: {
    color: "#333",
    textAlign: "center",
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  }
});

const mapStateToProps = (state) => ({
  product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
  add_product: async () => {
    await RestApi.ApiGet("https://63a15c34e3113e5a5c52f5e4.mockapi.io/products").then((res) => (
      dispatch(UPDATE_ALL_PRODUCT(res.data))
    ));
  },
  delete_product: async (body) => {
    await RestApi.ApiPut("https://63a15c34e3113e5a5c52f5e4.mockapi.io/products/" + body.id, body).then((res) => {
      if (res.status == 200 || res.status == 201) {
        console.log('dispacth')
        dispatch(UPDATE_PRODUCT(res.data))
        Alert.alert('Notice', 'Delete Success');
      }
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
