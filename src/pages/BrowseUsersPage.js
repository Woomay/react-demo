import React from 'react'
import { Link } from 'react-router-dom'

const BrowseUsersPage = ({match}) => (
    <div>
        Browse Users
        <ul>
            <li><Link to={`${match.path}/1`}>Brad</Link></li>
            <li><Link to={`${match.path}/2`}>chris</Link></li>
            <li><Link to={`${match.path}/3`}>Michael</Link></li>
            <li><Link to={`${match.path}/4`}>Ryan</Link></li>
            <li><Link to={`${match.path}/5`}>code</Link></li>
        </ul>
    </div>
)

export default BrowseUsersPage