import * as React from "react"
import { KeyboardAvoidingView, Platform, ViewStyle } from "react-native"

const ROOT: ViewStyle = { backgroundColor: "#f0f0f0", flex: 1, paddingTop: 32 }

export interface StoryScreenProps {
  children?: React.ReactNode
}

const behavior = Platform.OS === "ios" ? "padding" : null
export const StoryScreen = props => (
  <KeyboardAvoidingView style={ROOT} behavior={behavior} keyboardVerticalOffset={50}>
    {props.children}
  </KeyboardAvoidingView>
)
