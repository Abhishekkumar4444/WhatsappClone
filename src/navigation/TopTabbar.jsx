import React from 'react';
import {View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from '../theme/Colors';
import {TabBarData} from '../data/TabbarData';
import VectorIcon from '../utils/VectorIcon'
import { NormalizeSize } from '../utils/sizeNormalisation'

const Tab = createMaterialTopTabNavigator();

const TopTabbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={({route}) => ({
        tabBarActiveTintColor: Colors.tertiary,
        tabBarInactiveTintColor: Colors.secondaryColor,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.tertiary,
        },
        tabBarStyle: {
          backgroundColor: Colors.primaryColor,
        },
      
         tabBarLabelStyle: {
         textTransform: 'none',
          fontSize: 14,
          display: route.name === 'Community' ? 'none' : 'flex', // Hide the label text
          
       
    },
     tabBarIcon: ({ focused, color, size }) => {
      if (route.name === 'Community') {
        return (
             <View style={{ top:NormalizeSize(10) }}> 
              <VectorIcon
                name="account-group"
                type="MaterialCommunityIcons"
                color={color}
                size={24}
              />
            </View>
        );
      }
    }
    
    
      })}>
    
      {TabBarData.map(tab => (
        <Tab.Screen key={tab.id} name={tab.name} component={tab.route} />
      ))}
    </Tab.Navigator>
  );
};

export default TopTabbar;
