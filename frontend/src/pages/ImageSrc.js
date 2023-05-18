import React, { useEffect, useState } from 'react'
import axios from '../api/axios'

const ImageSrc = (props) => {
  const [image, setimage] = useState()
  useEffect(() => {
    const f = async () => {
      if (!props || !props.url || props.url === '') {
        return null
      }
      const response = await axios.get(props.url)
      setimage(response.data)
    }
    f()
    return () => {

    };
  }, [])
  return (
    <>
      {
        (image) ?
          (props.instyle) ?
            <img
              src={image}
              style={props.instyle}
            /> :
            <img
              src={image}
            /> : <img
            alt='image'
          />
      }
    </>
  )
}

export default ImageSrc