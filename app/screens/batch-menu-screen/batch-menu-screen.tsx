import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { FunctionComponent as Component } from "react"
import { TextStyle, View, ViewStyle } from "react-native"
import { Button } from "react-native-ui-kitten"
import reactotron from "reactotron-react-native"

import { BulletItem } from "../../components/bullet-item"
import { Header } from "../../components/header"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { Wrapper } from "../../components/wrapper"
import { useStores } from "../../models/root-store"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  // backgroundColor: color.palette.green,
  paddingBottom: spacing[5] * 4,
}

const DESCRIPTION: ViewStyle = {
  paddingTop: spacing[5],
}

const MEAL_LIST: ViewStyle = {
  paddingVertical: spacing[2],
  // paddingLeft: spacing[2],
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
}

const TITLE_WITH_TEXT: TextStyle = {
  ...TITLE,
  paddingBottom: spacing[3],
}

const SUBTITLE: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[1],
}
const FIRST_SUBTITLE: TextStyle = {
  ...SUBTITLE,
  paddingTop: 0,
}

const END_BUTTON: ViewStyle = {
  // marginTop: spacing[4],
  bottom: spacing[5],
  left: spacing[4],
  right: spacing[4],
  position: "absolute",
}

const BUTTON_TEXT: TextStyle = {
  textAlign: "center",
}

export const BatchMenuScreen: Component = observer(props => {
  const { navigation, route } = props
  const {
    menuStore: { getSelectedMenu, setNextWeek },
  } = useStores()

  const { id } = route?.params || {}
  const goBack = React.useMemo(() => () => navigation.goBack(), [navigation])
  const selectedMenu = getSelectedMenu(id)

  function handleOnPress() {
    setNextWeek(selectedMenu.id)
    goBack()
  }

  return (
    <>
      <Header text={selectedMenu.name} onPress={goBack} />
      <Screen style={ROOT} preset="scroll">
        <Wrapper>
          <Text style={DESCRIPTION}>{selectedMenu.description}</Text>
          <View style={MEAL_LIST}>
            {selectedMenu.meals.map(meal => {
              return <BulletItem key={meal} text={meal}></BulletItem>
            })}
          </View>
          <Text text="Listado de ingredientes" category="h6" style={TITLE} />
          <View style={MEAL_LIST}>
            {selectedMenu.shoppingList.map((category, index) => {
              return (
                <View key={category.title}>
                  <Text category="s1" style={index === 0 ? FIRST_SUBTITLE : SUBTITLE}>
                    {category.title}
                  </Text>
                  {category.data.map(ingredient => (
                    <BulletItem key={ingredient} text={ingredient} color={color.dim}></BulletItem>
                  ))}
                </View>
              )
            })}
          </View>
          <Text text="Empezar 👨‍🍳👩‍🍳" category="h6" style={TITLE_WITH_TEXT} />
          <Text>
            Si te ha gustado esta propuesta y te sientes cómodo con los ingredientes, haz click en
            "Seleccionar este batch cooking" y te guiaremos hasta que tengas todos los tuppers de tu
            semana.
          </Text>
        </Wrapper>
      </Screen>
      <Button status="success" style={END_BUTTON} textStyle={BUTTON_TEXT} onPress={handleOnPress}>
        Seleccionar este batch cooking
      </Button>
    </>
  )
})
