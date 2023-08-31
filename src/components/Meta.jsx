import React from 'react'
import { Helmet } from 'react-helmet'
function Meta({title}) {
  return (
    <Helmet>
        <meta charSet='UTF-8'/>
        <title>{title}</title>
        <meta name="description" content={title} />
    </Helmet>
  )
}

export default Meta