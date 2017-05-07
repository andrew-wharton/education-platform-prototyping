/**
 *
 * @type {Object}
 */
export default ModalDefaults = Object.freeze({
  modalStyle: {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      right: '1rem',
      bottom: '1rem',
      border: 'none',
      background: '#fff',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '0',
      outline: 'none',
      padding: '0'
    }
  }
});