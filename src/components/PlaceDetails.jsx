import React, { Component } from "react";
import { Container } from "react-bootstrap";
import "../styles/PlaceDetails.css";

export class PlaceDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: "",
      pics: "",
      placeDetails: "",
    };
  }
  componentDidMount = async () => {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=things+to+do+in+${this.props.match.params.place}&language=en&key=AIzaSyD4uyl-mjRgfUwJ1K_rsWzNpjvMrxD8Ub0`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
      }
    );
    let picsResponse = await fetch(
      `https://pixabay.com/api/?key=18014936-3601c4649f1d1b89b728d7713&q=${this.props.match.params.place}&image_type=photo&pretty=true`
    );
    let placeDetailsResponse = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.props.match.params.id}&key=AIzaSyD4uyl-mjRgfUwJ1K_rsWzNpjvMrxD8Ub0`,
      {
        method: "POST",
        headers: new Headers({
          "content-type": "application/json",
        }),
      }
    );
    let parsedPicsResponse = await picsResponse.json();
    let parsedResponse = await response.json();
    let parsedPlaceDetailsResponse = await placeDetailsResponse.json();
    console.log(parsedResponse);
    this.setState({
      places: parsedResponse.results,
      pics: parsedPicsResponse.hits,
      placeDetails: parsedPlaceDetailsResponse.result,
    });
  };
  render() {
    return (
      <>
        <Container className="placeDetails" fluid>
          {this.state.places.length > 0 ? (
            <>
              <img src={this.state.pics[0].largeImageURL} alt="" />
              <p id="title">{this.state.placeDetails.name}</p>
              <div id="packages">
                <p>Tour Packages</p>
                <button>Explore {this.state.placeDetails.name}</button>
              </div>
            </>
          ) : null}
        </Container>
      </>
    );
  }
}

export default PlaceDetails;
