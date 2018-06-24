function ip(uuid, addr){
  if( !global.misaka.data.connect[uuid] ) return false;
  if( global.misaka.data.connect[uuid].ip == addr) return true;
  return false;
}

module.exports = {
  ip: ip
};