import React, { useState, useEffect } from "react"
import { useUser } from '../components/backend/UserProvider'
import { useParams, Link } from "react-router-dom";
import Thread from '../components/frontend/Thread'
import MemberList from "../components/frontend/MemberList";
import GetApplicants from "../components/backend/GetApplications"
import { GetDetails } from '../components/backend/GetProject'

import '../styles/Project.css'

const Project = (props) => {
    const pid = useParams().pid
    const currentUser = useUser() || { uid: null }
    const details = GetDetails(pid)
    
    console.log('page re rendered')
    if (details) {
        // TODO: get the rest of the details (collaborator list and thread)
        // if(currentUser.uid === details.owner){
        return (
            <div className="Project">
                <h1>{details.title}</h1>
                <div className="text">
                    <p>{details.description}</p>
                </div>
                {(details.status) ? <h3>Status: Open</h3> : <h3>Status: Closed</h3>}
                <div className="margin">
                    <Link to={{ pathname: "/edit/project/" + pid, project: details }}>Edit Project</Link>
                </div>
                <div className="applications">
                    <h5>Applications</h5>
                    <Thread pid={pid} />
                    <MemberList pid={pid} />
                    {/* <ApplicantList pid={pid} /> : <p>Loading Applicants...</p> */}
                </div>
            </div>

        )

    } else {
        return (
            <h1>Loading...</h1>
        )
    }


}
export default Project