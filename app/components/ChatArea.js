'use client';

import React, { useState, useEffect } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { db } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';

const ChatArea = ({ currentUser, selectedUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (!currentUser || !selectedUser) return;

    const chatId = [currentUser.uid, selectedUser.id].sort().join('_');
    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messageList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messageList);
    });

    return () => unsubscribe();
  }, [currentUser, selectedUser]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const chatId = [currentUser.uid, selectedUser.id].sort().join('_');
    await addDoc(collection(db, 'messages'), {
      chatId,
      senderId: currentUser.uid,
      receiverId: selectedUser.id,
      text: newMessage,
      timestamp: new Date()
    });

    setNewMessage('');
  };

  return (
    <Card>
      <Card.Body>
        <SimpleBar style={{ height: '400px' }}>
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.senderId === currentUser.uid ? 'sent' : 'received'}`}>
              {message.text}
            </div>
          ))}
        </SimpleBar>
        <Form onSubmit={sendMessage}>
          <Form.Group className="mt-3">
            <Form.Control
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
          </Form.Group>
          <Button type="submit" className="mt-2">Send</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ChatArea;