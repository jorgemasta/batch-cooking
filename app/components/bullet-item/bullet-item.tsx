import * as React from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"

import { color, spacing } from "../../theme"
import { Text } from "../text"
import { TextProps } from "../text/text.props"

const BULLET_ITEM: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing[1],
  paddingBottom: spacing[1],
}

const BULLET: ImageStyle = {
  width: 8,
  height: 8,
  borderRadius: 8,
  backgroundColor: color.palette.green,
  marginLeft: spacing[2],
  marginRight: spacing[3],
  marginTop: 6,
}

const TEXT: TextStyle = {
  flex: 1,
}

export interface BulletItemProps extends TextProps {
  color?: string
}

export function BulletItem(props: BulletItemProps) {
  const { color } = props

  const bulletStyle: ViewStyle = color ? { ...BULLET, backgroundColor: color } : BULLET
  return (
    <View style={BULLET_ITEM}>
      <View style={bulletStyle}></View>
      <Text style={TEXT} {...props} />
    </View>
  )
}
