import React, { Component} from 'react';
import { Badge, Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Col, Modal, ModalBody, ModalHeader, Row, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


// Validation
const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);


class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({ 
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
    }

    render() {

        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil" /> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}> 
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={this.handleSubmit}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={{ size:12 }}>
                                        <Control.select model=".rating" name="rating" className="form-control">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={{ size:12 }}>
                                        <Control.text model=".author" id="author" 
                                            className="form-control"
                                            validators={{ 
                                                required, minLength:minLength(2), maxLength:maxLength(15)
                                            }} />
                                        <Errors 
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: 'Required ',
                                                minLength: 'Must be greater than 2 characters',
                                                maxLength: 'Must be 15 characters or less'
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={{ size:12 }}>
                                        <Control.textarea model=".comment" id="comment"
                                            className="form-control"
                                            rows='6' />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={{size: 12}}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                </Modal>
            </div>
        )
    }
}

//Render selected dish image/name/description
function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}


// Render comment
function RenderComment({comment}) {

    let dateConfig = { year: "numeric", month: "short", day: "numeric"};

    if (comment !=  null) {
        let list = comment.map((comment)=>{
            return (
            <ul key={comment.id} className="list-unstyled">
                <li>{comment.comment}</li>
                <li>-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", dateConfig)}</li>
            </ul>
            )
        })
        return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {list}
                </ul>
                <CommentForm  />
            </div>
        )
    } else return <div/>;
}


const DishDetail = (props) => {

    if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComment comment={props.comments} />
                </div>
            </div>
        );
    else
            return(
            <div></div>
        );
}


export default DishDetail;

