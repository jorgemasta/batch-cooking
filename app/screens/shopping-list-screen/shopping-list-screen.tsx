import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import includes from "ramda/es/includes"
import React, { FunctionComponent as Component } from "react"
import { SectionList, TextStyle, ViewStyle } from "react-native"
import { Button, CheckBox } from "react-native-ui-kitten"

import { Header } from "../../components/header"
import { Screen } from "../../components/screen"
import { Text } from "../../components/text"
import { useStores } from "../../models/root-store"
import { spacing } from "../../theme"

/********************************/

type ShoppingListCategoryData = string
interface ShoppingListCategory {
  title: string
  data: ShoppingListCategoryData[]
}

/********************************/

const ROOT: ViewStyle = {}
const SECTION: ViewStyle = {
  paddingBottom: spacing[5] * 4,
  paddingHorizontal: spacing[4],
}

const TITLE: TextStyle = {
  paddingTop: spacing[4],
  paddingBottom: spacing[3],
}

const CHECK_BOX: ViewStyle = {
  marginVertical: spacing[2],
  paddingLeft: spacing[2],
  minHeight: 40,
}

const END_BUTTON: ViewStyle = {
  bottom: spacing[5],
  left: spacing[4],
  right: spacing[4],
  position: "absolute",
}

const BUTTON_TEXT: TextStyle = {
  textAlign: "center",
}

// TODO: Check Out of Mil
export const ShoppingListScreen: Component = observer(props => {
  const {
    menuStore: {
      nextWeekMenu,
      hasAllIngredients,
      completeShopping,
      ingredientsSelected,
      addIngredientSelected,
      removeIngredientSelected,
    },
  } = useStores()
  const navigation = useNavigation()
  const goBack = React.useMemo(() => () => navigation.goBack(), [navigation])

  function renderHeader({ section }: { section: ShoppingListCategory }) {
    return <Text text={section.title} category="h6" style={TITLE} />
  }
  function renderItem({ item }: { item: ShoppingListCategoryData }) {
    return (
      <CheckBox
        style={CHECK_BOX}
        text={item}
        checked={includes(item, ingredientsSelected)}
        onChange={value => {
          if (value) {
            addIngredientSelected(item)
          } else {
            removeIngredientSelected(item)
          }
        }}
      />
    )
  }

  function handleOnPress() {
    // TODO: Show alert to confirm if hasAllIngredients === false
    completeShopping()
    goBack()
  }

  // Little hack to force re-render after `ingredientsSelected` changes
  const extraData = ingredientsSelected.slice()

  return (
    <>
      <Header text="Lista de la compra" onPress={goBack} />
      <Screen preset="fixed" style={ROOT}>
        <SectionList
          sections={nextWeekMenu.shoppingList}
          renderItem={renderItem}
          renderSectionHeader={renderHeader}
          extraData={extraData}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={SECTION}
        />
      </Screen>
      <Button
        status={hasAllIngredients ? "success" : "basic"}
        style={END_BUTTON}
        textStyle={BUTTON_TEXT}
        onPress={handleOnPress}
      >
        Ya tengo todos los ingredientes
      </Button>
    </>
  )
})
