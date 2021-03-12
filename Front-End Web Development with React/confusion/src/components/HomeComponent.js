import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';


//similar properties in the object for all three dish, promotion, leader
//but leader have designation and abbr
//function component will be used here only
//extract item from props immediately available in {}
function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return(
            <Loading />
        );
    }
    else if (errMess) {
        return(
            <h4>{errMess}</h4>
        );
    }
    else
    // Card
        return(
            <FadeTransform in 
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>: null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
}


//the home receives the props.dish, props.promotion, props.leader will become available here
function Home(props) {
    // Featured products
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading} 
                    errMess={props.dishErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion} 
                    isLoading={props.promoLoading} 
                    errMess={props.promoErrMess} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} 
                    isLoading={props.leadersLoading} 
                    errMess={props.leadersErrMess}  />
                </div>
            </div>
        </div>
    );
}

export default Home;