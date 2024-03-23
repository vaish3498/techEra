import {Component} from 'react'
import TailSpin from 'react-loader-spinner'
import Header from '../Header'
import Course from '../Course'

import './index.css'

class Home extends Component {
  state = {isLoading: true, isFailed: false, isSuccess: false, courseList: {}}

  componentDidMount() {
    this.getCourseList()
  }

  getCourseList = async () => {
    const response = await fetch('https://apis.ccbp.in/te/courses')
    const data = await response.json()
    console.log(data)

    if (response.ok) {
      const updateData = data.courses.map(each => ({
        id: each.id,
        name: each.name,
        logoUrl: each.logo_url,
      }))
      console.log(updateData)
      this.setState({
        isLoading: false,
        isSuccess: true,
        isFailed: false,
        courseList: updateData,
      })
    } else {
      this.setState({
        isLoading: false,
        isSuccess: false,
        isFailed: true,
      })
    }
  }

  render() {
    const {isLoading, isSuccess, isFailed, courseList} = this.state

    return (
      <div>
        <Header />
        <div>
          {isLoading && (
            <div data-testid="loader" className="spinner">
              <TailSpin
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          )}
          {isSuccess && (
            <div className="itemDetails">
              <h1>Courses</h1>
              <ul>
                {courseList.map(each => (
                  <Course key={each.id} details={each} />
                ))}
              </ul>
            </div>
          )}
          {isFailed && (
            <div>
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
                  alt="failure view"
                />
              </div>
              <h1>Oops! Something Went Wrongs </h1>
              <p>We cannot seem to find the page you are looking for </p>
              <div>
                <button type="button" onClick={this.getCourseList}>
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home
