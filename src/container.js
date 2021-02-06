import React, { Component } from 'react'
import Grid from './components/Grid'
import { fetchDogBreeds } from './api'

class Container extends Component {
  state = {
    page: 0,
    dogBreeds: [],
    initialDogBreeds: [],
    isLoading: false,
    moreExists: true,
    breedId: ''
  };

  componentDidMount = () => {
    this.fetchDogBreedsFromApi(this.state.page)
  };

  fetchDogBreedsFromApi = (page) => {
    this.setState({ isLoading: true })
    fetchDogBreeds(page).then((response) => {
      if (response.length) {
        this.setState({ dogBreeds: [...this.state.dogBreeds, ...response], initialDogBreeds: [...this.state.dogBreeds, ...response], isLoading: false })
      } else {
        this.setState({ moreExists: false, isLoading: false })
      }
    }).catch(err => {
      console.log(err)
    })
  }

  fetchFromNextPage = () => {
    var page = this.state.page + 1
    this.fetchDogBreedsFromApi(page)
    this.setState({ page: this.state.page + 1 })
  }

  showDetails = async (id) => {
    this.setState({
      breedId: id
    })
  }

  render () {
    const { isLoading, dogBreeds, moreExists } = this.state
    return (
      <div className='layout'>
        {dogBreeds.length !== 0 && (
          <Grid items={dogBreeds} handleClick={this.showDetails} />
        )}
        {dogBreeds.length === 0 && !moreExists && (
          <div>No more dog breeds found.</div>
        )}

        {moreExists && (
          <button
            type='button'
            className='button container-text'
            onClick={this.fetchFromNextPage}
          >
            Load more
          </button>
        )}
        {isLoading && <div className='container-text'>Loading...</div>}
      </div>
    )
  }
}

export default Container
