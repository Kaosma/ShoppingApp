import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import {styles} from "./ShoppingList";

export const StoreItem = ({route}:{route:any}) => {

    const [item, setItem] = useState<Item>();
    const displayAlert = () => {
        Alert.alert(
          "Cart",
          "Item added to cart.",
          [ {text: "OK", onPress: () => console.log("OK pressed")} ]
        )
      }
      
    interface Item {
        title: string;
        id: string;
        price: number;
        imageUrl: string;
        description: string;
        category: string;
    }

    function loadItem() {
        fetch('https://fakestoreapi.com/products/'+route.params.id)
          .then((response) => response.json())
          .then((data) => {
            console.log('DATA: ',data)
            let fetchedItem: Item = {
                title: data.title,
                id: data.id,
                price: data.price,
                imageUrl: data.image,
                description: data.description,
                category: data.category
            };
            setItem(fetchedItem);
          })
          .catch((error) => console.log(error));
    }

    useEffect(() => {
        loadItem();
    }, []);

    return (
        <View style={{flex: 1,
            backgroundColor: '#f5f5f5',
            alignItems: 'center',
            }}>
            <View>
                <Image style={styles.itemImage} source={{uri:item?.imageUrl}}/>
            </View>
            <View style={{width: '90%'}}>
                <Text style={{fontSize: 22, fontWeight: 'bold'}}>{item?.title}</Text>
                <Text style={{color: 'green', marginTop: 10}}>${item?.price}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 10}}>Description</Text>
                <Text>{item?.description}</Text>
                <Text style={{fontWeight: '500',opacity: 0.6, marginTop: 10}}>Category: {item?.category}</Text>
            </View>
            <View>
                <TouchableOpacity style={{marginTop: 15}}>
                    <Text style={{color: '#007aff'}} onPress={displayAlert}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}