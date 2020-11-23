// import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Loader from './Loader'


const Giphy = () => {

const [data, setData]= useState([]);
const [search, setSearch]=useState('');
const [isLoading, setLoading]= useState(false);
const [isError, setIsError]=useState(false);
useEffect(()=>{
    const fetchData= async () => {

        setIsError(false)
        setLoading(true);

        try{
  const results= await axios('http://api.giphy.com/v1/gifs/trending', 
    {
        params:{
        api_key: '6Dqcmn20gk4XF0DRlb1ad964Zx1NpnNl',
        limit: 1000
    }}
    
    );
    console.log(results);

setData(results.data.data);
        } catch(err){
            setIsError(true);
            setTimeout(() => setIsError(false),4000);
        }

setLoading(false);
};


    fetchData();


}, [] );

const renderGifs= () => {
    //if is loading is true then show loading else shows gifs
    if(isLoading){
        return <Loader/>;
    }
    return data.map(el => {
        return ( 
        <div key={el.id} className='gif'>
             <img src={el.images.fixed_height.url} alt='img'/>
        </div>
        );
    });
};
const renderError = () => {
    if(isError){
        return (
            <div
             className="alert alert-danger alert-dismissible fade show"
              role='alert'> 
            Unable to get Gifs, please try again in a few minutes button. </div>
        );
    }
};
const handleSearchChange = event => {
    setSearch(event.target.value);
};

const handleSubmit = async event =>{
event.preventDefault();
setIsError(false);
setLoading(true);


try{
  //async because of await
  const results= await axios('https://api.giphy.com/v1/gifs/search', {
    params: {
        api_key: '6Dqcmn20gk4XF0DRlb1ad964Zx1NpnNl',
        q: search,
        limit: 1000
    }

});
setData(results.data.data);
} catch (err){
    setIsError(true);
    setTimeout(() => setIsError(false),4000);
}
  

    
    setLoading(false);


}



    return( 
    <div className='m-2'>{renderError()}
    <form className='form-inline justify-content-center m-2'>
        <input onChange={handleSearchChange} type='text' placeholder='search' className=' col-4 form-control' 
        value={search}/>
<button type='submit' onClick={handleSubmit} className='btn col-1 btn-success mx-2'> Go </button>
        
         </form>
    <div className='container gifs'>{renderGifs()}</div>
    </div>
    );
};

export default Giphy;