
export const setWidth = (textDara:string):string => {
  const number = (textDara.match(/structure/g)||[]).length
  return number * 250 + "px"
}
