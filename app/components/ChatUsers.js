'use client';

import React from 'react';
import { Card } from 'react-bootstrap';
import classnames from 'classnames';
import SimpleBar from 'simplebar-react';

const ChatUsers = ({ users, onUserSelect }) => {
  return (
    <Card>
      <Card.Body className="p-0">
        <SimpleBar style={{ maxHeight: '550px', width: '100%' }}>
          {users.map((user) => (
            <div
              key={user.id}
              className={classnames('d-flex', 'align-items-start', 'mt-1', 'p-2', 'cursor-pointer')}
              onClick={() => onUserSelect(user)}
            >
              <img src={user.avatar || '/default-avatar.png'} className="me-2 rounded-circle" height="48" alt="" />
              <div className="w-100 overflow-hidden">
                <h5 className="mt-0 mb-0 font-14">
                  {user.firstName} {user.lastName}
                </h5>
                <p className="mt-1 mb-0 text-muted font-14">
                  {user.email}
                </p>
              </div>
            </div>
          ))}
        </SimpleBar>
      </Card.Body>
    </Card>
  );
};

export default ChatUsers;