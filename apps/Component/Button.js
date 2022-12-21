import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/themed';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    button() {
        const {
            label,
            onPress,
            icon,
            iconSize,
            style
        } = this.props;
        return (
            <TouchableOpacity
                {...style}
                activeOpacity={.7}
                style={styles.button}
                onPress={onPress}
            >
                {
                    icon != null ?
                        <Icon name={icon} type="ionicon" size={iconSize != null ? iconSize : 20} color="#FFF" />
                        :
                        <Text style={styles.tx_button}>{label}</Text>
                }
            </TouchableOpacity>
        );
    }


    button_outline() {
        const {
            label,
            onPress,
            icon,
            iconSize,
            style
        } = this.props;
        return (
            <TouchableOpacity
               
                activeOpacity={.7}
                style={[styles.button_out, {...style}]}
                onPress={onPress}
            >
                {
                    icon != null ?
                        <Icon name={icon} type="font-awesome-5" size={iconSize != null ? iconSize : 20} color="#888" />
                        :
                        <Text style={styles.tx_button_out}>{label}</Text>
                }
            </TouchableOpacity>
        );
    }

    render() {
        const { type } = this.props;
        if (type == 'btn_out')
            return this.button_outline();
        else
            return this.button();
    }
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#D90000',
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: "center"
    },
    button_out: {
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 10,
        padding: 10,
        margin: 5,
        alignItems: "center"
    },
    tx_button: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize:12
    },
    tx_button_out: {
        color: "#666",
        fontWeight: "bold",
        fontSize:12
    }
})

export default Button;
