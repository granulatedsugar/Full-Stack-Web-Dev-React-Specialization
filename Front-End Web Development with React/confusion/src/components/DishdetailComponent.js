import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderComment(dish) {
        if (dish !=  null) {
            let dateConfig = { year: "numeric", month: "short", day: "numeric"};
            return dish.comments.map( comment => (
                <ul key={comment.id} className="list-unstyled">
                    <li>{comment.comment}</li>
                    <li>-- {comment.author}, {new Date(comment.date).toLocaleDateString("en-US", dateConfig)}</li>
                </ul>
            ));
        } else return <div />;
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        } else return <div/>;
    }

    render() {

    const {dish} = this.props;
        
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <div>{this.renderDish(dish)}</div>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{this.renderComment(dish)}</div>
                </div>
            </div>
        );
    }
}

export default DishDetail;
