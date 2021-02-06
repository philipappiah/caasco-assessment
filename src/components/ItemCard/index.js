import React from 'react'
import PropTypes from 'prop-types'
import styles from './ItemCard.module.css'

const ItemCard = ({ name, image, id, handleClick, origin }) => (
  <button type="button" className={styles.item} onClick={() => handleClick(id)}>
    {
    image
      ? <div
      className={styles.image}
      alt={name}
      style={{ backgroundImage: `url(${image.url})` }}
    />
      : null
    }
    <div className={styles.content}>
      <div className={styles.title}>{name}</div>
      <div className={styles.from}>Country: {origin}</div>
    </div>
  </button>
)

ItemCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.object,
  id: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  origin: PropTypes.string.isRequired
}

export default ItemCard
