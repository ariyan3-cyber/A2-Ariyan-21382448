import React from 'react';

function PhoneList({ phones }) {
    return (
        <div className="phone-list">
            <h3>Phone Numbers</h3>
            <table>
                <thead>
                    <tr>
                        <th>Phone Type</th>
                        <th>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {phones.map(phone => (
                        <tr key={phone.id}>
                            <td>{phone.phone_type}</td>
                            <td>{phone.phone_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PhoneList;
