import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { motion } from 'framer-motion';

// as the course's animation library, react-animation-components has been deprecated, 
// I reimplimented using Framer - Motion which works with new versions
// of react. This library is cleaner and more preformant, and also replaces the features in react-transition group.
// This allows all the desired features with only one library vs. two (one of which, as mentioned, is deprecated)

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


function About(props) {
    function RenderLeader({ leader }) {
        return (
            <Media className="row my-5" key={leader.id}
                variants={containerVariants}
            >
                <Media left className="col col-sm-2" href="#">
                    <Media src={baseUrl + leader.image} alt={leader.name} />
                </Media>
                <Media body className="col">
                    <Media heading>
                        {leader.name}
                    </Media>
                    <Media className='mb-2'>
                        {leader.designation}
                    </Media>
                    <Media>
                        {leader.description}
                    </Media>
                </Media>
            </Media>
        );
    }

    let leaders = null;
    if (props.leaders.isLoading) {
        leaders = (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        )
    }
    else if (props.leaders.errMess) {
        leaders = (
            <div className='container'>
                <div className='row'>
                    <h4> {props.leaders.errMess}</h4>
                </div>
            </div>
        )
    }
    else {
        // while there is a staggerChildren property, doing it this way links the delay to when the object is rendered,
        // otherwise depending on the timing of the redux load, one might "miss" the staggered Animation... this 
        // method works both in the case of a page reload, and in the case of a transition from another page.
        leaders = (props.leaders.leaders.map((leader, index) => {
            return (
                <motion.div
                    key={leader.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{delay: index * 0.5}}
                >
                    <RenderLeader  leader={leader} />
                </motion.div>
            );
        }));
    }




    return (
        <motion.div className="container"
            variants={containerVariants}
            initial="initial"
            animate="displayed"
            exit="departed"
        >
            <div className="row">
                <Breadcrumb className='bg-light'>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <div className="col-12 col-md-5">
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote row">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer row">Yogi Berra,
                                    <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                        P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <Media list >
                    {leaders}
                </Media>
            </div>
        </motion.div>
    );
}

export default About;    