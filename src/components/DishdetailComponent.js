import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,Button,Modal,ModalHeader,ModalBody,Row,Col,Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm,Errors,Control } from "react-redux-form";
import { Loading } from './LoadingComponent';
import '../App.css';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

import { baseUrl } from '../shared/baseUrl';
const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
class CommentForm extends Component{
    constructor(props) {
        super(props);
        this.state={
            isCommentModalOpen:false
        };
        this.toggleModalComment = this.toggleModalComment.bind(this);
        this.handleSubmitComment=this.handleSubmitComment.bind(this);
    }
    toggleModalComment(){
        this.setState({
            isCommentModalOpen:!this.state.isCommentModalOpen
        });
    }
    handleSubmitComment(values){
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            
            <div>
                <Button type="button" onClick={this.toggleModalComment} ><span className="fa fa-pencil fa-lg"> Submit Comment</span></Button>
                <Modal isCommentModalOpen = {!this.state.isCommentModelOpen} toggle={this.toggleModalComment}>
                    <ModalHeader toggle={this.toggleModalComment}>
                        Add your Commemt
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>
                                    Rating
                                </Label>
                                <Col md="12" >
                                    <Control.select model=".rating" className="form-control" id="rating" name="rating" validators={{
                                            required
                                        }}>
                                        <option>1 </option>
                                        <option>2 </option>
                                        <option>3 </option>
                                        <option>4 </option>
                                        <option>5 </option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required!!',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md="12">
                                    Your Name
                                </Label>
                                <Col >
                                    <Control.text model=".author" className="form-control" id="author" name="author"
                                    validators={{
                                         required,minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            
                                           required:'Required!!',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>
                                    Comment
                                </Label>
                                <Col >
                                    <Control.textarea model="comment" className="form-control" id="comment" name="comment" rows="6"/>
                                    <Errors
                                        className="text-danger"
                                        model=".comment"
                                        show="touched"
                                        messages={{
                                            required: 'Required!!',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                    </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
            
        );
    }
}
    function RenderDish({dish}) {
            
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <FadeTransform
                            in
                            transformProps={{
                                exitTransform: 'scale(0.5) translateY(-50%)'
                            }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText> {dish.description} </CardText>
                        </CardBody>
                    </Card>
                    </FadeTransform>
                </div>   
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }

    function RenderComments({comments , postComment, dishId}){
        if (comments == null) {
            return (<div></div>)
        }
        <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
        </Stagger>

        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comments}
                </ul>
                <CommentForm dishId={dishId} postComment={postComment} />

            </div>
        );
    }


    const DishDetail = (props) =>{
        const dish = props.dish
        if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if (props.dish != null) 
        {

        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
            <div className='row'>
                <RenderDish dish = {props.dish}/>
                <RenderComments comments = {props.comments} postComment={props.postComment} dishId={props.dish.id}/>
            </div>
            </div>
        );
        }
    }

export default DishDetail;
