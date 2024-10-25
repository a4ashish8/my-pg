import React from 'react'
import errorImg from '../../assets/images/error-img.png';

const Error = () => {
  return (
    <div className="my-5 pt-5">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full text-center mb-5">
            <h1 className="text-7xl font-semibold">
              4<span className="text-primary mx-2">0</span>4
            </h1>
            <h4 className="uppercase">Sorry, page not found</h4>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full md:w-5/6 xl:w-4/6">
            <div>
              <img
                src={errorImg}  // Correct usage without curly braces around the variable
                alt="Error"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error
