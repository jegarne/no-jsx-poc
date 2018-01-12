import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import NoJSX from 'react-nojsx';
import Helmet from 'react-helmet';
import {Grid, Row, Col} from 'react-bootstrap';
import JSONEditor from './components/JSONEditor';
import PageBuilder from './components/PageBuilder';

class App extends Component {
  constructor(props) {
    super(props);

    const templateJson = {
      description: "Page Body",
      type: 'div',
      props: {
        className: 'App-body'
      },
      children: [
        {
          description: "Header",
          type: 'h2',
          props: {
            className: ''
          },
          children: 'This is the header text'
        }, {
          description: "Content",
          type: 'p',
          children: 'This is your content.'
        }, {
          description: "A p tag to hold a link",
          type: 'p',
          children: [
            {
              description: "A link",
              type: 'a',
              props: {
                href: "http://www.stifel.com",
                target: "_blank"
              },
              children: "stifel.com"
            }
          ]
        }, {
          description: "An image",
          type: 'img',
          props: {
            src: "https://pbs.twimg.com/profile_images/907658468898861057/HLNNoMPm.jpg",
            alt: "Stifel Logo",
            height: "120"
          }
        }
      ]
    };

    this.state = {
      pageJson: templateJson
    };

    this.onJsonChange = (key, value, parent, data) => {
      if (value === '')
        return;
      let pageJson = Object.assign({}, this.state.pageJson); //creating copy of object
      pageJson = data; //updating value
      this.setState({pageJson});
    }

  } // end constructor

  render() {
    return <div>
      <Grid>
        <Row>
          <Col xs={12} md={4} lg={4} lgPull={2}>
            <h2>Proof of Concept</h2>
            <p>The editor below is bound to a JSON object that describes the template component DOM, styling and content.
            </p>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <h3>Rendered Component</h3>
            <p>The JSON is parsed into javascript which is executed on the page and renders the HTML you see below.</p>
          </Col>
        </Row>
        <Row >
          <Col xs={12} md={4} lg={3} lgPull={2}>
            <h3>Editor</h3>
            <hr/>
            <JSONEditor data={this.state.pageJson} onChange={this.onJsonChange}/>
          </Col>
          <Col xs={12} md={8} lg={9}>
            <h3>Example CMS Component</h3>
            <hr/>
            <PageBuilder json={this.state.pageJson}/>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
}

export default App;
