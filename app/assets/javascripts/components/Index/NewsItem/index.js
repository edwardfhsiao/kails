import React, { Component } from 'react';
import { Link } from 'react-router';
import MyLoader from '../../../common/my_loader';
let myLoader = new MyLoader();

class NewsItem extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initImageLoader(this.props.index);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.item.id !== this.props.item.id) {
     this.initImageLoader(this.props.index);
    }
  }

  initImageLoader(index) {
    myLoader.initLazyLoadingImage('b-lazy-id-' + index, 'loader-' + index, {color:'#000', lines: 12});
  }

  render() {
    let { item, currentPage, index } = this.props;
    return(
      <li>
        {/*<Link to={`/news.html/${item.id}/${currentPage}`} className='img image-container'>*/}
        <Link to={`/${item.id}/${currentPage}`} className='img image-container'>
          <div id={`loader-${index}`} className='spin-loader'></div>
          <img
            id={`b-lazy-id-${index}`}
            className='b-lazy'
            data-src={item.thumbnail}
            src='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
            alt={item.title}
          />
        </Link>
        <div className='b-introduce'>
          <Link to={`/news/${item.id}/${currentPage}`} className='title'>
            {item.title}
          </Link>
          <div className='introduce'>
            {item.preface}
          </div>
        </div>
      </li>
    );
  }
}

NewsItem.propTypes = {
  index: React.PropTypes.number.isRequired,
  item: React.PropTypes.object.isRequired,
  currentPage: React.PropTypes.number.isRequired
}

export default NewsItem;