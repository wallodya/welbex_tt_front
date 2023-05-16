import React from 'react'
import Button from '../ui/Button'

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-screen grid grid-cols-main shadow shadow-gray-900 py-3 bg-gray-800'>
        <div className='w-full h-fit col-start-2 flex justify-end'>
            <Button>
                Sign-in
            </Button>
        </div>
    </div>
  )
}

export default Header