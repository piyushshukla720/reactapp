import React from 'react'
import CardList from './Card'
import AddItem from './AddItem'
import { FaPlusCircle,FaSmile,FaUserCircle,FaInbox,FaAd } from 'react-icons/fa'
class CreateAd extends React.Component{
  constructor(props){
    super(props)
    this.state={
      add:false,
      clicked: 'add',
      colour: ["rgb(0,233,233)","rgb(0,233,233)","rgb(0,233,233)","rgb(0,233,233)"],
    }
    this.profile=this.profile.bind(this);
    this.inbox=this.inbox.bind(this);
    this.add=this.add.bind(this);
    this.myAds=this.myAds.bind(this);
    this.addItem=this.addItem.bind(this);
    this.switchScreen=this.switchScreen.bind(this)
  }
  addItem(e){
    this.setState({add:true})
  }
  profile(e){
    this.setState({colour:["white","rgb(0,233,233)","rgb(0,233,233)","rgb(0,233,233)"]})
    this.setState({clicked:'profile'})
  }
  inbox(e){
    this.setState({colour:["rgb(0,233,233)","white","rgb(0,233,233)","rgb(0,233,233)"]})
    this.setState({clicked:'inbox'})
  }
  add(e){
    this.setState({colour:["rgb(0,233,233)","rgb(0,233,233)","white","rgb(0,233,233)"]})
    this.setState({clicked:'add'})
  }
  myAds(e){
    this.setState({colour:["rgb(0,233,233)","rgb(0,233,233)","rgb(0,233,233)","white"]})
    this.setState({clicked:'ad'})
      }
  switchScreen(){
    switch(this.state.clicked) {
      case 'profile':
       return 'profile';
      case 'inbox':
       return 'inbox';
      case 'add':
       return <AddItem putData={this.props.putData} uid={this.props.uid}/>;
      case 'ad':
        return <MyAds pdata={this.props.pdata} uid={this.props.uid} getPData={this.props.getPData}/>;
      default:
        return 'add';
      }
  }
  render(){
  return(
    <div style={{width:"100%",height:"100%"}}>
      <div className="row shadow" style={{width:"100%",zIndex:1,heigth:"20%"}}>
        <div className="col-3 d-flex justify-content-center align-items-center" id="profile" onClick={this.profile}>
          <FaUserCircle style={{color:this.state.colour[0],height:"20%",width:"20%",cursor:"pointer",minHeight:"20px",minWidth:"20px"}}/></div>
        <div className="col-3 d-flex justify-content-center align-items-center" id="inbox" onClick={this.inbox}><FaInbox style={{color:this.state.colour[1],height:"20%",width:"20%",cursor:"pointer",minHeight:"20px",minWidth:"20px"}}/></div>
        <div className="col-3 d-flex justify-content-center align-items-center" id="add" onClick={this.add}><FaPlusCircle style={{color:this.state.colour[2],height:"20%",width:"20%",cursor:"pointer",minHeight:"20px",minWidth:"20px"}}/></div>
        <div className="col-3 d-flex justify-content-center align-items-center" id="myAds" onClick={this.myAds}><FaAd style={{color:this.state.colour[3],height:"20%",width:"20%",cursor:"pointer",minHeight:"20px",minWidth:"20px"}}/></div>
      </div>
      <div className="row d-flex justify-content-center" style={{width:"100%",zIndex:2,height:"80%"}}>
      {this.switchScreen()}
      </div>
    </div> 
  )
  }
}


class MyAds extends React.Component{
  constructor(props){
     super(props)
  }
  componentDidMount(){
    this.props.getPData(this.props.uid)
    console.log(this.props.pdata)
  }
  render(){
  return(
      <div className="col-12" id="demo" style={{width:"80%",height:"100%",overflowY:"auto"}}>
          <h3 className="text-light d-flex justify-content-center" style={{width:"100%"}}>MY ADS</h3>
          <CardList data={this.props.pdata} color="rgb(61,64,89)" hide={true} fontsizeL="16px" fontsizeS="10px" progressBarHeight="5px"/>
      </div>
  )
  }
}
class DashBoard extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
        <div className="d-flex align-items-center justify-content-center" style={{height:"100vh",width:"100vw"}}>
        <div className="shadow row" style={{backgroundColor:"rgb(71,64,95,0.9)",height:"100vh",width:"100vw"}}>
        <CreateAd putData={this.props.putData} uid={this.props.uid} getPData={this.props.getPData} pdata={this.props.pdata}/>
        </div>
        </div>
        )
    }
}

export default DashBoard;
