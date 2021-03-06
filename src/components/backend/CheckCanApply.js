import { useState, useEffect } from 'react'
import {db} from '../../services/firebase'


async function CheckCanApply(uid, project_ref){
    
    if (uid) {
        //check if user already applied
        let app_ref_proj = db.collection('applications')    
        let matching_usr_app_promise = await app_ref_proj.where('user', '==', uid).where('project','==',project_ref).get()
        let matching_usr_app = await matching_usr_app_promise.docs.map(x => x.data().user)
    
        //check if user is member
        let m_ref_proj = db.collection('projects').doc(project_ref.id).collection('members');
        let matching_m = await m_ref_proj.doc(uid).get()
        matching_m = matching_m.exists
        // let matching_m = await matching_m_promise.docs.map(x => x.data().user)
    
        //check if user is owner
        let proj_owner = await db.collection('projects').doc(project_ref.id).get().then(doc => {
            if(doc.exists){
                return doc.data().owner
            }
        })
        
        let uidIsOwner = (proj_owner == uid) ? true : false;    
        console.log('checking.. if i can apply ', matching_m, ' PID: ', project_ref.path)
    
        return (matching_m === false && matching_usr_app.length === 0 && !uidIsOwner && uid)
    }
    return false;
}

export default CheckCanApply