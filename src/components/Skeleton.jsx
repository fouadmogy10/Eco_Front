import React from 'react'
import { Col } from 'react-bootstrap'
import ContentLoader from 'react-content-loader'

const Skeleton = props => (
    <Col lg="4" md="6" sm="12">
  <ContentLoader viewBox="0 0 100 100" height={280} width={"100%"} {...props}
  foregroundColor="#5e5e5e"
  >
    <rect x="3" y="3" rx="10" ry="10" width="300" height="180" />
    <rect x="6" y="190" rx="0" ry="0" width="292" height="20" />
    <rect x="4" y="215" rx="0" ry="0" width="239" height="20" />
    <rect x="4" y="242" rx="0" ry="0" width="274" height="20" />
  </ContentLoader>
      </Col>
)

Skeleton.metadata = {
  name: 'RJavlonbek',
  github: 'RJavlonbek',
  description: 'Blog item',
  filename: 'Skeleton',
}

export default Skeleton