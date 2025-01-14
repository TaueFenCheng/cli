function _instanceof(target,Fn) {
    if((typeof target!=='object' && typeof target !== 'function') || typeof target === null){
        return false
    }

    let proto = target._proto_
    while(proto){
        if(!proto){
            return false
        }
        if(proto === Fn.prototype){
            return true
        }
        proto = proto._proto_
    }
}