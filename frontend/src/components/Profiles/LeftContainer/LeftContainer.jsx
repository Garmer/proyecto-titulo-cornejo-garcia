import React from 'react'
import { Avatar } from 'antd'
import PropTypes from 'prop-types'

const LeftContainer = ({imageURL, nombre, emailLabel, rutLabel, email, rut}) => {

  return (

    <div style={{marginTop: '80px'}}>
      <div>
        <Avatar style={{ width: '100px', height: '100px' }} src={imageURL}/>
      </div>
      <h1>{nombre}</h1>
      <div style={{marginTop: '100px', marginBottom: '100px'}}>
        <h3>{emailLabel}</h3>
        <span className='private-profile-data'>
          {email}
        </span>
      </div>
      <div style={{marginBottom: '100px'}}>
        <h3>{rutLabel}</h3>
        <span className='private-profile-data'>
        {rut}
        </span>
      </div>
    </div>
  )
}

/* Props */

LeftContainer.propTypes = {
  imageURL: PropTypes.string,
  nombre: PropTypes.string,
  emailLabel: PropTypes.string,
  rutLabel: PropTypes.string,
  email: PropTypes.string,
  rut: PropTypes.string,
}

export default LeftContainer