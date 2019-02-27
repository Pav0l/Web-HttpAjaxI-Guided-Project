import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import axios from 'axios';


const StyledContainer = styled.div`
  padding: 20px;
  height: 100%;

  nav {
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
  }
`;

export default class Container extends React.Component {
  state = {
    person: null,
    // there are two states that we're interested in
    // when we're doing AJAX requests
    error: null,
    loading: false,
  }

  componentDidMount() {
    this.fetchPerson();
  }

  fetchPerson = () => {
    this.startSpinner();

    /*
    JQUERY FETCHING
    // .ajax method takes configuration object as arg
    $.ajax({
      url: 'http://demo9359867.mockable.io/',
      success: this.setPerson,
      // JQUERY error returns an object witch bunch of stuff,
      // so you need to call it specifically (err.statusText)
      error: err => this.setError({ message: err.statusText }),
    });
    */

    /*
    AXIOS FETCHING
    axios.get('http://demo9359867.mockable.io/')
    // axios.get returns Promise OBJECT, so we need to .then it
    // the object contains data object, so we need to pass it in
    // axios is also parsing the JSON data for you
    .then(person => this.setPerson(person.data))
    .catch(this.setError);
   */

    /*
    STANDARD JAVASCRIPT FETCH METHOD
    fetch('http://demo9359867.mockable.io/')
      .then(data => data.json())
      .then(data => this.setPerson(data))
    // the above is the same as code below:
    // .then(this.setPerson);
      .catch(this.setError);
    */
    this.fakeFetchPerson()
      .then(this.setPerson)
      .catch(this.setError);
  }

  // this is returning new Promise right away
  fakeFetchPerson = () => {
    // Promise takes two arguments - resolve(request resolved succesfully)
    // and reject(request failed)
    return new Promise((resolve, reject) => {
      if ((Math.floor(Math.random() * 2)) % 2 === 0) {
        resolve({ id: '1', name: 'Samar', age: 25 });
      } else {
        reject({ message: 'This failed sooo much.' });
      }
    });
  }

  setPerson = person => {
    // need to stop the loading render so we can display content
    this.stopSpinner();
    this.setState({ person });
  }

  setError = error => {
    console.dir(error);
    // need to stop the loading render so we can display error msg
    this.stopSpinner();
    this.setState({ error });
  }

  startSpinner = () => this.setState({ loading: true });

  stopSpinner = () => this.setState({ loading: false });

  render() {
    if (this.state.loading) {
      return (
        <StyledContainer>
          Loading...
        </StyledContainer>
      );
    }

    if (this.state.error) {
      return (
        <StyledContainer>
          ARGH! This failed miserably. {this.state.error.message}
        </StyledContainer>
      );
    }

    return (
      <StyledContainer>
        {
          this.state.person && (
            <div>
              <div>Name: {this.state.person.name}</div>
              <div>Age: {this.state.person.age}</div>
            </div>
          )
        }
      </StyledContainer>
    );
  }
}
