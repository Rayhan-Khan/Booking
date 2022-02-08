import { Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";

const pagination = (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const room =useSelector(state=>state.Room)
    const page=Math.ceil(room.count/20);

let items = [];
for (let number = 1; number <= page; number++) {
  items.push(
    <Pagination.Item onClick={()=>props.pagecalc(number)} key={number} active={number === props.skip+1}>
      {number}
    </Pagination.Item>,
  );
}
return <div style={{ display: "flex", margin:'10px 50% 5px 50%'}}>
    <Pagination>{items}</Pagination>
</div>

 
}
export default pagination;