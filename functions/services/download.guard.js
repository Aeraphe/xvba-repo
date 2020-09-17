module.exports= function check(pack,userId){
    if(pack[0].public){
        return true;
    }else{
        //Check if the package is user owner
        if(pack[0].user_id === userId){
            return true
        }
        return false
    }
}