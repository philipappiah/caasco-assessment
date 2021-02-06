import React from 'react'
import PropTypes from 'prop-types'
import styles from './Detail.module.css'

class Detail extends React.Component {
  render () {
    const { dogBreed, openModal } = this.props
    return (
      <div>
        <Modal isOpen={openModal} onClose={this.closeModal}>
          <div className={styles.container}>
            <div className={styles.detail}>
              {dogBreed.image
                ? (
                <div
                  className={`${styles.image} ${styles.element}`}
                  style={{ backgroundImage: `url(${dogBreed.image.url})` }}
                />
                  )
                : null}

              <div className={`${styles.title} ${styles.element}`}>
                {dogBreed.name}
              </div>

              <ul className={`${styles.s1}`}>
                <li>From: {dogBreed.origin}</li>
                {dogBreed.life_span
                  ? (
                  <li>Life Span: {dogBreed.life_span} years</li>
                    )
                  : null}

                {dogBreed.energy_level
                  ? (
                  <li>Energy Level: {dogBreed.energy_level}</li>
                    )
                  : null}

                {dogBreed.dog_friendly
                  ? (
                  <li>Dog Friendly: {dogBreed.dog_friendly}</li>
                    )
                  : null}
              </ul>

              {dogBreed.description
                ? (
                <div className={styles.summary} >
                <b>Description:</b>
                <br/>
                <p >{dogBreed.description}</p>
                </div>
                  )
                : null}

              <a
                href={dogBreed.wikipedia_url}
                className={`${styles.element} ${styles.link} button`}
              >
                Read more about this breed
              </a>
              <button
                type="button"
                className={`${styles.button} -dark center`}
                onClick={this.closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

  closeModal = () => {
    this.props.closeModal()
  }
}

class Modal extends React.Component {
  render () {
    if (this.props.isOpen === false) return null

    return (
      <div>
        <div className={styles.modal}>{ this.props.children }</div>
        <div className={styles.bg} onClick={(e) => this.close(e)} />
      </div>
    )
  }

  close = (e) => {
    e.preventDefault()
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
}

Detail.propTypes = {
  dogBreed: PropTypes.shape({
    image: PropTypes.object,
    name: PropTypes.string,
    weight: PropTypes.object,
    id: PropTypes.string,
    wikipedia_url: PropTypes.string,
    origin: PropTypes.string,
    description: PropTypes.string,
    life_span: PropTypes.string,
    energy_level: PropTypes.number,
    dog_friendly: PropTypes.number

  }),
  openModal: PropTypes.bool,
  closeModal: PropTypes.func
}
export default Detail
