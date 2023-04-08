import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
/**
 *  Botón personalizado utiliza los componentes TouchableOpacity y Text para renderizar un botón con un texto personalizado y estilos configurables.
 * @param {string} title El texto que se muestra en el botón.
 * @param {string} title0 [Opcional] en caso de colocarlo el texto que se muestra en el botón en el lado izquierdo.
 * @param {string} title2 [Opcional] en caso de colocarlo el texto que se muestra en el botón en el lado derecho.
 * @param {func} onPrees  La función que se ejecuta cuando se presiona el botón.
 * @param {string} backgroundColor  El nuevo valor de la propiedad.
 * @param {string} textColor   El color del texto del botón.
 * @param {object} styles  los estilos adicionales que se aplican al botón.
 * @param {object} stylesText    Los estilos adicionales que se aplican al texto del botón.
 * @returns {void}
 */
const BtnCustom = ({
  title,
  onPress,
  backgroundColor,
  textColor,
  styles,
  stylesText,
  title0,
  title2,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: backgroundColor,
          borderColor: backgroundColor,
          padding: 8,
          borderRadius: 2,
        },
        styles,
      ]}
      onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Text
          style={[
            {
              color: textColor,
              fontWeight: 'bold',
              fontFamily: 'monospace',
              fontSize: 18,
            },
            stylesText,
          ]}>
          {title0}
        </Text>
        <Text style={[{ color: textColor, fontWeight: 'bold' }, stylesText]}>
          {title}
        </Text>

        <Text
          style={[
            {
              color: textColor,
              fontWeight: 'bold',
              fontStyle: 'italic',
              fontSize: 18,
            },
            stylesText,
          ]}>
          {title2}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BtnCustom;
