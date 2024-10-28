const apirequest = async(url = '',optionsObj= null,errormsg= null) =>{
    try{
        const response = await fetch(url,optionsObj)
        if(!response.ok){
            throw Error("please reload the website")
        }
    }catch(err){
        errormsg=err.message
    }finally{
        return errormsg
    }
}

export default apirequest