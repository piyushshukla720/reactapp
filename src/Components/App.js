import React from 'react';
import '../App.css';
import '../fontawesome/css/all.css';
import Header from './Header';
import CardList from './Card';
import { navigate,Router } from '@reach/router';
import Add from './Add'
import { FaRupeeSign } from 'react-icons/fa'
import firebase from './firebaseconfig'

function Cardlist(props){
    return(
        <div className="deals-div"> 
        <Header />
        <div className="container" style={{marginTop:"66px"}}>
         <CardList getData={props.getData} data={props.data} color={props.color} fontsizeL={props.fontsizeL} fontsizeS={props.fontsizeS} border={props.border} progressBarHeight={props.progressBarHeight}/>
        </div>
        <div className="fixed-bottom d-flex justify-content-center">
            <div className="badge bg-warning d-flex align-items-center justify-content-center text-light" onClick={data} style={{height:"40px",fontSize:"16px",width:"100px"}}><FaRupeeSign /> SELL</div>
        </div>
        </div>
    );
}

function data(){
    navigate('register')
   }

class App extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            key:0,
            uid: null,
            error:null,
            pdata: []
        }
        this.getData=this.getData.bind(this)
        this.getPData=this.getPData.bind(this)
        this.signIn=this.signIn.bind(this)
        this.putData=this.putData.bind(this)
    }
    componentDidMount(){
        this.getData()
        firebase.auth().onAuthStateChanged(
            user => { this.setState({uid:user.uid})},
            error=>{
                console.log(error)
            }
        )
    }

    async signIn(email,pass,newUser=false){
        if(newUser){
            await firebase.auth().createUserWithEmailAndPassword(email,pass).then(
                userd => this.setState({uid:userd.user.uid})
            ).catch(err=>this.setState({error:err.message}))
        }else{
       await firebase.auth().signInWithEmailAndPassword(email,pass).then(
           userd => this.setState({uid:userd.user.uid})
       ).catch(err=>this.setState({error:err.message}))
        }
    }
    async getPData(uid){
        await fetch(`http://localhost:9000/update?uid=${uid}`)
            .then(res => res.json())
            .then(async(res) => {
               await this.setState({pdata: res.data})
              });
    }
    async getData() {
        await fetch("http://localhost:9000/")
            .then(res => res.json())
            .then(async(res) => {
               await this.setState({data: res.data})
               var x=this.state.key+1
               await this.setState({key:x})
              });
          }
          async putData(uid,users,amount,joins) {
            await fetch(`http://localhost:9000/insert?uid=${uid}&users=${users}&amount=${amount}&joins=${joins}`)
                .then(res => res.text())
                .then(result=>{
                    console.log(result);
                    this.getData();
                });
              }
   render(){
    return(
        <Router>
        <Cardlist path="/" getData={this.getData} key={this.state.key} data={this.state.data} color="rgb(71,64,95,0.9)" fontsizeL="24px" fontsizeS="12px" border="10px" progressBarHeight="10px"/>
        <Add path="/register" getPData={this.getPData} putData={this.putData} data={this.state.data} pdata={this.state.pdata} signIn={this.signIn} uid={this.state.uid} error={this.state.error}/>
        </Router>
       );
   }
}


export default App;
