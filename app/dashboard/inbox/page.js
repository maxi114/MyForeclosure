'use client';

import { useState, useEffect } from 'react';
import PageBreadcrumb  from '../../elements/PageBreadcrumb';
import { Row, Col } from 'react-bootstrap';
import ChatUsers from '../../components/ChatUsers';
import ChatArea from '../../components/ChatArea';
import ChatProfile from '../../components/ChatProfile';
import { db, auth } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

export default function InboxPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, 'users'), where('uid', '!=', currentUser.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const onUserChange = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <h1 className="text-lg font-semibold md:text-2xl">Inbox</h1>
      <Row className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6" >
        <Col xxl={3} xl={{ span: 6, order: 1 }}>
          <ChatUsers users={users} onUserSelect={onUserChange} />
        </Col>
        <Col xxl={6} xl={{ span: 12, order: 2 }}>
          <ChatArea currentUser={currentUser} selectedUser={selectedUser} />
        </Col>
        <Col xxl={{ span: 3, order: 2 }} xl={{ span: 6, order: 1 }}>
          <ChatProfile selectedUser={selectedUser} />
        </Col>
      </Row>
    </div>
  );
}

