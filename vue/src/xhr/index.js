import ajax from './ajax'
import axois from './axois'
let kXhr = {}
if (k.util.vali.isEmpty(Promise)) {
  kXhr = ajax
} else {
  kXhr = axois
}
// console.log(kXhr)
export default kXhr
