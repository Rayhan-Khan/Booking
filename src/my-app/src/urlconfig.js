//export const api='http://localhost:2000/';
export const api='https://bookinyourgroom.herokuapp.com/api/';
const st='https://bookinyourgroom.herokuapp.com/'
export const generatePublicUrl=(fileName)=>{
    return `${st}public/uploads/${fileName}`;
}