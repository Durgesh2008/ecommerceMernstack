import bcrypt from "bcrypt";
export const  hashedPassword=async(password)=>{
    try {
        const saltRounds = 10;
        const hashPassword=await bcrypt.hash(password,saltRounds);
        return hashPassword;
    } catch (error) {
        console.log("error in hashedPassword present in Helper ")
    }
}


export const  comparePassword=async(password,hashPassword)=>{
    try {
        const saltRounds = 10;
        const compare_Password=await bcrypt.compare(password,hashPassword);
        return compare_Password;
    } catch (error) {
        console.log("error in hashedPassword present in Helper ")
    }
}