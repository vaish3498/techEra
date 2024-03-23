import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Course extends Component {
  render() {
    const {details} = this.props
    const {id, name, logoUrl} = details

    return (
      <Link to={`courses/${id}`}>
        <li className="list-item">
          <div className="image-container">
            <img src={logoUrl} alt={name} className="image" />
          </div>
          <p className="name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default Course
