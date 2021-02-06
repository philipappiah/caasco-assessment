import React from 'react'
import PropTypes from 'prop-types'
import styles from './Detail.module.css'

class Detail extends React.Component {
    constructor (props) {
      super(props)
      this.state = { isModalOpen: false }
    }

    render () {
      return (
        <div>
          <button onClick={() => this.openModal()}>Open modal</button>
          <Modal isOpen={this.state.isModalOpen} onClose={() => this.closeModal()}>
            <h3>Modal title</h3>
            <p>Content</p>
          </Modal>
        </div>
      )
    }

    openModal() {
      this.setState({ isModalOpen: true })
    }

    closeModal() {
      this.setState({ isModalOpen: false })
    }
  }

  class Modal extends React.Component {
    render () {
      if (this.props.isOpen === false)
        return null

      return (
        <div>
          <div className={styles.modal}>
            {this.props.children}
          </div>
          <div className={styles.bg} onClick={e => this.close(e)}/>
        </div>
      )
    }

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose()
      }
    }
  }

  Detail.propTypes = {
    dogBreed: PropTypes.shape({
        image: PropTypes.object,
        name: PropTypes.string,
        weight: PropTypes.object,
        id: PropTypes.string,
        reference_url: PropTypes.string,
        origin: PropTypes.string,
        description: PropTypes.string
    })
};