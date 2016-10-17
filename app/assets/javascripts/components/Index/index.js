import React, { Component } from 'react';
import { connect } from 'react-redux';
import bowser from 'bowser';
import {
  fetchArticles
} from './actions/index';

// import NewsItem from './NewsItem/index';
class Index extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }
  fetchArticles(page){
    this.props.fetchArticles(page);
  }

  render() {
    return(
    <div className="index-wrapper">
      <div className="index-intro">
        <div className="index-intro__header">
          <h1>
            ewifoewfuhj
          </h1>
        </div>
      </div>
      <div className="index-section">
        dfwderfer
      </div>
    </div>
    );
  }
}

function mapStateToProps(state) {
  let { articleList, currentPage, totalPages } = state;
  return { articleList, currentPage, totalPages };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchArticles: (page) => {
      dispatch(fetchArticles(page));
    }
  };
}

Index.propTypes = {
  fetchArticles: React.PropTypes.func.isRequired,
  articleList: React.PropTypes.array.isRequired,
  currentPage: React.PropTypes.number.isRequired,
  totalPages: React.PropTypes.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);