// eslint-disable-next-line import/no-anonymous-default-export
export default function (characterNumber = null, action) {
  if (action.type === 'addCharacterNumber') {
    return action.characterNumber;
  } else {
    return characterNumber;
  }
}
