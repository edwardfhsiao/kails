import React, { Component } from 'react';
import { connect } from 'react-redux';
import bowser from 'bowser';

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
    let { locale } = this.props;
    return(
      <div className="index-wrapper">
        <div className="index-intro">
          <div className="index-intro__header">
            <h1>
              {locale.site.edwardxiao}
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
  let { locale } = state;
  return { locale };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

Index.propTypes = {
  locale: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);