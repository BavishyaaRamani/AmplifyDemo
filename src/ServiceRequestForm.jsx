import React, { useState } from 'react';
import './ServiceRequestForm.css'; 

import { generateClient } from 'aws-amplify/api';
//import { v4 as uuidv4} from 'uuid'; // Import UUID generator
//import{getTodo} from './graphql/queries';
import {createTodo} from './graphql/mutations';
//import { createServiceRequest } from './graphql/mutations';


const client = generateClient();
const ServiceRequestForm = () => { 
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [severity, setSeverity] = useState('Low');
  const [resolutionDate, setResolutionDate] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [location, setLocation] = useState('');


  const handleCreationDateChange = (e) => {
    setCreationDate(e.target.value);
    calculateResolutionDate(e.target.value, severity);
  };

  const handleSeverityChange = (e) => {
    setSeverity(e.target.value);
    calculateResolutionDate(creationDate, e.target.value);
  };

  const calculateResolutionDate = (startDate, selectedSeverity) => {
    const daysToAdd =
      selectedSeverity === 'Low' ? 5 : selectedSeverity === 'Medium' ? 3 : 1;

    const startDateObj = new Date(startDate);
    startDateObj.setDate(startDateObj.getDate() + daysToAdd);

    const formattedResolutionDate = startDateObj.toLocaleDateString('en-GB');
    setResolutionDate(formattedResolutionDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newTodo = {
        serviceName,
        description,
        creationDate,
        severity,
        resolutionDate,
        reporterName,
        contactInfo,
        location
      };

      // Call API to create service request
      //const response = 
      await client.graphql({query: createTodo, variables: {input: newTodo}});
      /*await client.graphql({
        query: getTodo`
          mutation createTodo($input: CreateTodoInput!) {
            createTodo(input: $input) {
              serviceName
              description
              creationDate
              severity
              resolutionDate
              reporterName
              contactInfo
              location
            }
          }
        `,
        variables: {
          input: newTodo
        }
      });*/

      alert('Service request submitted successfully!');
    } catch (error) {
      console.log('Error creating service request:', error);
      alert('Failed to submit service request. Please try again.');
    }
  };


  return (
    <div>
    <form onSubmit={handleSubmit} className="service-request-form">
      <div className="form-group">
        <label>Service Request Name:</label>
        <input
          type="text"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Service Request Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Creation Date (DD/MM/YYYY):</label>
        <input
          type="date"
          value={creationDate}
          onChange={handleCreationDateChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Severity:</label>
        <select value={severity} onChange={handleSeverityChange} required>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="form-group">
        <label>Resolution Date (DD/MM/YYYY):</label>
        <input type="text" value={resolutionDate} readOnly />
      </div>
      <div className="form-group">
        <label>Reporter Name:</label>
        <input
          type="text"
          value={reporterName}
          onChange={(e) => setReporterName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Contact Information:</label>
        <input
          type="email"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>
      <button class= "formbutton" type="submit">Submit</button>
    </form>

    
</div>
  );
};

export default ServiceRequestForm;
