import { StyleSheet, Text, View, TextInput, TextInputProps } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

interface InputComponentProps extends TextInputProps{
    isDescription?: boolean;
    iconName?: keyof typeof FontAwesome.glyphMap //font awesome icon namee
}

export const InputComponent: React.FC<InputComponentProps> = ({
  isDescription = false,
  iconName,
  ...props
}) => {
    return(
        <View style={styles.mainContainer}>
            {iconName && (
                <FontAwesome name={iconName} size={20} style={styles.icon}/>
            )}
            <TextInput
            style={[styles.input, 
                    {height: isDescription ? 100 : 40}
                    ]}
            multiline={isDescription}
            {...props}/>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        margin: 8,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    icon: {
        marginRight: 8
    },
    input: {
        borderBottomWidth: 1,
        textAlignVertical: 'bottom',
        fontSize: 16,
        width: '100%'
    }
})