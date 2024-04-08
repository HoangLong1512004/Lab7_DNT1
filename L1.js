import { Button, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const L1 = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setname] = useState('');
    const [sdt, setsdt] = useState('');
    const [visibleUpdate, setvisibleUpdate] = useState(false);
    useEffect(()=>{
        getlist()
    },[])
    const [list, setlist] = useState([]);
    const getlist = async()=>{
      await  fetch("http://172.20.10.3:3000/users",{
            method:"GET"
        }).then(res=>res.json())
        .then(data =>{
            console.log(data)
            setlist(data);
        }).catch(err =>{
            console.log(err);
        })
        
    }

//xoa
const deleteItem = (id)=>{
    fetch("http://172.20.10.3:3000/users/"+id,{
        method:"delete"
    }).then(res=>{
        if(res.ok){
            getlist()
            console.log("xoá thành công");
        }else{
            console.log("xoá thất bại");
        }
    }).catch(err=>console.log(err))
}
//them

const Add = () =>{
    const newData = {
        hoten: name,
        sdt: sdt   
    }
    fetch('http://172.20.10.3:3000/users',{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(newData)
    }).then(res =>{
        if (res.ok) {
            getlist()
            console.log("thêm thành công");
        }else{
            console.log("thêm thất bại");
        }
    }).catch(er=>console.log(er))
    
}
//sửa
const editItem = (id)=>{
    const updateData = {
        hoten: name,
        sdt: sdt   
    }
    fetch('http://172.20.10.3:3000/users/'+id,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(updateData)
    }).then(res =>{
        if (res.ok) {
            getlist()
            console.log("Sửa thành công");
        }else{
            console.log("Sửa thất bai");
        }
    }).catch(er=>console.log(er))
    
}

 const renderItem =({item})=>{
    return(
        <View>
            <Text>name {item.hoten} sdt {item.sdt}</Text>
            <Button title='delete' onPress={()=>{
                id= item.id
                deleteItem(id) 
            }}/>
            <Button title='sửa' onPress={()=>{
                id= item.id
                setname(item.hoten)
                setsdt(item.sdt)
                setvisibleUpdate(true)
            }}/>
           
        </View>
    )
 }

  return (
    <View>

    <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id.toString()}></FlatList>

    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>ADD</Text>
            <TextInput placeholder='name' onChangeText={(text)=>{setname(text)}}/>
            <TextInput placeholder='sdt' onChangeText={(text)=>{setsdt(text)}}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalVisible(!modalVisible)
              Add()
              } }>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
                <Modal visible={visibleUpdate}>

                <TextInput placeholder='name' value={name} onChangeText={(text)=>{setname(text)}}/>
            <TextInput placeholder='sdt' value={sdt} onChangeText={(text)=>{setsdt(text)}}/>
               <Button title='Lưu' onPress={()=>{
                setvisibleUpdate(false)
                editItem(id)
               }}/>
                </Modal>

    </View>
   
  )
}

export default L1

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
    
    
})