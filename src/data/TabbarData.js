import CallListScreen from '../screens/CallListScreen';
import ChatListScreen from '../screens/ChatListScreen';
import CommunityScreen from '../screens/CommunityScreen'
import StatusListScreen from '../screens/StatusListScreen';

export const TabBarData = [
  {
    id: 1,
    route: CommunityScreen,
    name: 'Community',
  },
  {
    id: 2,
    route: ChatListScreen,
    name: 'Chats',
  },
  {
    id: 3,
    route: StatusListScreen,
    name: 'Updates',
  },
  {
    id: 4,
    route: CallListScreen,
    name: 'Calls',
  },
];

 