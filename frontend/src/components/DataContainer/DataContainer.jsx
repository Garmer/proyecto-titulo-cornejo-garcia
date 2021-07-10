import React from 'react'
import PropTypes from 'prop-types'

const DataContainer = ({description, value}) => {

  return (
    <>
      <div className='private-profile-data-container'>
        <span style={{fontWeight: 'bold', display: 'block', textAlign: 'center', marginTop: '20px', color: 'white'}}>
          {description}
        </span>
        <span style={{fontWeight: 'bold', color: 'white', display: 'block', textAlign: 'center'}}>
          {value}
        </span>
      </div>
    </>
  )
}

/* Props */

DataContainer.propTypes = {
  description: PropTypes.string,
  value: PropTypes.string,
}

export default DataContainer