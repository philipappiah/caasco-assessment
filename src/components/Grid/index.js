import React from 'react'
import PropTypes from 'prop-types'
import styles from './Grid.module.css'
import ItemCard from '../ItemCard'

const Grid = ({ items, handleClick }) => (
    <div className={styles.grid}>
        {items.map(item => (
            <ItemCard handleClick={handleClick} key={item.id} {...item} />
        ))}
    </div>
)

Grid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleClick: PropTypes.func.isRequired
}

export default Grid
