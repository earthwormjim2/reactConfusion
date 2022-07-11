import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, ListGroup, ListGroupItem,
    ListGroupItemHeading, ListGroupItemText, Breadcrumb, BreadcrumbItem,
    Form, ModalHeader, Button, Modal, ModalBody, Input, FormGroup, Label
} from 'reactstrap';
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom'

const WrappedInput = React.forwardRef((props, ref) => ( // Need to wrap standard class to expose ref to React-Hook-Forms
    <Input innerRef={ref} {...props} />
));

function CommentForm(props) {

    const [formData, setFormData] = useState({ //Using React Hooks from v16+ to maintain state with React Hooks vs. classes
        rating: "",
        author: "",
        comment: "",
        isModalOpen: false
    })

    const { register, handleSubmit, formState: { errors } } = useForm(); // React Hook form provides these for validation, error display


    function toggleModal() {

        setFormData({ ...formData, isModalOpen: !formData.isModalOpen });
    }

    return (
        <React.Fragment>
            <Button outline onClick={toggleModal}>
                <span className="fa fa-pencil fa-lg "> Submit Comment</span>
            </Button>
            <Modal isOpen={formData.isModalOpen} toggle={toggleModal}>
                <ModalHeader>Submit Comment</ModalHeader>
                <ModalBody >
                    <Form onSubmit={handleSubmit((values) => {
                        toggleModal();
                        props.addComment(props.dishId, values.rating, values.author, values.comment);
                    })} onChange={(e) => { //setting change listener for the whole form, and updating based upon event
                        // console.log(e.target.id + ":" + e.target.value);
                        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
                        setFormData({ ...formData, [e.target.id]: value });

                    }}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <WrappedInput type="select" id="rating" name='rating'
                                value={formData.rating}
                                {...register("rating")}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </WrappedInput>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="commenter">Your Name</Label>
                            <WrappedInput type="text" id="author" name="author" placeholder='Your Name'
                                value={formData.author}
                                {...register("author", {
                                    required: "This field is required",
                                    minLength: {
                                        value: 3,
                                        message: "Please enter a name with 3 or more characters."
                                    },
                                    maxLength: {
                                        value: 15,
                                        message: "Please enter a name with 15 or fewer characters"
                                    }
                                })} />
                            <ErrorMessage className="text-danger" errors={errors} name="author" as="span" />

                        </FormGroup>
                        <FormGroup >
                            <Label htmlFor="comment">Comment</Label>
                            <WrappedInput type="textarea" id="comment" name="comment" rows="6"
                                value={formData.comment}
                                {...register("comment")} />
                        </FormGroup>
                        <Button type="submit" value="submit" color="primary" className="bg-primary">Submit</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </React.Fragment>

    );
}

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

function RenderComments({ comments, addComment, dishId }) {


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
            <div>
                <h4>Comments</h4>
                <ListGroup>
                    {commentListGroupItems}
                </ListGroup>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        );

    } else {
        return (
            <div></div>
        );
    }

}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
          </div>  
        );
    }
    else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4> {props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return (
            <div className="container">
                <div className='row'>
                    <Breadcrumb className='bg-light'>
                        <BreadcrumbItem> <Link to='/home'>Home</Link> </BreadcrumbItem>
                        <BreadcrumbItem> <Link to='/menu'>Menu</Link> </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                        <hr />
                    </div>
                </div>

                <div className='row'>
                    <div className="col-12 col-md-4 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col col-md-7 m-1">
                        <RenderComments comments={props.comments} addComment={props.addComment} dishId={props.dish.id} />
                    </div>
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