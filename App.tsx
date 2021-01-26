import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import {StoreList} from "./screens/ShoppingList";
import {StoreItem} from "./screens/ShoppingItem";
import { View, Text } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Catalog" component={StoreList} />
            <Stack.Screen name="Item" component={StoreItem} options={({ route }) => ({ title:route.params.title})}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
}