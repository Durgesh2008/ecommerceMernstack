import axios from "axios";
export const emailChecker=async (email:string)=>{
    try {
        const {data} = await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=ab6f829bd6fb4894ada85350b452219d&email=${email}`)
       console.log(data)
       return data.is_smtp_valid?.value
    } catch (error) {
        console.log(error)
        return false
    }
}
export const PhoneChecker=async (phone:any)=>{
    try {
        const {data} = await axios.get(`https://phonevalidation.abstractapi.com/v1/?api_key=0b225e75dd124d35bd3f5c739fd8c5ab&phone=${phone}`)
       console.log(data)
       return data.valid
    } catch (error) {
        console.log(error)
        return false
    }
}