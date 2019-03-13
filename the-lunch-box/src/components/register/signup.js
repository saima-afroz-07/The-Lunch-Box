import React from 'react'
import axios from '../../config/axios'

export default class SignUp extends  React.Component {
    constructor(props){
        super(props)
        this.state ={
            username:'',
            email:'',
            password:'',
            mobile:''
        }
        this.eventHandler = this.eventHandler.bind(this)
        this.submitHandle = this.submitHandle.bind(this)
    }
    
    eventHandler(event){
      this.setState({
          [event.target.name]: event.target.value
      })
    }

    submitHandle(e){
        e.preventDefault()
        const formData = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile
        }
        axios.post('/users/register', formData).then( response => {
            console.log(response.data)
            this.setState(() => ({
                username: '',
                email: '',
                password: '',
                mobile:''
            }))
        }).catch(err => {
            console.log(err)
        })
        
    }

    

    render(){
        return (
            <div id="login">
                <h3  style={{fontFamily: "Apple Chancery, cursive"}} >CREATE AN ACCOUNT</h3>
                <form name="form-login" onSubmit={this.submitHandle}> <br/>
                    <label> 
                    <input type="text" placeholder="Username" name="username" value={this.state.username} onChange={this.eventHandler} />
                </label> <br/>
                <label> 
                <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.eventHandler} />
                </label> <br/>
                <label> 
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.eventHandler} />
                </label> <br/>
                <label> 
                    <input type="text" placeholder="Mobile" name="mobile" value={this.state.mobile} onChange={this.eventHandler} />
                </label> <br/>
                <input type="submit" style={{color: "black"}}/>
                
                </form>

            </div>
        )
    }
}