import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Skeleton } from 'antd';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { dateFormatter } from '../helpers';
import Nav from '../Nav';

function Home({ addCharacterUrl, addBookUrl }) {
  const [booksData, setBooksData] = useState([]); //état lié aux infos des livres
  const [loadingBookPage, setLoadingBookPage] = useState(false); //état lié à l'indicateur de chargement du bouton "check character from this book"
  const [loadingRandomChar, setLoadingRandomChar] = useState(false); //état lié à l'indictaur de chargement du bouton "click me!"

  //au chargement de la page, appel de l'api pour récupérer les infos liées aux livres et stocker dans booksData
  useEffect(() => {
    const fetchBooksData = async () => {
      const data = await fetch(
        `https://anapioficeandfire.com/api/books?pageSize=20`
      );
      const body = await data.json();
      setBooksData(body);
    };
    fetchBooksData();
  }, []);

  //redirection vers la page dédiée au livre sélectionné
  if (loadingBookPage) {
    return <Redirect to="/charactersbybook" />;
  }

  //redirection vers la page de personnage aléatoire
  if (loadingRandomChar) {
    return <Redirect to="/character" />;
  }

  //afficher un indicateur de chargement en attendant la réponse de l'API
  if (!booksData) {
    return <Skeleton />;
  }

  const booksList = booksData.map((e, i) => (
    <Col xs={24} md={12} lg={6} style={{ textAlign: 'center' }} key={i}>
      <Card title={e.name} bordered={true} style={{ width: 300 }}>
        <p>Author(s): {e.authors.map((e) => e + ' \n')}</p>
        <p>Number of pages= {e.numberOfPages}</p>
        <p>Released: {dateFormatter(e.released)}</p>
        <p>Publisher: {e.publisher}</p>
        <Button
          type="primary"
          loading={loadingBookPage}
          onClick={() => {
            addBookUrl(e.url);
            setLoadingBookPage(true);
          }}
        >
          Check characters from this book
        </Button>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: 'center' }} className="text">
        Discover your favorite books and characters from the GoT universe!
      </h1>
      <h3 style={{ textAlign: 'center' }} className="text">
        Select a book
      </h3>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>{booksList}</Row>
      <Row>
        <Col xs={24} style={{ textAlign: 'center' }}>
          <h3 className="text">Want to discover a random GoT character ?</h3>
          <Button
            type="primary"
            loading={loadingRandomChar}
            onClick={() => {
              setLoadingRandomChar(true);
              //génération d'un nombre aléatoire et insertion dans l'url pour accéder à un personnage aléatoire
              addCharacterUrl(
                `https://www.anapioficeandfire.com/api/characters/${Math.floor(
                  Math.random() * 2100
                )}`
              );
            }}
          >
            Click me!
          </Button>
        </Col>
      </Row>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addCharacterUrl: function (characterUrl) {
      dispatch({ type: 'addCharacterUrl', characterUrl });
    },
    addBookUrl: function (bookUrl) {
      dispatch({ type: 'addBookUrl', bookUrl });
    },
  };
}

export default connect(null, mapDispatchToProps)(Home);
