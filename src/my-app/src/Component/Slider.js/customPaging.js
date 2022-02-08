
import Slider from "react-slick";
/* import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; */

import { generatePublicUrl } from "../../urlconfig";
import './index.css'
const CustomPaging = ({photo,title}) => {
      /*   customPaging: function(i) {
          return (
            <div>
              <img style={{width:'50px',height:'50px'}} src={generatePublicUrl(photo[i])} alt="ok" />
            </div>
          );
        }, */
       /*  const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1
        };
      return (
        <div>
          <h2>Room Photo</h2>
          <Slider {...settings}>
            <div>
              {photo.map(imgg=>
                <img key={imgg} src={generatePublicUrl(imgg)} alt="ok"/>
              )}
            </div>
          </Slider>
        </div>
      ); */

      const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: function(i) {
          return (
            <div>
              <img style={{width:"50px",height:"50px",objectFit:'cover',borderRadius:'10px'}} src={generatePublicUrl(photo[i])} alt="ok" />
            </div>
          );
        },
        dotsClass: "slick-dots slick-thumb",
      };
      return (
        <div>
          <h2 style={{textAlign: 'center'}}> {title}</h2>
          <Slider {...settings}>
              {photo?.map(imgg=>
               <div key={imgg}>
                <img style={{width:'100%',height:'60vh'}} key={imgg} src={generatePublicUrl(imgg)} alt="ok"/>
                </div>
              )}
          </Slider>
        </div>
      );
}
export default CustomPaging;