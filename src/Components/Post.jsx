import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native'
import React,{ useContext,useState,useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Authcontext } from '../context/Authcontext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Userapi from '../api/Userapi';




const Post = ({ post }) => {

   // const { like_post, likedPosts,getLikedPosts  } = useContext(Authcontext);
    const { like_post, getLikedPosts,likedPosts,user,dislike_post,getPosts } = useContext(Authcontext);
    const [isLiked, setIsLiked] = useState(false);
    const [showLikedMessage, setShowLikedMessage] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [commentText, setCommentText] = useState(''); // Estado para almacenar el texto del comentario
    const [isCommentModalVisible, setCommentModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de comentarios
    const [comments, setComments] = useState([]);
    const onRefresh = async () => {
        setRefreshing(true);
        // Realizar la solicitud para obtener nuevos datos
        await getPosts();
        setRefreshing(false);
    };
    useEffect(() => {
        // Llamada a la función que obtiene los posts liked
        getLikedPosts();
      }, []);
      useEffect(() => {
        const loadLikedState = async () => {
          const liked = await AsyncStorage.getItem(`likedPost_${user.id}_${post.id}`);
          setIsLiked(liked === 'true');
          setShowLikedMessage(liked === 'true');
        };
      
        loadLikedState();
      }, [post.id, likedPosts]);
      const fetchComments = async () => {
        const token = await AsyncStorage.getItem('token');
        try {
          const {data} = await Userapi.get(`api/posts/${post.id}/getcomment`,
          {
            headers: {
              Authorization: 'Bearer ' + token
            }
          }
          );
          setComments(data.comments);
            console.log(data.comments);
        } catch (error) {
          console.error('Error al obtener comentarios:', error.message);
        }
      };
    const got_like=async()=>{
        await like_post(post.id);
        setIsLiked(!isLiked);
        setShowLikedMessage(true);
        await AsyncStorage.setItem(`likedPost_${user.id}_${post.id}`, 'true');
        await onRefresh();
    }
    
    const sendComment = async () => {
        try {
          // Lógica para enviar el comentario al servidor
          const token = await AsyncStorage.getItem('token');
          console.log(commentText);
          const response = await Userapi.post(`api/posts/${post.id}/comment`, {
            comentario:commentText,
          }, {
            headers: {
              Authorization: 'Bearer ' + token,
            },
          });
      
          // Si es necesario, maneja la respuesta del servidor aquí
      
          // Actualiza la lista de comentarios después de enviar el comentario
          // Puedes llamar a la función que obtiene los comentarios para refrescar la lista
          // Ejemplo:
          //await fetchComments(postId);
        } catch (error) {
          console.error('Error al enviar comentario:', error.message);
        }
      };

    const handleDislike = async () => {
        try {
          await dislike_post(post.id);
          setIsLiked(false);
          setShowLikedMessage(false);
          await AsyncStorage.setItem(`likedPost_${user.id}_${post.id}`, 'false');
          await onRefresh();
          
        } catch (error) {
          console.error('Error al manejar el dislike:', error.message);
        }
      };
      const toggleCommentModal = () => {
        setCommentModalVisible(!isCommentModalVisible);
      };
      const handleCommentSubmit = async () => {
        // Lógica para enviar el comentario al servidor
        // ...
        //await sendComment(post.id, commentText);
        await fetchComments();
        // Cierra el modal después de enviar el comentario
        setCommentModalVisible(false);
      };
    return (
        <View style={styles.postContainer}>
            <View style={styles.postInfo}>
                <View style={styles.postHeader}>
                    <Text style={styles.name}>{post.post_title}</Text>
                </View>
            </View>
            <Image source={{ uri: post.post_image_dir }} style={styles.postImage} />
            <View style={styles.postFooter}>
            <TouchableOpacity onPress={isLiked ? handleDislike : got_like}>
          <Icon name={isLiked ? 'check-circle' : 'check-circle-outline'} color="black" size={30} />
        </TouchableOpacity>
                <TouchableOpacity onPress={toggleCommentModal}>
                <Icon name="comment" color='black' size={30} />  
                </TouchableOpacity>
            </View>
            {showLikedMessage && <Text style={styles.likeMessage}>¡Ya le has dado like!</Text>}
            {!showLikedMessage && !isLiked && <Text style={styles.notLikedMessage}>Aún sin dar like</Text>}
            <Text style={styles.likes}>{post.post_likes} Me gusta</Text>
            <Text style={styles.likes}>{post.post_comments} comentarios</Text>
             {/* Modal de Comentarios */}
      <Modal visible={isCommentModalVisible} animationType="slide">
        <View style={styles.commentModalContainer}>
        <ScrollView style={styles.commentScrollView}>
            {/* Mostrar comentarios */}
            {comments.map((comment, index) => (
              <View key={index} style={styles.commentItem}>
                <Text style={styles.text_comment} >{comment.comentario}</Text>
              </View>
            ))}
          </ScrollView>
          <TextInput
            style={styles.commentInput}
            placeholder="Escribe un comentario..."
            value={commentText}
            onChangeText={(text) => setCommentText(text)}
          />
          <TouchableOpacity onPress={sendComment} style={styles.commentButton}>
            <Text style={styles.ButtonText}>Enviar Comentario</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleCommentModal} style={styles.closeButton}>
            <Text style={styles.ButtonText}>Cerrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchComments} style={styles.reloadButton}>
            <Text style={styles.ButtonText}>reload</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    ButtonText:{
        fontFamily:'fantasy',
        fontSize:15,
        padding:'2%',
        color:'black'
    },
    reloadButton:{
        backgroundColor:'yellow',
        borderRadius:20,
        marginTop:'2%',
        borderWidth:3,
        padding:'2%'
    },
    closeButton:{
        backgroundColor:'red',
        borderRadius:30,
        marginTop:'2%',
        borderWidth:4,
        borderColor:'orange',
        padding:'2%'
    },
    commentButton:{
        backgroundColor:'green',
        borderRadius:20,
        marginTop:'5%',
        borderWidth:4,
        borderColor:'orange',
        fontSize:10,
    },
    commentInput:{
        backgroundColor:'orange',
        borderRadius:50,
        marginTop:'5%'
    },
    text_comment:{
        fontSize:17,
        color:'yellow',
        fontFamily:'fantasy'
    },
    commentItem:{
        backgroundColor:'blue',
        borderRadius:80,
        alignContent:'center',
        justifyContent:'center',
        textAlign:'center',
        alignItems:'center',
        width:'80%',
        padding:'2%',
        margin:'0.6%',
        borderColor:'yellow',

    },
    postContainer: {
        marginBottom: 16,
        backgroundColor:"green",
        alignItems:'center',
        justifyContent:'center',
        alignContent:'center',
        flex:1
    },
    postImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
        flex:1
    },
    postInfo: {
        padding: 15,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent:'center',
        width:'80%',
        
    },
    name: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor:"cyan",
        borderRadius:20,
        justifyContent:'center',
        width:'110%',
        paddingLeft:'41%',
        alignContent:'center',
        textAlign:'auto'
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 12,
    },
    likes: {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 4,
        marginLeft: 12,
        backgroundColor:"cyan",
        borderRadius:50,
        width:'50%'
    },
    comments: {
        color: '#888',
    },
    commentModalContainer:{
        alignItems:'center'
    },
    commentScrollView:{
        backgroundColor:'aqua',
        width:'100%',
        height:'20%',
        borderRadius:30,
        marginTop:'10%',
        borderColor:'cian',
        borderWidth:5,
        paddingLeft:'17%'
    }
});

export default Post