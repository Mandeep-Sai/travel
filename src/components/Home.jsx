import React, { Component } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import data from "../data.json";
import { withRouter } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import "../styles/glide.core.min.css";
import "../styles/Home.css";

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      query: "",
    };
  }
  updateQuery = (e) => {
    this.setState({ query: e.target.value });
  };
  goToSearchPage = async () => {
    let response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${this.state.query}&inputtype=textquery&fields=photos,name,rating,geometry,place_id&key=AIzaSyD4uyl-mjRgfUwJ1K_rsWzNpjvMrxD8Ub0`
    );

    let parsedResponse = await response.json();
    let id = parsedResponse.candidates[0].place_id;
    this.props.history.push(`/search/${this.state.query}/${id}`);
  };
  componentDidMount = () => {};
  render() {
    return (
      <Container className="home" fluid>
        <div id="jumbotron">
          <p>Live with no excuses and travel with no regrets</p>
          <div id="searchBox">
            <input
              onChange={this.updateQuery}
              type="text"
              placeholder="Enter city or country"
            />
            <button onClick={this.goToSearchPage}>Search</button>
          </div>
        </div>
        <div id="bgimg">
          <img className="bgImg" src="https://i.imgur.com/E1zNNaX.jpg" alt="" />
        </div>

        <div id="content">
          <Container>
            <div id="stats">
              <div>
                <p>8000+</p>
                <p>satisfied travellers</p>
              </div>
              <div>
                <p>8000+</p>
                <p>satisfied travellers</p>
              </div>
              <div>
                <p>8000+</p>
                <p>satisfied travellers</p>
              </div>
              <div>
                <p>8000+</p>
                <p>satisfied travellers</p>
              </div>
            </div>
            <div id="favourites">
              <p>Favourite spots</p>
              <Row>
                {this.state.data.map((place) => {
                  return (
                    <Col>
                      <Card>
                        <Card.Img variant="top" src={place.bgImg} />
                        <Card.Body>
                          <Card.Title>{place.country}</Card.Title>
                          <Card.Text>{place.name}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
              <p>
                See more <BsArrowRight />
              </p>
            </div>
          </Container>
        </div>
      </Container>
    );
  }
}

export default withRouter(Home);
