import React from 'react'
//import {Button} from 'reactstrap'
import {Redirect} from 'react-router-dom'
import axios from '../../config/axios'


export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email: '',
            password:'',
            isLogged: false
        }
        this.handleEvent = this.handleEvent.bind(this)
    }
    handleEvent(e){
        e.persist()
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault()
        const formData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/users/login', formData).then(response => {
            const {token} = response.data
            localStorage.setItem('token', token)
            this.setState(() => ({
                email:'',
                password:'',
                isLogged: true
               }))
            }).catch(err => {
                console.log(err)
        })
    }
   
    
    render(){
        if(this.state.isLogged){
            return <Redirect to="/categories" />
        }
        return (
            <div ><br/>
            <div id="login">
                <h2 style={{fontFamily: "Apple Chancery, cursive"}}>LOGIN</h2>
                <form name="form-login" onSubmit={this.handleSubmit.bind(this)}>
                <label > 
                        <input  type="text" id="user" placeholder="Username" value={this.state.email} onChange={this.handleEvent} name="email"/>
                    </label> <br/>
                    <label> 
                        <input type="password" id="pass" placeholder="Password" value={this.state.password} onChange={this.handleEvent} name="password" />
                    </label> <br/>
                <input type="submit" style={{color: "black"}} />
                </form>
                </div>
                </div>
            
        )
    }
}