export type ItemPosition = 'leading' | 'trailing'
export function cornerRadii(itemPosition: ItemPosition | undefined) {
  switch (itemPosition) {
    case 'leading':
      return { bottomEnd: 4, bottomStart: 4, topEnd: 20, topStart: 20 }
    case 'trailing':
      return { bottomEnd: 20, bottomStart: 20, topEnd: 4, topStart: 4 }
    default:
      return { bottomEnd: 4, bottomStart: 4, topEnd: 4, topStart: 4 }
  }
}
