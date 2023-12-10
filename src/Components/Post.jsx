import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React,{ useContext,useState,useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Authcontext } from '../context/Authcontext';


const Post = ({ post }) => {
   // const { like_post, likedPosts,getLikedPosts  } = useContext(Authcontext);
    const { like_post, getLikedPosts,likedPosts  } = useContext(Authcontext);
    const [isLiked, setIsLiked] = useState(false);
    const [showLikedMessage, setShowLikedMessage] = useState(false);
    useEffect(() => {
        // Llamada a la función que obtiene los posts liked
        getLikedPosts();
      }, []);
      useEffect(() => {
        setIsLiked(likedPosts && likedPosts.some(likedPost => likedPost.id === post.id));
        setShowLikedMessage(false);
    }, [likedPosts]);
    const got_like=async()=>{
        await like_post(post.id);
        setIsLiked(!isLiked);
        setShowLikedMessage(true);
        
    }
    return (
        <View style={styles.postContainer}>
            <View style={styles.postInfo}>
                <View style={styles.postHeader}>
                    <Text style={styles.name}>{post.post_title}</Text>
                </View>
            </View>
            <Image source={{ uri: post.post_image_dir }} style={styles.postImage} />
            <View style={styles.postFooter}>
            <TouchableOpacity onPress={got_like}>
                <Icon name={isLiked ? 'check-circle' : 'check-circle-outline'} color="black" size={30} />
             </TouchableOpacity>
                <TouchableOpacity>
                <Icon name="comment" color='black' size={30} />  
                </TouchableOpacity>
            </View>
            {showLikedMessage && <Text style={styles.likeMessage}>¡Ya le has dado like!</Text>}
            {!showLikedMessage && !isLiked && <Text style={styles.notLikedMessage}>Aún sin dar like</Text>}
            <Text style={styles.likes}>{post.post_likes} Me gusta</Text>
            <Text style={styles.likes}>{post.post_comments} comentarios</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
});

export default Post