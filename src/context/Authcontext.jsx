import React, { createContext,useReducer,useEffect ,useState} from 'react';
import { Authreducer } from './Authreducer';
import Userapi from '../api/Userapi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Authcontext = createContext();
const auth_init_state ={
  status:'noauth',
  token:null,
  user:null,
  error_message:'error'
};
export const AuthProvider = ({ children }) => {
  
  const [state,dispatch]=useReducer(Authreducer, auth_init_state);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [user, setuser] = useState([]);
  useEffect(()=> {
    check_token();
}, []);
useEffect(() => {
  getPosts();
}, []);
  
  const sign_up =async({name,username,lastname,email,password})=>{
    console.log(name,email,password);
    try{
      const {data} = await Userapi.post('/api/register',{name,username,lastname,email,password});
      dispatch(
        {
          type:'sign_up',
          payload:{
            status:'auth',
            token:data.token,
            user:data.user,
          }
        });
        await AsyncStorage.setItem('token',data.token);
        
        console.log(data.token);
    }catch(error){
      console.log(error.response.data.error_register);
    }
  };

  const getLikedPosts = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const { data } = await Userapi.get('api/posts/liked', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      setLikedPosts(data.likedPosts);
      
    } catch (error) {
      console.log('Error al obtener los posts liked:', error);
    }
  };
  
  

  const log_out = async()=>{
    await AsyncStorage.removeItem('token');

    dispatch({
      type: 'logout',
      payload:{
        token:null,
        user:null,
        status:'noauth',
      }
  });
    
    
  };
  const getPosts = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
        const { data } = await Userapi.get('api/viewpost', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        setPosts(data);
    } catch (error) {
        console.log(error.response.data);
    }
}
const like_post = async (postId) => {
  const token = await AsyncStorage.getItem('token');
  console.log(postId);
  try {
    const response = await Userapi.post(`/api/posts/${postId}/like`,null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await getLikedPosts();
    // Guarda likedPosts en AsyncStorage
    await AsyncStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    await AsyncStorage.setItem(`likedPost_${postId}`, 'true');
    
  } catch (error) {
    console.error('Error al realizar la petición:', error.message);
  }
};

const dislike_post = async (postId) => {
  const token = await AsyncStorage.getItem('token');

  try {
    const response = await Userapi.post(`/api/posts/${postId}/dislike`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Lógica adicional si es necesario
    await getLikedPosts();
    // Guarda likedPosts en AsyncStorage
    await AsyncStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    await AsyncStorage.setItem(`likedPost_${postId}`, 'false');

    console.log(response.data.message); // Puedes manejar la respuesta del servidor según tus necesidades
  } catch (error) {
    console.error('Error al realizar la petición:', error.message);
  }
};


  const sign_in=async({email , password}) => {
  console.log(email,password);
  try{
    const {data} = await Userapi.post('/api/login',{email,password});
    const checktoken=data.token;
    if(checktoken==null){
      console.log('error')
      dispatch({type:'not_auth'})
    }else{
      dispatch(
        {
          type:'loggin',
          payload:{
            token:data.token,
            user:data.user,
            status:'auth',
          }
        }
      )
      $token=data.token;
      await AsyncStorage.setItem('token',data.token);
      
      console.log($token);
    }
   
  }catch(error){
    console.log(error.response.data.error_response);
  }
   
  }

  const check_token=async()=>{
    const token = await AsyncStorage.getItem('token');
   

    console.log('hola soy el checktoken');
    console.log(token);
    if(token==null){
      dispatch({type:'not_auth'})
      console.log('hola soy el token nulo 2');
    }
    try{
      const {data} = await Userapi.get('/api/token/validate',{
        headers:{
          Authorization: `Bearer ${token}`,
        }
        
      })
      console.log('hola soy yo con tu token  ejejeje');
      token_user=data.token;
      console.log('tomaa::',token);
      console.log('tomaa user::',data.user);
      setuser(data.user);
      const storedLikedPosts = await AsyncStorage.getItem('likedPosts');
      setLikedPosts(JSON.parse(storedLikedPosts) || []);
      await getPosts();
      if(token!=null){
        const settoken = await AsyncStorage.setItem('token',token);
      }
      if(token== null) {
        return dispatch({type:'not_auth'});
        console.log('hola soy el token nulo 2');
    }
    dispatch({
      type: 'loggin',
      payload: {
          token:token,
          user:data.user,
          status:'auth'
      }
  });
    }catch(error){
      console.log(error);
    }
  }
  
  return (
    <Authcontext.Provider
      value={{
        name: 'name',
        getPosts,
        posts,
        sign_in,
        sign_up,
        like_post,
        log_out,
        likedPosts,
        getLikedPosts,
        check_token,
        user,
        dislike_post,
        ...state
      }}
    >
    {children}
    </Authcontext.Provider>
  );
};
