import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet, Text, View, Image, Button, TouchableOpacity, SafeAreaView } from 'react-native';


export const StoreList = ({navigation}: {navigation: any}) => {

  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);

  interface ShoppingItem {
    name: string;
    id: string;
    price: number;
    imageUrl: string;
  }

  function loadFromAPI() {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        let array = [];
        for (let shoppingData of data) {
          let storeItem: ShoppingItem = {
            name: shoppingData.title,
            id: shoppingData.id,
            price: shoppingData.price,
            imageUrl: shoppingData.image
          };
          array.push(storeItem);
        }
        setShoppingList(array);
      })
      .catch((error) => console.log(error));
  }
  
  useEffect(() => {
    loadFromAPI();
  }, []);

  return (
    <SafeAreaView style={styles.rootContainer}>
      <View style= {styles.listContainer}>
        <FlatList
          data={shoppingList}
          renderItem={({ item }) => {
            return(
              <View>
                <TouchableOpacity style={{
                  flexDirection: 'row'}} onPress={() => navigation.navigate('Item', {id:item.id, title:item.name})}>
                  <Image style={styles.imageContainer} source={{uri:item.imageUrl}}/>
                  <View style={{justifyContent: 'center', width: '60%', }}>
                    <Text style={{fontSize: 16}}>{item.name}</Text>
                    <Text style={{color: 'green', marginTop: 8,fontSize: 13}}>${item.price}</Text>
                  </View>
                </TouchableOpacity>
                <View style={{alignItems: 'center', margin: 10}}>
                  <View style={{
                    height: 1,
                    backgroundColor: '#d3d3d3',
                    width: '95%',
                  }}/>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  listContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    height: 80,
    width: 80,
    margin: 10,
  },
  itemImage: {
    height: 200,
    width: 200,
    margin: 20
  }
});
