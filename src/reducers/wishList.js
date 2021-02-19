// eslint-disable-next-line import/no-anonymous-default-export
export default function (wishList = [], action) {
  if (action.type === 'addToWishList') {
    const wishListCopy = [...wishList];

    //on vérifie la présence d'un doublon avant de procéder à l'ajout
    let findCharacter = false;
    if (wishListCopy.length !== 0) {
      wishListCopy.map(
        (e) => e.url === action.characterLiked.url && (findCharacter = true)
      );
    }

    //en l'absence de doublon, on ajoute le personnage à la wishlist
    if (!findCharacter) {
      wishListCopy.push(action.characterLiked);
    }
    return wishListCopy;
  } else if (action.type === 'deleteFromWishList') {
    const wishListCopy = [...wishList];

    //recherche de la position du personnage dans la wishlist (qui est un array)
    let position = null;

    wishListCopy.map(
      (e, i) => e.url === action.characterDetails.url && (position = i)
    );

    //suppression du personnage de la wishlist à partir de la position
    if (position != null) {
      wishListCopy.splice(position, 1);
    }

    return wishListCopy;
  } else {
    return wishList;
  }
}
