import React, { useEffect } from 'react';
import { useAuthContext } from '../../Context/AuthContext';
import Messages from './Messages';
import MessageInput from './MessageInput';

function NoChatSelected() {
  const { authenticatedUser } = useAuthContext();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full text-gray-700 font-bold text-2xl'>
      <h1>Welcome, {authenticatedUser.fullName}</h1>
      <p>Select a chat to start messaging</p>
    </div>
  );
}

const MessageContainer = () => {
  const { selectedUser, setSelectedUser } = useAuthContext();

  useEffect(() => {
    return () => setSelectedUser(null);
  }, [setSelectedUser]);

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      {!selectedUser ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='flex-1 overflow-y-auto'>
            <Messages />
          </div>
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;


// By using overflow-y-auto on the container wrapping the Messages component (<div className='flex-1 overflow-y-auto'>), you enable vertical scrolling within that container. This confines the scrollbar to the Messages component and prevents it from affecting the whole page.

// Additionally, by using overflow-hidden on the parent container (<div className='flex flex-col h-screen overflow-hidden'>), you prevent the entire page from scrolling, ensuring that scrolling is limited to the specific container with the Messages component. This further reinforces the containment of the scrollbar.





