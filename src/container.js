import React, { Component } from 'react'
import Grid from './components/Grid'
import Filter from './components/Filter'
import Detail from './components/Detail'
import Styles from './Container.module.css'
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
    var page = this.state.page + 1 // make a call to the next page when the load more button has been triggered
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
        {/* filter form */}
        <Filter handleChange={this.searchByFilter} filter={filterValue} />
        {/* Items grid component */}
        {dogBreeds.length !== 0 && (
          <Grid items={dogBreeds} handleClick={this.showDetails} />
        )}
        {dogBreeds.length === 0 && !moreExists && (
          <div>No more dog breeds found.</div>
        )}

        {/* disable load more button if no more data is left */}
        {moreExists && (
            <button
              className={`${Styles.button} -blue center`}
              onClick={this.fetchFromNextPage}
            >
              Load more
            </button>
        )}
        {isLoading && <div className="container-text">Loading...</div>}
        {/* show detail view modal on item selected */}
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
