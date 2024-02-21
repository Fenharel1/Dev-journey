import PropTypes from 'prop-types';
import {Title} from './components/Title'
import { UserDetails } from './components/UserDetails'

export function HelloWorldApp(props){
  return ( 
  <>
    <Title title='Hola mundo titulo' ></Title>
    <UserDetails user={{name:'Julian', age: 12}} ></UserDetails>
  </>
  )
}

HelloWorldApp.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string,
  age: PropTypes.number
}

HelloWorldApp.defaultProps = {
  title: 'Nuevo mundo'
}