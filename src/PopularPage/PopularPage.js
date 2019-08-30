import React from "react";
import Collection from "../Collection/Collection";
import { Link } from "react-router-dom";

class PopularPage extends React.Component {
  state = {
    page: this.props.match.params.id,
  };
  previousPage() {
    this.state.page > 1 &&
      this.setState({ page: parseInt(this.props.match.params.id) - 1 });
  }
  nextPage() {
    this.setState({ page: parseInt(this.props.match.params.id) + 1 });
  }
  render() {
    return (
      <div>
        <div>
          <Collection
            page={this.state.page}
            sortType="popularity.desc"
            collectionName="Popular"
            itemLink="/"></Collection>
        </div>
        <div className="link-container">
          <div className="link-div-container">
            <div className="previous-container">
              <Link
                className="previous"
                onMouseDown={this.previousPage.bind(this)}
                to={"/popular/" + this.state.page}>
                Previous
              </Link>
            </div>
            <div className="next-container">
              <Link
                className="next"
                onMouseDown={this.nextPage.bind(this)}
                to={"/popular/" + this.state.page}>
                Next
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PopularPage;
