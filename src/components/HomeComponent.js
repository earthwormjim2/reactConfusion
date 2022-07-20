import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
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

function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMess) {
        return (
            <h4>{errMess}</h4>
        );
    }
    else {
        //       console.log("Rendering Item: ");
        //       console.log(item);
        return (
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        )
    }

}

function Home(props) {
    return (
        <motion.div className='container'
            variants={containerVariants}
            initial="initial"
            animate="displayed"
            exit="departed"
        >
            <div className='row align-items start'>
                < div className='col-12 col-md m-1'>
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess} />
                </div>
                < div className='col-12 col-md m-1'>
                    <RenderCard item={props.promotion}
                        isLoading={props.promosLoading}
                        errMess={props.promosErrMess} />
                </div>
                < div className='col-12 col-md m-1'>
                    <RenderCard item={props.leader}
                        isLoading={props.leadersLoading}
                        errMess={props.leadersErrMess} />
                </div>
            </div>
        </motion.div>
    );
}
export default Home;