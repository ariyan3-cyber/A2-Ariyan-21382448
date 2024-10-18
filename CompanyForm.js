import React, { useState, useEffect } from 'react';

function CompanyForm({ companies, setCompanies, editingCompany, setEditingCompany }) {
    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');

    useEffect(() => {
        if (editingCompany) {
            setCompanyName(editingCompany.company_name);
            setCompanyAddress(editingCompany.company_address);
        } else {
            setCompanyName('');
            setCompanyAddress('');
        }
    }, [editingCompany]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingCompany) {
            // Update existing company
            fetch(`http://localhost:3000/api/companies/${editingCompany.company_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_name: companyName,
                    company_address: companyAddress
                })
            }).then(response => response.json())
              .then(updatedCompany => {
                  const updatedCompanies = companies.map(company => 
                    company.company_id === updatedCompany.company_id ? updatedCompany : company
                  );
                  setCompanies(updatedCompanies);
                  setEditingCompany(null);
              }).catch(error => console.error('Error:', error));
        } else {
            // Create new company
            fetch('http://localhost:3000/api/companies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    company_name: companyName,
                    company_address: companyAddress
                })
            }).then(response => response.json())
              .then(newCompany => {
                  setCompanies([...companies, newCompany]);
              }).catch(error => console.error('Error:', error));
        }

        setCompanyName('');
        setCompanyAddress('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Company Name:</label>
                <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
            </div>
            <div>
                <label>Company Address:</label>
                <input type="text" value={companyAddress} onChange={(e) => setCompanyAddress(e.target.value)} />
            </div>
            <button type="submit">{editingCompany ? 'Update Company' : 'Add Company'}</button>
        </form>
    );
}

export default CompanyForm;
