import React, { Component } from 'react'
import Grid from './components/Grid'
import Filter from './components/Filter'
import Detail from './components/Detail'
import { fetchDogBreeds } from './api'

class Container extends Component {
  state = {
    page: 0,
    dogBreeds: [],
    initialDogBreeds: [],
    isLoading: false,
    moreExists: true,
    openModal: false,
    detailBreedId: '',
    filterValue: '',
    selectedDogBreed: ''
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

  showDetails = (id) => {
    this.setState({
      selectedDogBreed: this.state.dogBreeds.filter(breed => breed.id === id)[0],
      detailBreedId: id,
      openModal: true
    })
  }

  closeModal = () => {
    this.setState({ openModal: false })
  }

  searchByFilter = (value) => {
    this.setState({ filterValue: value })
    this.showFilteredBreeds(value)
  }

  showFilteredBreeds = (value) => {
    this.setState({ dogBreeds: this.state.initialDogBreeds.filter(breed => breed.name.toLowerCase().includes(value.toLocaleLowerCase())) })
  }

  render () {
    const { isLoading, dogBreeds, moreExists, filterValue, selectedDogBreed, openModal } = this.state
    return (
      <div className="layout">
        <Filter handleChange={this.searchByFilter} filter={filterValue} />
        {dogBreeds.length !== 0 && (
          <Grid items={dogBreeds} handleClick={this.showDetails} />
        )}
        {dogBreeds.length === 0 && !moreExists && (
          <div>No more dog breeds found.</div>
        )}

        {moreExists && (
          <div className="button-wrap">
            <button
              className="rad-button light gradient"
              onClick={this.fetchFromNextPage}
            >
              Load more
            </button>
          </div>
        )}
        {isLoading && <div className="container-text">Loading...</div>}
        {selectedDogBreed && (
          <Detail
            dogBreed={selectedDogBreed}
            openModal={openModal}
            closeModal={this.closeModal}
          />
        )}
      </div>
    )
  }
}

export default Container
