import React, { useEffect, useState } from 'react';
import './ServiceRequestForm.css';
import { generateClient } from 'aws-amplify/api';
//import { Amplify } from 'aws-amplify';
import { listServiceRequests } from './graphql/queries';
//import {API} from 'aws-amplify'

const client = generateClient();

const SubmittedData = () => {
    const [submittedRequests, setSubmittedRequests] = useState([]);
  
    useEffect(() => {
      fetchSubmittedRequests();
    }, []);
  
    const fetchSubmittedRequests = async () => {
      try {
        const response = await client.graphql({query: listServiceRequests});
        //const response = await client.graphql(listServiceRequests);
        const responseData = response.data.listServiceRequests.items;
        console.log(responseData);
        setSubmittedRequests('submittedData', responseData);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

  
    return (
      <div>
        <h2>Submitted Service Requests</h2>
        <ul>
          {submittedRequests.map(request => (
            <li key={request.id}>
              <strong>Case Number:</strong> {request.id}<br />
              <strong>Service Name:</strong> {request.serviceName}<br />
              <strong>Description:</strong> {request.description}<br />
              <strong>Creation Date:</strong> {request.creationDate}<br />
              <strong>Severity:</strong> {request.severity}<br />
              <strong>Reporter Name:</strong> {request.reporterName}<br />
              <strong>Contact Info:</strong> {request.contactInfo}<br />
              <strong>Location:</strong> {request.location}<br />
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SubmittedData;