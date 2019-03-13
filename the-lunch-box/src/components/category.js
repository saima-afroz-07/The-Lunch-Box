import React from 'react'
import axios from '../config/axios'
import { CardColumns, Card, CardImg, CardText, CardBody,
    CardTitle,  Button } from 'reactstrap'
import {Link} from 'react-router-dom'
//import Product from './product';

export default class Category extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            categories : []
        }
    }
    componentDidMount(){
        axios.get('/categories').then(response => {
            console.log(response)
            this.setState({
                categories: response.data
            })
        }).catch(err => {
            console.log(err)
        })
    }
    onclickHandler(e){
      //e.preventDefault()
      var catg = e.target
      console.log(catg)

    }

    render(){
        return (
            <div >
                <div><center><h2 className="demo" color="white" style={{fontFamily: "Apple Chancery, cursive"}}>Listing categories - {this.state.categories.length}</h2>
                </center></div>

                    {this.state.categories.map((category) => {
                    return <div style={{padding: "10px"}}>
        
            <CardColumns>
          <Card>
        <CardImg top width="100%"  src={'/images/product.jpg'} alt="Card image cap" />
        <CardBody>
          <CardTitle><b style={{textTransform: "uppercase", fontFamily: "Comic Sans MS"}}>{category.name}</b></CardTitle>
          
          <CardText style={{fontFamily: "Comic Sans MS"}}>Here is the description of the cuisine which you have wished to eat today...</CardText>
          <Link to={`/categories/${category._id}`}><Button color="warning">ORDER NOW</Button></Link>
        </CardBody>
      </Card>
     </CardColumns>
                      
                          
      
    </div>
      
})} 
   
                    

</div>
)
}
}
