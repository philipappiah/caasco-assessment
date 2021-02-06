import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './Filter.module.css'

class Filter extends Component {
  handleChange = (event) => {
    this.props.handleChange(event.target.value)
  }

  clearFilter = () => {
    this.props.handleChange('')
  }

  render () {
    return (
      <div className={styles.searchWrapper}>
        <form>
          <input
            type='text'
            name='focus'
            value={ this.props.filter}
            className={styles.searchBox}
            onChange={this.handleChange}
            placeholder='Filter By Breed Name'
          />
          <button className={styles.closeIcon} type='button' onClick={this.clearFilter}></button>
        </form>
      </div>
    )
  }
}

Filter.propTypes = {
  filter: PropTypes.string,
  handleChange: PropTypes.func.isRequired
}

export default Filter
