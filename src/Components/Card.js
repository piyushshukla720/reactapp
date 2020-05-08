import React from 'react';
import '../App.css'

class Card extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            widthv:this.props.widthValue,
            width: "0%",
            users: this.props.users
        }
        this.clicked=this.clicked.bind(this)
    }
    async clicked(){
        if(this.state.users>0){
        var added=(this.state.widthv+(100/this.props.totalUsers))
        await this.setState({widthv: added});
        var str=await this.state.widthv.toString()+"%"
        await this.setState({width: str});
        var newuser=this.state.users-1;
        await this.setState({users: newuser })
        await fetch(`http://localhost:9000/add?width=${this.state.width}&id=${this.props.id}&users=${this.state.users}&widthValue=${this.state.widthv}`)
        .then(
            res => res.text()
        ).then(
            result => {
                console.log(result)
                this.props.getData()
            }
        )
        }else{
              alert('Bas Kar')
       }
    }
    render(){
        return (
         <div className="item-card mb-2 shadow" style={{backgroundColor:this.props.color,borderRadius:this.props.border}}>
             <div className="p-2">
             <div className="row text-light">
                <div className="col-1">

                </div>
                <div className="col-7 heading">
                    <div>
                    <span className="d-flex acc" style={{fontSize:this.props.fontsizeS}}>Netflix Account</span>
                    <span className="d-flex vertical-align-center mt-1" style={{fontSize:this.props.fontsizeL}}>₹{this.props.amount}</span>
                    </div>
                </div>
                <div className="col-3 d-flex justify-content-end">
                {!this.props.hide && <div>
                <span className="d-flex justify-content-end" style={{fontSize:this.props.fontsizeS}}>Join</span>
                <div className="mt-1 badge bg-success d-flex align-items-center justify-content-center" onClick={this.clicked}>₹{this.props.join}</div>
                </div>}
                </div>
                <div className="col-2">

                </div>
             </div>
             <div className="row p-2 no-gutters">
             <div className="col-1">

             </div>
             <div className="col-10">
             <div className="progress" style={{height:this.props.progressBarHeight}}>
                <div className="progress-bar bg-warning" role="progressbar" style={{width:this.props.width}}></div>
                </div>
                </div>
             </div>
             {(!this.props.hide)?<div className="row">
                 <div className="col-1" />
                 <div className="col-5 text-warning" style={{fontSize:this.props.fontsizeS}}>
                   {this.state.users} users left
                 </div>
                 <div className="col-5 d-flex justify-content-end text-light" style={{fontSize:this.props.fontsizeS}}>
                    {this.props.totalUsers} users
                 </div>
                 <div className="col-1" />
             </div>:<div className="d-flex justify-content-center text-warning" style={{fontSize:this.props.fontsizeS}}>{this.props.totalUsers-this.state.users}/{this.props.totalUsers}</div>}
             </div>
        </div>
        );
    }
}

class CardList extends React.Component{
constructor(props){
    super(props)
    this.list=this.list.bind(this)
}
list(props){
    var arr=props.data
    var color=props.color
    console.log(color)
    return arr.map(item=>{
        var amounts=item.amount;
        var joins=item.joins;
        var users=item.users;
        var key=item.id;
        var width=item.width;
        var totalUsers=item.totalUsers;
        var widthValue=item.widthValue;
        return <Card getData={props.getData} id={key} width={width} key={key} amount={amounts} join={joins} users={users} color={color} fontsizeL={props.fontsizeL} fontsizeS={props.fontsizeS} border={props.border} hide={props.hide} totalUsers={totalUsers} widthValue={widthValue} progressBarHeight={props.progressBarHeight}/>
    })
}
render(){
  return(
      <this.list getData={this.props.getData} data={this.props.data} color={this.props.color} fontsizeL={this.props.fontsizeL} fontsizeS={this.props.fontsizeS} border={this.props.border} hide={this.props.hide} progressBarHeight={this.props.progressBarHeight}/>
      );
}
}
export default CardList;

