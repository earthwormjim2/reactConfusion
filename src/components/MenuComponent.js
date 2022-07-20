import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { motion } from 'framer-motion';

const containerVariants = {
  initial: {
    opacity: 0,
    x: '100vw'
  },
  displayed: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      delay: 0.2,
      duration: 0.5,
    }
  },
  departed: {
    opacity: 0,
    x: "-100vw",
    transition: {
      type: "spring",
      delay: 0,
      duration: 0.4,
    }
  }
}

function RenderMenuItem({ dish }) {

  return (
    <Card >
      <Link to={`/menu/${dish.id}`} >
        <CardImg src={baseUrl + dish.image} alt={dish.name} />
        <CardImgOverlay  >
          <CardTitle heading="true">{dish.name}</CardTitle>
        </CardImgOverlay>
      </Link>

    </Card>
  );
}

// console.log(this.props);
const Menu = (props) => {
  const menu = props.dishes.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-12 col-md-5 m-1">
        <RenderMenuItem dish={dish} />

      </div>
    );
  });

  if (props.dishes.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    );
  }
  else if (props.dishes.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4> {props.dishes.errMess}</h4>
        </div>
      </div>
    );
  }
  else
    return (
      <motion.div className="container"
        variants={containerVariants}
        initial="initial"
        animate="displayed"
        exit="departed"
      >
        <div className='row'>
          <Breadcrumb className='bg-light'>
            <BreadcrumbItem> <Link to='/home'>Home</Link> </BreadcrumbItem>
            <BreadcrumbItem active> Menu </BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>Menu</h3>
            <hr />
          </div>

        </div>
        <div className="row">
          {menu}
        </div>
      </motion.div>
    );
}




export default Menu;