import React, { Component } from 'react';
import { Media } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className="mt-5">

          <Media className="media d-flex" tag="li" >
            <div className="col col-sm-2">
              <Media  left middle>
                <Media object src={dish.image} alt={dish.name} />
              </Media>
            </div>
            <div className="col ">
              <Media body >
                <Media heading>{dish.name}</Media>
                <p>{dish.description}</p>
              </Media>
            </div>
          </Media>
        </div>
      );
    });

    return (
      <div className="container">
        <div className="row">
          <Media list>
            {menu}
          </Media>
        </div>
      </div>
    );
  }
}

export default Menu;