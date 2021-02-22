import React from 'react';
import { Badge, Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';


//Render selected dish image/name/description
function RenderDish({dish}) {
    if (dish != null) {
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
    } else return <div/>;
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
            </div>
        )
    } else return <div/>;
}


const DishDetail = (props) => {

    const {dish} = props;

    return dish?(
        <div className="container">
            <div className="row">
                <RenderDish dish={dish} />
                <RenderComment comment={dish.comments} />
            </div>
        </div>
    ):(
        <div></div>
    )
}


export default DishDetail;

