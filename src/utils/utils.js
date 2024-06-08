export const transformQueryString = (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

  export const removeDuplicates =  (obj)=>{
    Object.keys(obj).forEach((key) =>
      obj[key] === undefined ? delete obj[key] : {}
    );
    return obj
  }  