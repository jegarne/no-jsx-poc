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

    const headerJson = {
      description: "Page Header",
      type: 'div',
      props: {
        className: 'App-header'
      },
      children: [
        {
          description: "Header Title",
          type: 'h1',
          props: {
            className: 'App-title'
          },
          children: 'This is your page header.'
        }, {
          description: "SubHeader Text",
          type: 'p',
          children: 'This is your subheader'
        }
      ]
    };

    const bodyJson = {
      description: "Page Body",
      type: 'div',
      props: {
        className: 'App-body'
      },
      children: [
        {
          description: "Body Header",
          type: 'h2',
          props: {
            className: ''
          },
          children: 'This is your page body'
        }, {
          description: "Body Content",
          type: 'p',
          children: 'This is your content.'
        }, {
          description: "Link p tag",
          type: 'p',
          children: [
            {
              description: "Link",
              type: 'a',
              props: {
                href: "http://www.stifel.com",
                target:"_blank"
              },
              children: "stifel.com"
            }
          ]
        }, {
          description: "Body image",
          type: 'img',
          props: {
            src: "https://pbs.twimg.com/profile_images/907658468898861057/HLNNoMPm.jpg",
            alt:"Stifel Logo",
            height:"120"
          }
        }
      ]
    };

    const footerJson = {
      description: "Footer",
      type: 'div',
      props: {
        className: 'App-footer'
      },
      children: [
        {
          type: 'hr'
        }, {
          description: "Footer text",
          type: 'p',
          props: {
            className: ''
          },
          children: 'This is your footer'
        }, {
          description: "Footer text",
          type: 'p',
          children: '&#169; Stifel, disclaimers and stuff'
        }
      ]
    };

    const components = [headerJson, bodyJson, footerJson]

    const pageTemplateJson = {
      description: 'page container',
      props: {
        className: 'container'
      },
      type: 'div',
      children: [
        ...components, {
          description: 'page title',
          props: {
            title: "My Title"
          },
          type: Helmet
        }
      ]
    };

    this.state = {
      pageJson: pageTemplateJson
    };

    this.onJsonChange = (key, value, parent, data) => {
      if(value === '') return;
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
            <h2>CMS Proof of Concept</h2>
            <p>The page below is built dynamically from metadata stored in a JSON file. Clearly we would want a more user-friendly way of editing the metadata than this.
            </p>
          </Col>
          <Col xs={12} md={8} lg={8}>
            <h3>Advantages</h3>
            <ul>
              <li>It's possible to modularize the json metadata into components for reuse.</li>
              <li>Your editor will output one complete JSON file that represents a complete page - this means you've got a clear, compact way of moving a page through an approval process and into production without a lot of additional complexity.
              </li>
            </ul>
          </Col>
        </Row>
        <Row >
          <Col xs={12} md={3} lg={2} lgPull={2}>
            <h3>Editor</h3>
            <p>Change values below to update the page.</p>
            <JSONEditor data={this.state.pageJson} onChange={this.onJsonChange}/>
          </Col>
          <Col xs={12} md={9} lg={10}>
            <h3>Rendered Page</h3>
            <PageBuilder json={this.state.pageJson}/>
          </Col>
        </Row>
      </Grid>
    </div>;
  }
}

export default App;
