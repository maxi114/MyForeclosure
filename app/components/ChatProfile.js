'use client';

import React from 'react';
import { Card } from 'react-bootstrap';

const ChatProfile = ({ selectedUser }) => {
  if (!selectedUser) return null;

  return (
    <Card>
      <Card.Body>
        <div className="text-center">
          <img src={selectedUser.avatar || '/default-avatar.png'} className="rounded-circle avatar-lg img-thumbnail" alt="" />
          <h4 className="mt-3 mb-0">{selectedUser.firstName} {selectedUser.lastName}</h4>
          <p className="text-muted">{selectedUser.role}</p>
        </div>
        <div className="mt-3">
          <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ms-2">{selectedUser.email}</span></p>
          {selectedUser.phone && (
            <p className="text-muted mb-2 font-13"><strong>Phone :</strong><span className="ms-2">{selectedUser.phone}</span></p>
          )}
          {selectedUser.location && (
            <p className="text-muted mb-2 font-13"><strong>Location :</strong> <span className="ms-2">{selectedUser.location}</span></p>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChatProfile;