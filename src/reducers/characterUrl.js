// eslint-disable-next-line import/no-anonymous-default-export
export default function (characterUrl = null, action) {
  if (action.type === 'addCharacterUrl') {
    return action.characterUrl;
  } else {
    return characterUrl;
  }
}
