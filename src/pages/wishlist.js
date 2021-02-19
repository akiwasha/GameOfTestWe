import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Col, Row, Skeleton } from 'antd';
import Nav from '../Nav';

function WishList({ wishList, deleteFromWishList }) {
  useEffect(() => {
    console.log(wishList);
  }, [wishList]);

  //afficher un indicateur de chargement en attendant la récupération des données dans redux
  if (wishList === undefined || !wishList) {
    return <Skeleton />;
  }

  const wishListDisplay = wishList.map((e, i) => (
    <Col key={i} xs={24} md={12} lg={6} style={{ textAlign: 'center' }}>
      <Card title={e.name} bordered={true} style={{ width: 300 }}>
        <p>Gender: {e.gender ? e.gender : 'Unknown'}</p>
        <p>Culture: {e.culture ? e.culture : 'Unknown'}</p>
        <p>Born: {e.born ? e.born : 'Unknown'}</p>
        <p>Died: {e.died ? e.died : 'Unknown'}</p>
        <p>Titles: {e.titles ? e.titles.map((e) => e + ' ') : 'Unknown'}</p>
        <p>Aliases: {e.aliases ? e.aliases.map((e) => e + ' ') : 'Unknown'}</p>
        <p>Father: {e.father ? e.father : 'Unknown'}</p>
        <p>Mother: {e.mother ? e.died : 'Unknown'}</p>

        <Button
          type="primary"
          onClick={() => {
            deleteFromWishList(e);
            alert('Character deleted from your wishlist!');
          }}
        >
          Delete from wishlist
        </Button>
      </Card>
    </Col>
  ));

  return (
    <div>
      <Nav />
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]}>
        {wishListDisplay}
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { wishList: state.wishList };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFromWishList: function (characterDetails) {
      dispatch({ type: 'deleteFromWishList', characterDetails });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
