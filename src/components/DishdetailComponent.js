import React from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem,
    ListGroupItemHeading, ListGroupItemText, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom'




function RenderDish({ dish }) {
    //          console.log("Rendering Dish:" + dish);

    return (
        <Card key={dish.id} >
            <CardImg width="100%" src={dish.image} alt={dish.name} />
            <CardBody>
                <CardTitle><h1>{dish.name}</h1></CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
    );
}

function RenderComments({ comments }) {


    const commentListGroupItems = comments.map((comment) => {
        const commentDate = new Date(comment.date);
        const commentDateLocalTime = commentDate.toDateString();

        return (
            <ListGroupItem key={comment.id}>
                <ListGroupItemHeading>{comment.comment}</ListGroupItemHeading>
                <ListGroupItemText>{comment.author}, {commentDateLocalTime}</ListGroupItemText>
            </ListGroupItem>
        );

    });
    //         console.log("Rendering Comments:" + commentListGroupItems);

    if (commentListGroupItems.length !== 0) {

        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ListGroup>
                    {commentListGroupItems}
                </ListGroup>
            </div>
        );

    } else {
        return (
            <div></div>
        );
    }

}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb className='bg-light'>
                        <BreadcrumbItem> <Link to='/home'>Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem> <Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{ props.dish.name }</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>

                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <RenderComments comments={props.comments} />
                </div>
            </div>

        )
    } else {
        return (
            <div></div>
        )
    }
}



export default DishDetail;