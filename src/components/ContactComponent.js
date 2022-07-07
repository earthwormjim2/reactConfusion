import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Form, FormGroup, Label, Input, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";



const WrappedInput = React.forwardRef((props, ref) => (
    <Input innerRef={ref} {...props} />
));

function Contact() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    //   console.log("First Name: " + watch("firstname"));
    //   console.log("Last Name: " + watch("lastname")); 
    //   console.log("Telephone Number: " + watch("telnum")); 
    //   console.log("Email: " + watch("email")); 
    //   console.log("Contact Type: " + watch("contactType"));
    //   console.log("Agreed: " + watch("agree"));




    return (
        <div className="container">
            <div className='row'>
                <Breadcrumb className='bg-light'>
                    <BreadcrumbItem> <Link to='/home'>Home</Link> </BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us </BreadcrumbItem>
                </Breadcrumb>
                <div className='col-12'>
                    <h3>Contact Us</h3>
                    <hr />
                </div>
            </div>

            <div className="row row-content">
                <div className="col-12">
                    <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                    <h5>Our Address</h5>
                    <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                    </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info" href="mailto:confusion@food.net"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    <h3>Send us Your Feedback</h3>
                </div>
                <div className='col-12 col-md-9'>
                    <Form onSubmit={handleSubmit((data) => {
                        console.log(data)
                    })}>
                        <FormGroup row>
                            <Label htmlFor="firstname" md={2}>First Name</Label>
                            <Col md={10}>
                                <WrappedInput type="text" placeholder='First Name' id="firstname"
                                    {...register("firstname", {
                                        required: "This field is required",
                                        minLength: {
                                            value: 3,
                                            message: "Please enter a first name with 3 or more characters."
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Please enter a first name with 10 or fewer characters"
                                        }
                                    })} />
                                <ErrorMessage className="badge rounded-pill bg-warning text-dark" errors={errors} name="firstname" as="span" />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="lastname" md={2}>Last Name</Label>
                            <Col md={10}>
                                <WrappedInput type="text" id="lastname" name="lastname" placeholder='Last Name'
                                    {...register("lastname", {
                                        required: "This field is required",
                                        minLength: {
                                            value: 3,
                                            message: "Please enter a last name with 3 or more characters."
                                        },
                                        maxLength: {
                                            value: 10,
                                            message: "Please enter a last name with 10 or fewer characters"
                                        }
                                    })} />
                                <ErrorMessage className="badge rounded-pill bg-warning text-dark" errors={errors} name="lastname" as="span" />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Contact Telephone</Label>
                            <Col md={10}>
                                <WrappedInput type="tel" id="telnum" name="telnum" placeholder='Tel. Number'
                                    {...register("telnum", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "Please enter only the digits of the number."
                                        }
                                    })} />
                                <ErrorMessage className="badge rounded-pill bg-warning text-dark" errors={errors} name="telnum" as="span" />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="email" md={2}>Email</Label>
                            <Col md={10}>
                                <WrappedInput type="email" id="email" name="email" placeholder='Email'
                                    {...register("email", {
                                        required: "This field is required",
                                        pattern: {
                                            value: /\w{1,}@[a-zA-Z]{2,}/g,
                                            message: "Please enter a valid email address."
                                        }
                                    })} />
                                <ErrorMessage className="badge rounded-pill bg-warning text-dark" errors={errors} name="email" as="span" />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 6, offset: 2 }}>
                                <FormGroup check>
                                    <Label check>
                                        {' '} <strong>May we contact you?</strong>
                                    </Label>
                                    <WrappedInput type='checkbox' name='agree'
                                        {...register("agree")} />

                                </FormGroup>
                            </Col>
                            <Col md={{ size: 3, offset: 1 }}>
                                <WrappedInput type="select" name='contactType'
                                    {...register("contactType")}>
                                    <option>Tel.</option>
                                    <option>Email</option>
                                </WrappedInput>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label htmlFor="message" md={2}>Your Feedback</Label>
                            <Col md={10}>
                                <WrappedInput type="textarea" id="message" name="message" rows="12"
                                    {...register("message")} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col md={{ size: 10, offset: 2 }}>
                                <Button type='submit' color="primary">Send Feedback</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        </div>
    );


}

export default Contact;