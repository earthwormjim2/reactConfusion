import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';
import Dishdetail from './DishdetailComponent.js';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDish: null
    };
  }

  onDishSelect(dish) {
    this.setState({ selectedDish: dish });
  }


  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="col-12 col-md-5 m-1">

          <Card onClick={() => this.onDishSelect(dish)}>
            <CardImg src={dish.image} alt={dish.name} />
            <CardImgOverlay  >
              <CardTitle heading="true">{dish.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
        <Dishdetail selectedDish={this.state.selectedDish} />
      </div>
    );
  }
}

export default Menu;