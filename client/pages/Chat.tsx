import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Send, 
  Users, 
  Smile,
  Paperclip,
  Phone,
  Video,
  MoreVertical
} from 'lucide-react';
import { Navigate } from 'react-router-dom';

export default function Chat() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);

  // Mock data for demonstration
  const mockMessages = [
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
      userName: 'Regular User',
      message: 'Thanks! Excited to be working with everyone.',
      timestamp: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
      type: 'text'
    },
    {
      id: '3',
      userId: '3',
      userName: 'Jane Smith',
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

  const mockOnlineUsers = [
    { id: '1', name: 'Admin User', role: 'manager', status: 'online' },
    { id: '2', name: 'Regular User', role: 'member', status: 'online' },
    { id: '3', name: 'Jane Smith', role: 'member', status: 'away' },
    { id: '4', name: 'Bob Wilson', role: 'member', status: 'offline' }
  ];

  useEffect(() => {
    if (isAuthenticated) {
      setMessages(mockMessages);
      setOnlineUsers(mockOnlineUsers);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <Layout>
      <div className="h-[calc(100vh-8rem)] flex gap-6">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
              <div className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div>
                  <CardTitle className="text-lg">Team Chat</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {onlineUsers.filter(u => u.status === 'online').length} online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => {
                    const isOwnMessage = message.userId === user.id;
                    const showAvatar = index === 0 || messages[index - 1].userId !== message.userId;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-3 ${isOwnMessage ? 'flex-row-reverse space-x-reverse' : ''}`}
                      >
                        {showAvatar && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={isOwnMessage ? 'bg-primary text-primary-foreground' : 'bg-secondary'}>
                              {getInitials(message.userName)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        {!showAvatar && <div className="w-8" />}
                        
                        <div className={`flex-1 max-w-xs ${isOwnMessage ? 'text-right' : ''}`}>
                          {showAvatar && (
                            <div className={`flex items-center space-x-2 mb-1 ${isOwnMessage ? 'justify-end' : ''}`}>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {message.userName}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.timestamp)}
                              </span>
                            </div>
                          )}
                          <div
                            className={`inline-block rounded-lg px-3 py-2 text-sm ${
                              isOwnMessage
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            }`}
                          >
                            {message.message}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" type="button">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm" type="button">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button type="submit" size="sm" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Online Users Sidebar */}
        <div className="w-64 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-sm">
                <Users className="h-4 w-4 mr-2" />
                Team Members ({onlineUsers.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {onlineUsers.map((user) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(user.status)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.role === 'manager' ? 'default' : 'secondary'} className="text-xs">
                        {user.role}
                      </Badge>
                      <span className="text-xs text-muted-foreground capitalize">
                        {user.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Features */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Chat Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Paperclip className="h-4 w-4 mr-2" />
                Share Files
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Video className="h-4 w-4 mr-2" />
                Start Video Call
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
