import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
class AddItem extends React.Component{
 constructor(props){
     super(props)
     this.state={
         plan:{
             "standard":{
                 "price":649,
                 "users":2,
                 "perUser":325
             },
             "premium":{
                 "price":799,
                 "users":4,
                 "perUser":200                 
             }
         },
         sent: false
             
     }
     this.getData=this.getData.bind(this)
     this.unset=this.unset.bind(this)
 }
 getData(e){
    var id=e.target.id;
    if(id=="standard"){
      console.log(this.state.plan.standard)
      this.setState({sent:true})
      this.props.putData(this.props.uid,this.state.plan.standard.users,this.state.plan.standard.price,this.state.plan.standard.perUser)
    }else{
        console.log(this.state.plan.premium)
        this.props.putData(this.props.uid,this.state.plan.premium.users,this.state.plan.premium.price,this.state.plan.premium.perUser)
        this.setState({sent:true})
    }
 }

 async unset(e){
    await this.setState({sent:false})
    console.log(this.state.sent);
 }
 render(){
 return(<div className="d-flex align-items-center justify-content-center" style={{width:"100%"}}>
       {!(this.state.sent)?<div style={{width:"75%"}}>
       <h6 className="text-light d-flex justify-content-center mb-4" style={{width:"100%"}}>SELECT ACCOUNT TYPE</h6>
       <div className="card mb-4" id="standard" style={{width:"100%"}} value="premium" onClick={this.getData}>
           <div className="card-header text-light" id="standard" style={{background:"rgb(233,0,0)"}}>STANDARD</div>
           <div className="card-body" id="standard">
               <div className="card-title" id="standard">Rs. 649/mo @ 2 users</div>
           </div>
       </div>
       <div className="card" style={{width:"100%"}} value="standard" onClick={this.getData}>
           <div className="card-header text-light" id="premium" style={{background:"rgb(233,0,0)"}}>PREMIUM</div>
           <div className="card-body" id="premium">
               <div className="card-title" id="premium">Rs. 799/mo @ 4 users</div>
           </div>
       </div>
       </div>:<div>
           <FaCheckCircle className="text-success d-flex justify-content-center" style={{width:"100%",height:"40%"}}/>
           <h5 className="d-flex justify-content-center text-success" style={{width:"100%"}}>Succesfully Uploaded!</h5>
           <div className="d-flex justify-content-center" style={{width:"100%"}}>
           <button className="btn btn-outline-primary mt-2" onClick={this.unset}>Create New</button>
           </div>
           </div>}
      </div>);
 }
}
export default AddItem ;