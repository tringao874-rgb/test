// In-memory storage for chat messages (replace with SQL Server in production)
let groupMessages = [
  {
    id: '1',
    userId: '1',
    userName: 'Admin User',
    message: 'Welcome to the team chat! 👋',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'text'
  },
  {
    id: '2',
    userId: '2',
    userName: 'Jane Smith',
    message: 'Thanks! Excited to be working with everyone.',
    timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
    type: 'text'
  },
  {
    id: '3',
    userId: '3',
    userName: 'Bob Wilson',
    message: 'Has anyone seen the latest project updates?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    type: 'text'
  },
  {
    id: '4',
    userId: '1',
    userName: 'Admin User',
    message: 'Yes, I just posted them in the Projects section. Check them out!',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    type: 'text'
  }
];

// Private messages storage: { "user1_user2": [...messages] }
let privateMessages = {
  "1_2": [
    {
      id: 'p1',
      userId: '2',
      userName: 'Jane Smith',
      message: 'Hi! Can you help me with the website project?',
      timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: 'p2',
      userId: '1',
      userName: 'Admin User',
      message: 'Sure! What do you need help with?',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      type: 'text'
    }
  ],
  "1_3": [
    {
      id: 'p3',
      userId: '3',
      userName: 'Bob Wilson',
      message: 'Are you free to review the design?',
      timestamp: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      type: 'text'
    }
  ]
};

const getPrivateChatKey = (user1Id, user2Id) => {
  const ids = [user1Id, user2Id].sort();
  return `${ids[0]}_${ids[1]}`;
};

const handleGetMessages = async (req, res) => {
  try {
    const response = {
      success: true,
      data: groupMessages
    };
    res.json(response);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
};

const handleSendMessage = async (req, res) => {
  try {
    const { message, userId, userName } = req.body;
    
    const newMessage = {
      id: Date.now().toString(),
      userId,
      userName,
      message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    groupMessages.push(newMessage);

    const response = {
      success: true,
      data: newMessage
    };
    
    res.json(response);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message'
    });
  }
};

const handleGetPrivateMessages = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.query.currentUserId; // Should come from auth token
    
    const chatKey = getPrivateChatKey(currentUserId, userId);
    const messages = privateMessages[chatKey] || [];

    const response = {
      success: true,
      data: messages
    };
    
    res.json(response);
  } catch (error) {
    console.error('Get private messages error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch private messages'
    });
  }
};

const handleSendPrivateMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { message, senderId, senderName } = req.body;
    
    const chatKey = getPrivateChatKey(senderId, userId);
    
    if (!privateMessages[chatKey]) {
      privateMessages[chatKey] = [];
    }

    const newMessage = {
      id: Date.now().toString(),
      userId: senderId,
      userName: senderName,
      message,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    privateMessages[chatKey].push(newMessage);

    const response = {
      success: true,
      data: newMessage
    };
    
    res.json(response);
  } catch (error) {
    console.error('Send private message error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send private message'
    });
  }
};

module.exports = {
  handleGetMessages,
  handleSendMessage,
  handleGetPrivateMessages,
  handleSendPrivateMessage
};
