import React from 'react'
import axios from '../config/axios';
import { CardColumns, Card, CardImg, CardText, CardBody,
    CardTitle,  Button } from 'reactstrap'
import {Redirect} from 'react-router-dom'

export default class Product extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            products: [], 
            goBack: false
        }
    }
    componentDidMount(){
        const id = this.props.match.params.id
        axios.get(`/categories/${id}`).then(response => {
            console.log(response.data.products)

            this.setState({
                products: response.data.products
            })
        }).catch(err => {
            console.log(err)
        })
    }
    goback(){
        this.setState({
            goBack: true
        })
    }

    render(){
        if(this.state.goBack){
            return <Redirect to="/categories" />
        }
        return(
            <div>
                <h2 className="demo" style={{fontFamily: "Apple Chancery, cursive"}}>Products list - {this.state.products.length}</h2>
               
                    {this.state.products.map(item =>{
                    return  <div style={{padding: "10px"}}>
      <CardColumns>
          <Card>
        <CardImg top width="100%"   src={'/images/item.jpg'} alt="Card image cap" />
        <CardBody>
          <CardTitle><b style={{textTransform: "uppercase", fontFamily: "Comic Sans MS"}}>{item.title}</b></CardTitle>
          
        </CardBody>
      </Card>
     </CardColumns>
                    </div>
                })}
                
                <Button onClick={this.goback.bind(this)} color="info">BACK</Button>
                
            </div>
        )
    }
}