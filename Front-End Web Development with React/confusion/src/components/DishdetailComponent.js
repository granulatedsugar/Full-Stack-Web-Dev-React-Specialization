import React from 'react';
import { Badge, Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';


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

