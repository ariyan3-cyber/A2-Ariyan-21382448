import React, { useState, useEffect } from 'react';
import CompanyForm from './CompanyForm';

function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [editingCompany, setEditingCompany] = useState(null);

    // Fetch companies from the API
    useEffect(() => {
        fetch('http://localhost:3000/api/companies')
            .then(response => response.json())
            .then(data => setCompanies(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const deleteCompany = (id) => {
        fetch(`http://localhost:3000/api/companies/${id}`, {
            method: 'DELETE'
        }).then(() => {
            setCompanies(companies.filter(company => company.company_id !== id));
        }).catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Company List</h2>
            <CompanyForm companies={companies} setCompanies={setCompanies} editingCompany={editingCompany} setEditingCompany={setEditingCompany} />
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Company Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {companies.map(company => (
                        <tr key={company.company_id}>
                            <td>{company.company_name}</td>
                            <td>{company.company_address}</td>
                            <td>
                                <button onClick={() => setEditingCompany(company)}>Edit</button>
                                <button onClick={() => deleteCompany(company.company_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyList;
