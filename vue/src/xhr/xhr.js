 let xhr = {
   setUri: (strUri, type) => {
     if (k.util.vali.url(strUri) || strUri.substr(strUri.indexOf('.')) === '.json') {
       return strUri
     }

     let uriType = type || strUri.split('/')[0]
     let uriPath = k.config.api[uriType] || ''
     return uriPath + strUri
   }
 }
 export default xhr
