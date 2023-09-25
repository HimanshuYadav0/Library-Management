import { Card } from '../cards';
import '../../css/card.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { BallTriangle, TailSpin } from 'react-loader-spinner'


export const CardsPanel = ({ data }) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4.5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }
  const bookList = data.map((book, index) =>
    <tr key={book._id}>
      <th scope="row" ></th>
      <Card data={book}
      />
    </tr>)
  return (
    <div className='tops'>

      <div className='row'>
        { }
        {data.length == 0 ? <TailSpin color="#00BFFF" height={80} width={80} /> : <>
          <h5 className='category'>{data[0].category}</h5>
          <Carousel responsive={responsive}
            draggable={false}
            swipeable={false}
            autoPlay={false}
            autoPlaySpeed={10000000000}
          >


            {bookList}

          </Carousel>
        </>}
      </div>
      <hr />
    </div>
  )
}