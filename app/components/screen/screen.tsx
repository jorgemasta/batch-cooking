import * as React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { useSafeArea } from "react-native-safe-area-context"
import { styled } from "react-native-ui-kitten"

import { color } from "../../theme"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { ScreenProps } from "./screen.props"

const isIos = Platform.OS === "ios"

const CONTAINER: ViewStyle = {
  flex: 1,
}
const GRADIENT: ViewStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.fixed
  const style = props.style || {}
  const themedStyle = props.themedStyle || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={props.statusBar || "light-content"}
        backgroundColor={color.storybookDarkBg}
      />
      <View style={[themedStyle, preset.inner, style, insetStyle]}>{props.children}</View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const insets = useSafeArea()
  const preset = presets.scroll
  const style = props.style || {}
  const themedStyle = props.themedStyle || {}
  const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
  const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? "padding" : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
    >
      <StatusBar
        barStyle={props.statusBar || "light-content"}
        backgroundColor={color.storybookDarkBg}
      />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        <ScrollView
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[themedStyle, preset.inner, style]}
        >
          {props.children}
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function ScreenComponent(props: ScreenProps) {
  return (
    <View style={CONTAINER}>
      <LinearGradient
        colors={[color.palette.green, color.palette.greenDark]}
        start={{ x: 0, y: 0 }}
        style={GRADIENT}
      />
      {isNonScrolling(props.preset) ? (
        <ScreenWithoutScrolling {...props} />
      ) : (
        <ScreenWithScrolling {...props} />
      )}
    </View>
  )
}

ScreenComponent.styledComponentName = "Layout"
export const Screen = styled(ScreenComponent)
