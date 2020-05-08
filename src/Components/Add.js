import React from 'react'
import Header from './Header'
import DashBoard from './DashBoard'
import '../App.css'

class Login extends React.Component{
  constructor(props){
      super(props)
      this.state={
          email:null,
          pass:null
      }
      this.updateMail=this.updateMail.bind(this);
      this.updatePass=this.updatePass.bind(this);
      this.signIn=this.signIn.bind(this)
  }
  updateMail(e){
      this.setState({email:e.target.value})
  }
  updatePass(e){
    this.setState({pass:e.target.value})
}

  async signIn(e){
     await this.props.signIn(this.state.email,this.state.pass)
     console.log(this.props.uid)
     if(this.props.uid!=null){
         this.props.sucessup();
     }
  }
  render(){
 return(
 <div className="form-group add-form" style={{width:"80%"}}>
            <span className="brand d-flex text-light shadow">N</span>
            {this.props.error && <textarea className="form-control text-light" style={{marginBottom:"2vh",backgroundColor:"rgb(233,40,0,0.7)",borderColor:"white"}} value={this.props.error} disabled={true}></textarea>}
            <input placeholder="Username" type="text" className="form-control text-light" style={{marginBottom:"2vh",backgroundColor:"rgb(255,255,255,0)",borderColor:"white"}} onChange={this.updateMail}/>
            <input placeholder="Password" type="password" className="form-control text-light" style={{marginBottom:"2vh",backgroundColor:"rgb(255,255,255,0)",borderColor:"white",borderSize:"2px"}} onChange={this.updatePass}/>
            <div className="d-flex justify-content-center">
            <button className="btn btn-outline-danger" onClick={this.signIn}>SignIn</button>
            <button className="btn btn-outline-success ml-2" onClick={this.props.initSignUp}>SignUp</button>
            </div>
            </div>
);
}
}

class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email:null,
            pass:null
        }
        this.updateMail=this.updateMail.bind(this);
        this.updatePass=this.updatePass.bind(this);
        this.signIn=this.signIn.bind(this)
    }
    updateMail(e){
        this.setState({email:e.target.value})
    }
    updatePass(e){
      this.setState({pass:e.target.value})
  }
  
    async signIn(e){
       await this.props.signIn(this.state.email,this.state.pass,true)
       console.log(this.props.uid)
       if(this.props.uid!=null){
           this.props.sucessup();
       }
    }        
    
    render(){
    return(
    <div className="form-group add-form" style={{width:"80%"}}>
               <span className="brand d-flex text-light shadow">N</span>
               {this.props.error && <textarea className="form-control text-light" style={{marginBottom:"2vh",backgroundColor:"rgb(233,40,0,0.7)",borderColor:"white"}} value={this.props.error} disabled={true}></textarea>}
               <input placeholder="Email" className="form-control text-light" onChange={this.updateMail} style={{marginBottom:"2vh",backgroundColor:"rgb(255,255,255,0)",borderColor:"white"}}/>
               <input placeholder="Password" className="form-control text-light" onChange={this.updatePass} style={{marginBottom:"2vh",backgroundColor:"rgb(255,255,255,0)",borderColor:"white",borderSize:"2px"}}/>
               <input placeholder="Repeat Password" className="form-control text-light" style={{marginBottom:"2vh",backgroundColor:"rgb(255,255,255,0)",borderColor:"white",borderSize:"2px"}}/>
               <div className="d-flex justify-content-center">
               <button className="btn btn-outline-success ml-2" onClick={this.signIn}>SignUp</button>
               </div>
               </div>
   );
    }
   }

   function RegisterForm(props){
       return(
        <div className="container d-flex align-items-center Add-div " style={{height:"100vh",width:"100vw"}}>
        <div className="form shadow d-flex justify-content-center align-items-center" style={{backgroundColor:"rgb(71,64,95,0.9)"}}>
        {(!props.signup)?<Login initSignUp={props.initSignUp} signIn={props.signIn} uid={props.uid} error={props.error} sucessup={props.sucessup}/>:<SignUp sucessup={props.sucessup} signIn={props.signIn} uid={props.uid} error={props.error}/>}
        </div>
        </div>
       )
   }

class Add extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            amount:0,
            joins:0,
            users:0,
            signup:false,
            loggedIn:false
        }
        this.amountup=this.amountup.bind(this)
        this.sucessup=this.sucessup.bind(this)
        this.initSignUp=this.initSignUp.bind(this)
        this.dataup=this.dataup.bind(this)
    }
    async dataup(){
      var amount=await this.state.amount;
      var joins=await this.state.joins;
      var users=await this.state.users;
      this.props.putData(amount,joins,users)
    }

    async amountup(e){
        await this.setState({amount:e.target.value})
    }

    async sucessup(e){
        await this.setState({loggedIn:true})
    }

    async initSignUp(e){
        await this.setState({signup:true})
    }

    render(){
        return (
            <div style={{background:"url('stranger3.jpg') no-repeat",backgroundSize:"100vw 100vh",height:'100vh'}}>
            {(!this.state.loggedIn)?<RegisterForm initSignUp={this.initSignUp} signup={this.state.signup} sucessup={this.sucessup} signIn={this.props.signIn} uid={this.props.uid} error={this.props.error}/>:<DashBoard pdata={this.props.pdata} uid={this.props.uid} putData={this.props.putData} getPData={this.props.getPData}/>} 
            </div>
        )
    }
}
export default Add;
