import axios from 'axios';
import {useEffect, useState,useContext} from 'react'
import { SHOPCONTAEXT } from '../../context/Shopcontext';

const useCoords = () => {
  
   
        const [lat, setlat] = useState<number >(0)
        const [lon,setlon]=useState<number >(0)
        const context=useContext(SHOPCONTAEXT)
        const getlocation=async()=>{
      try {
        const res=await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
       const resdata=await res.data;
       context?.setlocation(resdata.display_name)
       
      } catch (error) {
        console.log("error in location ")
      }

        }
        useEffect(()=>{
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    setlat(position.coords.latitude)
                    setlon(position.coords.longitude)
                   
                  });
            }else{
                alert("Loaction is not supported in the browser")
            }
         if(lat!==0 && lon!==0) {
            getlocation();
         }  
                  
        },[lat,lon])

}

export default useCoords 