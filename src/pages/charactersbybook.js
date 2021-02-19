import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Skeleton } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav';

function CharactersByBook({ bookUrl, addCharacterUrl }) {
  const [charactersList, setCharactersList] = useState(null); //état lié à la liste des personnages du livre sélectionné
  const [bookTitle, setBookTitle] = useState(null); //état lié au titre du livre sélectionné
  const [loadingCharacterPage, setLoadingCharacterPage] = useState(false); //état lié à l'indicateur de chargement de la page de personnage

  //au chargement de la page, récupération de l'url du livre dans redux et appel de l'api pour récup la liste des personnages
  useEffect(() => {
    const fetchCharactersListData = async () => {
      const data = await fetch(bookUrl);
      const body = await data.json();
      //   console.log(body.characters);
      setCharactersList(body.characters);
      setBookTitle(body.name);
    };
    fetchCharactersListData();
  }, [bookUrl]);

  //   redirection vers la page dédiée au personnage sélectionné
  if (loadingCharacterPage) {
    return <Redirect to="/character" />;
  }

  //afficher un indicateur de chargement en attendant la réponse de l'API
  if (!charactersList || !bookTitle) {
    return <Skeleton />;
  }

  const charactersListDisplay = charactersList.map((e, i) => (
    <Col key={i} xs={24} md={12} lg={6} style={{ textAlign: 'center' }}>
      <Card
        title={'Mysterious character n°' + i}
        bordered={true}
        style={{ width: 300 }}
      >
        <Button
          type="primary"
          loading={loadingCharacterPage}
          onClick={() => {
            addCharacterUrl(e);
            setLoadingCharacterPage(true);
          }}
        >
          Check this character
        </Button>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: 'center' }} className="text">
        Characters from the book: {bookTitle}
      </h1>
      <Row style={{ textAlign: 'center' }}>{charactersListDisplay}</Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { bookUrl: state.bookUrl };
}

function mapDispatchToProps(dispatch) {
  return {
    addCharacterUrl: function (characterUrl) {
      dispatch({ type: 'addCharacterUrl', characterUrl });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersByBook);
