// eslint-disable-next-line import/no-anonymous-default-export
export default function (bookUrl = null, action) {
  if (action.type === 'addBookUrl') {
    return action.bookUrl;
  } else {
    return bookUrl;
  }
}
