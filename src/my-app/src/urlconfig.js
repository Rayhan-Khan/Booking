/* export const api='http://localhost:2000/api'; */
//export const api='https://bookingnow.herokuapp.com/api/';
//const st='https://bookingnow.herokuapp.com/'
//const st='http://localhost:2000/'
/* export const generatePublicUrl=(fileName)=>{
    return `${st}public/uploads/${fileName}`;
} */

export const api='/api';
export const generatePublicUrl=(fileName)=>{
    return `/public/${fileName}`;
}