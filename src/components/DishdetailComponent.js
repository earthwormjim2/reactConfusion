import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {

        function renderDish(dish) {
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle><h1>{dish.name}</h1></CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        }

        function renderComments(comments) {


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
            console.log(commentListGroupItems);

            if (commentListGroupItems.length !== 0 ) {

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

        if (this.props.selectedDish != null) {
            return (
                <div className='row'>
                    <div className="col-12 col-md-5 m-1">
                        {renderDish(this.props.selectedDish)}
                    </div>
                    {renderComments(this.props.selectedDish.comments)}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }
}

export default Dishdetail;