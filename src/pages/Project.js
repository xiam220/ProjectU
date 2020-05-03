import React from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, Link } from "react-router-dom";
import GetProject from './../components/backend/GetProject'
import Thread from '../components/frontend/Thread'
import MemberList from "../components/frontend/MemberList";
import '../styles/Project.css'
import ApplicantList from "../components/frontend/ApplicantList";
import GetApplicants from "../components/backend/GetApplications"
const Project = (props) => {
    const pid = useParams().pid
    const currentUser = useUser() || {uid: null}

    // Backend call
    //let project = GetProject(pid);
    let project =  GetProject(pid) // (props.location.state && props.location.state.id == pid) ? (props.location.state) : it was bugging out
    let details = project.details
    let apps = project.apps;
    let members = project.members;
    let thread = project.thread;
    
    console.log(apps)
    if(details){
        // TODO: get the rest of the details (collaborator list and thread)
        // if(currentUser.uid === details.owner){
            return(
                <div className="Project">
                    <h1>{details.title}</h1>
                    <div className="text">
                    <p>{details.description}</p>
                    </div>
                    {(details.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
                    <div className="margin">
                    <Link to={{pathname: "/edit/project/" + pid, project:details}}>Edit Project</Link>
                    </div>
                    <Thread thread={project.thread}/>
                    {(members) ? <MemberList members={members} />: <p>Loading Members...</p>} 
                    {(apps) ? <ApplicantList apps={apps} proj_id={pid} owner={details.owner} /> : <p>Loading Applicants...</p>}

                </div>

            )
        // }else{
        //     return(
        //         <div className="Project">
        //             <h1>{details.title}</h1>
        //             <div className="text">
        //             <p>{details.description}</p>
        //             </div>
        //             {(details.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
        //             <h4>posted by <Link to={`/users/${details.owner}`}>{details.createdBy}</Link></h4>
        //         </div>
        //     )
        // }
        
    }else{
        return (
            <h1>Loading...</h1>
        )
    }
    
    
}
export default Project