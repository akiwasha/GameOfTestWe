import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Skeleton } from 'antd';
import { connect } from 'react-redux';
import Nav from '../Nav';

function CharacterDetails({ characterUrl, addToWishList }) {
  const [characterDetails, setCharacterDetails] = useState(null); //état lié aux infos du personnage

  //au chargement de la page, appel de l'api pour récupérer les infos liées aux personnages et stocker dans characterDetails
  useEffect(() => {
    const fetchCharacterData = async () => {
      const data = await fetch(characterUrl);
      const body = await data.json();
      setCharacterDetails(body);
    };
    fetchCharacterData();
  }, [characterUrl]);

  //afficher un indicateur de chargement en attendant la réponse de l'API
  if (characterDetails === null) {
    return <Skeleton />;
  }

  const characterDetailsDisplay = (
    <Col xs={24} md={12} lg={6} style={{ textAlign: 'center' }}>
      <Card
        title={characterDetails.name ? characterDetails.name : 'Unknown'}
        bordered={true}
        style={{ width: 300 }}
      >
        <p>
          Gender:{' '}
          {characterDetails.gender ? characterDetails.gender : 'Unknown'}
        </p>
        <p>
          Culture:{' '}
          {characterDetails.culture ? characterDetails.culture : 'Unknown'}
        </p>
        <p>Born: {characterDetails.born ? characterDetails.born : 'Unknown'}</p>
        <p>Died: {characterDetails.died ? characterDetails.died : 'Unknown'}</p>
        <p>
          Titles:{' '}
          {characterDetails.titles
            ? characterDetails.titles.map((e) => e + ' ')
            : 'Unknown'}
        </p>
        <p>
          Aliases:{' '}
          {characterDetails.aliases
            ? characterDetails.aliases.map((e) => e + ' ')
            : 'Unknown'}
        </p>
        <p>
          Father:{' '}
          {characterDetails.father ? characterDetails.father : 'Unknown'}
        </p>
        <p>
          Mother: {characterDetails.mother ? characterDetails.died : 'Unknown'}
        </p>

        <Button
          type="primary"
          onClick={() => {
            addToWishList(characterDetails);
            alert('Character added to your wishlist!');
          }}
        >
          Add to wishlist
        </Button>
      </Card>
    </Col>
  );

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: 'center' }} className="text">
        {characterDetails.name}
      </h1>

      <Row style={{ textAlign: 'center' }}>{characterDetailsDisplay}</Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { characterUrl: state.characterUrl };
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (character) {
      dispatch({ type: 'addToWishList', characterLiked: character });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetails);
